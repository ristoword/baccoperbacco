import { Router } from 'express';
import {
  getPublicMenu,
  getPublicGallery,
  getPublicEvents,
} from '../services/contentService.js';

const router = Router();

router.get('/menu', (_req, res) => {
  res.json({ success: true, data: getPublicMenu() });
});

router.get('/gallery', (_req, res) => {
  res.json({ success: true, data: getPublicGallery() });
});

router.get('/events', (_req, res) => {
  res.json({ success: true, data: getPublicEvents() });
});

export default router;
