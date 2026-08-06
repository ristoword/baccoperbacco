import app from './app.js';
import config from './config/index.js';
import { logger } from './utils/logger.js';

const server = app.listen(config.port, '0.0.0.0', () => {
  logger.info(`${config.restaurant.name} in ascolto su 0.0.0.0:${config.port}`);
  logger.info(`Ambiente: ${config.env}`);
});

server.on('error', (err) => {
  logger.error('Server error:', err);
  process.exit(1);
});
