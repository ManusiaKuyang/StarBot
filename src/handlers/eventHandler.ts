import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { ExtendedClient } from '../types/index.js';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function loadEvents(client: ExtendedClient) {
  const eventsPath = path.resolve(__dirname, '../events');

  if (!fs.existsSync(eventsPath)) {
    logger.warning(`Events directory not found at: ${eventsPath}`);
    return;
  }

  const getFiles = (dir: string): string[] => {
    let files: string[] = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        files = [...files, ...getFiles(path.join(dir, item.name))];
      } else if (
        item.isFile() &&
        (item.name.endsWith('.ts') || item.name.endsWith('.js')) &&
        !item.name.endsWith('.d.ts')
      ) {
        files.push(path.join(dir, item.name));
      }
    }
    return files;
  };

  const eventFiles = getFiles(eventsPath);
  let loadedCount = 0;

  for (const file of eventFiles) {
    try {
      const fileUrl = pathToFileURL(file).href;
      const eventModule = await import(fileUrl);
      const event = eventModule.default;

      if (!event || !event.name || typeof event.execute !== 'function') {
        logger.warning(`Event file ${path.basename(file)} is missing a name or execute function.`);
        continue;
      }

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }

      loadedCount++;
    } catch (error) {
      logger.error(`Error loading event file: ${path.basename(file)}`, error);
    }
  }

  logger.success(`Loaded ${loadedCount} event handler(s).`);
}
