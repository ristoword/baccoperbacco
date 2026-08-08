import { Router } from 'express';
import config from '../config/index.js';
import restaurant from '../data/restaurant.js';
import forumRoutes from './forum.routes.js';
import feedbackRoutes from './feedback.routes.js';
import contentRoutes from './content.routes.js';
import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';

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

router.use('/content', contentRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/forum', forumRoutes);
router.use('/feedback', feedbackRoutes);

export default router;
