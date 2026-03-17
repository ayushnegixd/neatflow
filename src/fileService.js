import fs from 'fs-extra';
import path from 'path';
import { logActivity } from '../logs/logs.js';
import { WATCH_DIR } from './config.js';

export const moveFile = async (filePath, category) => {
  const fileName = path.basename(filePath);
  const targetDir = path.join(WATCH_DIR, category);
  const targetPath = path.join(targetDir, fileName);

  try {
    await fs.ensureDir(targetDir);
    await fs.move(filePath, targetPath, { overwrite: true });
    await logActivity(`Moved: ${fileName} -> ${category}`);
  } catch (error) {
    await logActivity(`Error moving ${fileName}: ${error.message}`);
  }
};
