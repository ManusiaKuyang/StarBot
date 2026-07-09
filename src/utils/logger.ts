import pc from 'picocolors';

const getTimestamp = (): string => {
  const now = new Date();
  return now.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

export const logger = {
  info: (message: string) => {
    console.log(`${pc.gray(getTimestamp())} ${pc.blue('[INFO]')} ${message}`);
  },
  error: (message: string, error?: unknown) => {
    console.error(`${pc.gray(getTimestamp())} ${pc.red('[ERROR]')} ${message}`);
    if (error) {
      if (error instanceof Error) {
        console.error(pc.red(error.stack || error.message));
      } else {
        console.error(pc.red(String(error)));
      }
    }
  },
  success: (message: string) => {
    console.log(`${pc.gray(getTimestamp())} ${pc.green('[SUCCESS]')} ${message}`);
  },
  warning: (message: string) => {
    console.warn(`${pc.gray(getTimestamp())} ${pc.yellow('[WARNING]')} ${message}`);
  },
};
