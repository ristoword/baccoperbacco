/**
 * Genera ADMIN_PASSWORD e JWT_SECRET e scrive railway.env.local (gitignored).
 * Usage: node scripts/generate-railway-secrets.js
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'railway.env.local');

const password = crypto.randomBytes(18).toString('base64url');
const jwtSecret = crypto.randomBytes(48).toString('hex');

const content = `# Generated ${new Date().toISOString()} — paste into Railway → Service → Variables
NODE_ENV=production
PORT=5000
ADMIN_USERNAME=bacco
ADMIN_PASSWORD=${password}
JWT_SECRET=${jwtSecret}
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log(`Written ${outPath}`);
console.log('');
console.log('Railway volume: attach volume with mount path /app/persist');
console.log('Login dashboard: username bacco, password from ADMIN_PASSWORD above');
