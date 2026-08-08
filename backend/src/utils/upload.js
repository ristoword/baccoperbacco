import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const publicDir = path.resolve(__dirname, '../../../public');

const ALLOWED = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

function uploadDir(folder) {
  const dir = path.join(publicDir, 'uploads', folder);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function createUploader(folder) {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir(folder)),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
      const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, '_').slice(0, 40);
      cb(null, `${Date.now()}-${base}${ext}`);
    },
  });

  return multer({
    storage,
    limits: { fileSize: 8 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (ALLOWED.has(file.mimetype)) cb(null, true);
      else cb(new Error('Only image files are allowed'));
    },
  });
}

export function publicUploadUrl(relativePath) {
  return `/uploads/${relativePath}`.replace(/\\/g, '/');
}
