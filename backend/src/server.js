import app from './app.js';
import config from './config/index.js';
import { logger } from './utils/logger.js';

app.listen(config.port, () => {
  logger.info(`${config.restaurant.name} API in ascolto su http://localhost:${config.port}`);
  logger.info(`Ambiente: ${config.env}`);
});
