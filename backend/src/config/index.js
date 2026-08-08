import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config();

const env = process.env.NODE_ENV || 'development';

function resolvePasswordHash() {
  if (process.env.ADMIN_PASSWORD_HASH) {
    return process.env.ADMIN_PASSWORD_HASH;
  }
  const plain = process.env.ADMIN_PASSWORD || 'bacco2026';
  if (env === 'production' && !process.env.ADMIN_PASSWORD && !process.env.ADMIN_PASSWORD_HASH) {
    console.warn('[config] Set ADMIN_PASSWORD or ADMIN_PASSWORD_HASH in production');
  }
  return bcrypt.hashSync(plain, 10);
}

function resolveStorageRoot() {
  if (process.env.RAILWAY_VOLUME_MOUNT_PATH) {
    return process.env.RAILWAY_VOLUME_MOUNT_PATH;
  }
  if (process.env.PERSIST_DIR) {
    return process.env.PERSIST_DIR;
  }
  if (env === 'production') {
    return '/app/persist';
  }
  return null;
}

const storageRoot = resolveStorageRoot();

const config = {
  env,
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || (env === 'production' ? '*' : 'http://localhost:5173'),
  storageRoot,
  dataDir: storageRoot
    ? path.join(storageRoot, 'data')
    : path.resolve(__dirname, '../../data'),
  uploadsDir: storageRoot
    ? path.join(storageRoot, 'uploads')
    : path.join(repoRoot, 'public', 'uploads'),
  jwtSecret:
    process.env.JWT_SECRET ||
    (env === 'production'
      ? crypto.randomBytes(32).toString('hex')
      : 'bacco-dev-jwt-secret-change-me'),
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    passwordHash: resolvePasswordHash(),
  },
  restaurant: {
    name: 'Bacco Perbacco',
    tagline: 'Trattoria Italiana',
    cities: ['Den Haag', 'Leiden'],
  },
};

export default config;
