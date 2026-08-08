#!/usr/bin/env node
/**
 * Restore from a backup archive created by backup-persist.js
 *
 *   npm run restore:local -- backups/bacco-local-….tar.gz
 *   npm run restore:railway -- backups/bacco-railway-….tar.gz
 *
 * WARNING: overwrites current data. Use only when you mean it.
 */
import { spawn, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

function hasCommand(name) {
  const check = process.platform === 'win32' ? 'where' : 'which';
  return spawnSync(check, [name], { stdio: 'ignore' }).status === 0;
}

async function restoreLocal(archivePath) {
  if (!fs.existsSync(archivePath)) {
    console.error('File non trovato:', archivePath);
    process.exit(1);
  }
  const answer = await ask(
    'Questo SOVRASCRIVE backend/data e public/uploads. Digitare sì per continuare: '
  );
  if (answer !== 'sì' && answer !== 'si' && answer !== 'yes') {
    console.log('Annullato.');
    process.exit(0);
  }

  fs.mkdirSync(path.join(root, 'backend', 'data'), { recursive: true });
  fs.mkdirSync(path.join(root, 'public', 'uploads'), { recursive: true });

  const r = spawnSync('tar', ['-xzf', archivePath, '-C', root], { stdio: 'inherit', cwd: root });
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
  console.log('Restore locale completato.');
}

async function restoreRailway(archivePath) {
  if (!hasCommand('railway')) {
    console.error('Railway CLI mancante.');
    process.exit(1);
  }
  if (!fs.existsSync(archivePath)) {
    console.error('File non trovato:', archivePath);
    process.exit(1);
  }

  const answer = await ask(
    'Questo SOVRASCRIVE /app/persist in produzione. Digitare sì per continuare: '
  );
  if (answer !== 'sì' && answer !== 'si' && answer !== 'yes') {
    console.log('Annullato.');
    process.exit(0);
  }

  console.log('Invio archivio al container…');
  await new Promise((resolve, reject) => {
    const proc = spawn('railway', ['run', '--', 'tar', '-xzf', '-', '-C', '/app/persist'], {
      cwd: root,
      shell: process.platform === 'win32',
      stdio: ['pipe', 'inherit', 'inherit'],
    });
    const input = fs.createReadStream(archivePath);
    input.pipe(proc.stdin);
    input.on('error', reject);
    proc.on('error', reject);
    proc.on('close', (code) => {
      if (code !== 0) reject(new Error(`exit ${code}`));
      else resolve();
    });
  });
  console.log('Restore Railway completato.');
}

async function main() {
  const railway = process.argv.includes('--railway');
  const local = process.argv.includes('--local');
  const fileArg = process.argv.find((a) => !a.startsWith('--') && a.endsWith('.tar.gz'));

  if ((!railway && !local) || !fileArg) {
    console.log('Usage: node scripts/restore-persist.js --local|--railway <file.tar.gz>');
    process.exit(1);
  }

  const archivePath = path.isAbsolute(fileArg) ? fileArg : path.join(root, fileArg);

  if (local) await restoreLocal(archivePath);
  else await restoreRailway(archivePath);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
