import path from 'path';

export const getTimestamp = () => new Date().toISOString();

export const getFileExtension = (filename) => path.extname(filename).toLowerCase();