import fs from 'fs-extra';
import path from 'path';
import { logActivity } from '../logs/logs.js';
import { WATCH_DIR } from './config.js';
import { EXTENSION_MAP } from './constants.js';

export const moveFile = async (filePath) => {
  const fileName = path.basename(filePath);
  
  if (fileName.startsWith('.')) return;

  const extension = path.extname(fileName).toLowerCase();
  
  let category = 'Others';
  for (const [key, extensions] of Object.entries(EXTENSION_MAP)) {
    if (extensions.includes(extension)) {
      category = key;
      break;
    }
  }

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
