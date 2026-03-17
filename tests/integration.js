import fs from 'fs-extra';
import path from 'path';
import { WATCH_DIR, MOVE_DELAY } from '../src/config.js';
import { EXTENSION_MAP } from '../src/constants.js';

const setup = async () => {
  for (const [category, extensions] of Object.entries(EXTENSION_MAP)) {
    const dummyFilePath = path.join(WATCH_DIR, `test_${category}${extensions[0]}`);
    await fs.outputFile(dummyFilePath, `dummy content for ${category}`);
  }
};

const verify = async () => {
  for (const [category, extensions] of Object.entries(EXTENSION_MAP)) {
    const verifiedPath = path.join(WATCH_DIR, category, `test_${category}${extensions[0]}`);
    const exists = await fs.pathExists(verifiedPath);
    console.log(exists ? `PASS: ${category}` : `FAIL: ${category}`);
  }
};

const cleanup = async () => {
  for (const category of Object.keys(EXTENSION_MAP)) {
    const categoryPath = path.join(WATCH_DIR, category);
    if (await fs.pathExists(categoryPath)) {
      await fs.remove(categoryPath);
    }
  }
};

const runTest = async () => {
  try {
    await cleanup();
    await setup();
    
    await import('../src/index.js');
    
    setTimeout(async () => {
      await verify();
      await cleanup();
      process.exit(0);
    }, MOVE_DELAY + 2000);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

runTest();