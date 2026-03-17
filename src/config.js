import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const WATCH_DIR = process.env.NODE_ENV === 'test' 
  ? path.resolve(__dirname, '../tests/test-sandbox')
  : path.join(os.homedir(), 'Downloads');

export const MOVE_DELAY = 2000;