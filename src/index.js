import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs-extra';
import { WATCH_DIR, MOVE_DELAY } from './config.js';
import { moveFile } from './fileService.js';
import { logActivity } from '../logs/logs.js';

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
        await moveFile(filePath);
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