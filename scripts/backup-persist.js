#!/usr/bin/env node
/**
 * Backup JSON data + uploads.
 *
 *   npm run backup:local     → backend/data + public/uploads (development)
 *   npm run backup:railway   → /app/persist from linked Railway service (production volume)
 *
 * Archives land in ./backups/ (gitignored). Keep copies on OneDrive or external drive.
 */
import { spawn, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const backupsDir = path.join(root, 'backups');

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

function ensureBackupsDir() {
  fs.mkdirSync(backupsDir, { recursive: true });
}

function hasCommand(name) {
  const check = process.platform === 'win32' ? 'where' : 'which';
  const r = spawnSync(check, [name], { stdio: 'ignore' });
  return r.status === 0;
}

function runTarCreateLocal(archivePath) {
  const dataDir = path.join(root, 'backend', 'data');
  const uploadsDir = path.join(root, 'public', 'uploads');

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  if (!hasCommand('tar')) {
    console.error('tar non trovato. Su Windows 10+ tar è incluso; altrimenti installa Git Bash.');
    process.exit(1);
  }

  const args = ['-czf', archivePath, '-C', root, 'backend/data', 'public/uploads'];

  const r = spawnSync('tar', args, { stdio: 'inherit', cwd: root });
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
}

function runRailwayArchive(archivePath) {
  if (!hasCommand('railway')) {
    console.error('Railway CLI mancante. Installa: npm i -g @railway/cli');
    console.error('Poi: railway login && railway link (servizio baccoperbacco)');
    process.exit(1);
  }

  ensureBackupsDir();

  return new Promise((resolve, reject) => {
    const out = fs.createWriteStream(archivePath);
    const proc = spawn(
      'railway',
      ['run', '--', 'tar', '-czf', '-', '-C', '/app/persist', '.'],
      {
        cwd: root,
        shell: process.platform === 'win32',
        stdio: ['ignore', 'pipe', 'inherit'],
      }
    );

    proc.stdout.pipe(out);
    proc.on('error', reject);
    proc.on('close', (code) => {
      out.end(() => {
        if (code !== 0) {
          reject(new Error(`railway run exit ${code}`));
          return;
        }
        resolve();
      });
    });
  });
}

async function main() {
  const mode = process.argv.includes('--railway')
    ? 'railway'
    : process.argv.includes('--local')
      ? 'local'
      : null;

  if (!mode) {
    console.log('Usage: node scripts/backup-persist.js --local | --railway');
    process.exit(1);
  }

  ensureBackupsDir();
  const fileName =
    mode === 'railway'
      ? `bacco-railway-${stamp()}.tar.gz`
      : `bacco-local-${stamp()}.tar.gz`;
  const archivePath = path.join(backupsDir, fileName);

  if (mode === 'local') {
    console.log('Backup locale →', archivePath);
    runTarCreateLocal(archivePath);
  } else {
    console.log('Backup Railway volume /app/persist →', archivePath);
    console.log('(richiede servizio linkato e volume montato)');
    await runRailwayArchive(archivePath);
  }

  const stat = fs.statSync(archivePath);
  const mb = (stat.size / (1024 * 1024)).toFixed(2);
  console.log(`Fatto: ${fileName} (${mb} MB)`);
  console.log('Conserva una copia fuori dal PC (OneDrive, disco esterno).');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
