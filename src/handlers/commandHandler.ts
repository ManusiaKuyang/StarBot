import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { ExtendedClient } from '../types/index.js';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function loadCommands(client: ExtendedClient) {
  const commandsPath = path.resolve(__dirname, '../commands');

  if (!fs.existsSync(commandsPath)) {
    // If commands directory doesn't exist, we create it
    fs.mkdirSync(commandsPath, { recursive: true });
    logger.info(`Created empty commands directory at: ${commandsPath}`);
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

  const commandFiles = getFiles(commandsPath);
  let loadedCount = 0;

  for (const file of commandFiles) {
    try {
      const fileUrl = pathToFileURL(file).href;
      const commandModule = await import(fileUrl);
      const command = commandModule.default;

      if (!command || !command.data || typeof command.execute !== 'function') {
        logger.warning(`Command file ${path.basename(file)} is missing data or execute function.`);
        continue;
      }

      client.commands.set(command.data.name, command);
      loadedCount++;
    } catch (error) {
      logger.error(`Error loading command file: ${path.basename(file)}`, error);
    }
  }

  logger.success(`Loaded ${loadedCount} command(s) to collection.`);
}
