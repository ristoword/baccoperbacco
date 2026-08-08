import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config/index.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { uploadsRoot } from './utils/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');
const hasDist = fs.existsSync(path.join(distDir, 'index.html'));

fs.mkdirSync(config.dataDir, { recursive: true });
fs.mkdirSync(uploadsRoot, { recursive: true });

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: config.clientUrl === '*' ? true : config.clientUrl,
    credentials: true,
  })
);
app.use(morgan(config.env === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(uploadsRoot));
app.use('/assets', express.static(path.join(publicDir, 'assets')));

app.use('/api', routes);

if (hasDist) {
  app.use(express.static(distDir));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distDir, 'index.html'), (err) => {
      if (err) next(err);
    });
  });
}

app.use(notFound);
app.use(errorHandler);

export default app;
