import { Router } from 'express';
import config from '../config/index.js';
import restaurant from '../data/restaurant.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
    restaurant: config.restaurant.name,
    timestamp: new Date().toISOString(),
  });
});

router.get('/restaurant', (_req, res) => {
  res.json({
    success: true,
    data: restaurant,
  });
});

export default router;
