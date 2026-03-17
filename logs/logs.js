import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { getTimestamp } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG_FILE = path.resolve(__dirname, 'activity.log');

export const logActivity = async (message) => {
  try {
    await fs.ensureFile(LOG_FILE);
    await fs.appendFile(LOG_FILE, `[${getTimestamp()}] ${message}\n`);
  } catch (error) {
    console.error(error);
  }
};