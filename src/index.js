import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs-extra';
import { WATCH_DIR, MOVE_DELAY } from './config.js';
import { EXTENSION_MAP } from './constants.js';
import { getFileExtension } from './utils.js';
import { moveFile } from './fileService.js';
import { logActivity } from '../logs/logs.js';

const getCategory = (extension) => {
  for (const [category, extensions] of Object.entries(EXTENSION_MAP)) {
    if (extensions.includes(extension)) {
      return category;
    }
  }
  return 'Others';
};

const isIgnored = (filePath) => {
  const fileName = path.basename(filePath);
  return fileName.startsWith('.') || fileName.endsWith('.download') || fileName.endsWith('.crdownload');
};

const startWatcher = async () => {
  await fs.ensureDir(WATCH_DIR);
  await logActivity(`Started watching: ${WATCH_DIR}`);

  const watcher = chokidar.watch(WATCH_DIR, {
    ignored: isIgnored,
    persistent: true,
    depth: 0,
    ignoreInitial: false
  });

  watcher.on('add', (filePath) => {
    setTimeout(async () => {
      try {
        const fileExists = await fs.pathExists(filePath);
        if (!fileExists) return;

        const extension = getFileExtension(filePath);
        const category = getCategory(extension);
        await moveFile(filePath, category);
      } catch (error) {
        await logActivity(`Error processing file: ${error.message}`);
      }
    }, MOVE_DELAY);
  });

  watcher.on('error', async (error) => {
    await logActivity(`Watcher error: ${error.message}`);
  });
};

startWatcher();