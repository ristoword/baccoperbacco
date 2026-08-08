import { Router } from 'express';
import { readJson, writeJson, createId } from '../utils/store.js';
import { defaultFeedback } from '../defaults/feedbackDefaults.js';

const router = Router();
const FILE = 'feedback.json';
const EMPTY = { items: [] };
const LOCATIONS = new Set(['den-haag', 'leiden']);

function ensureFeedback() {
  const data = readJson(FILE, null);
  if (!data?.items?.length) {
    writeJson(FILE, structuredClone(defaultFeedback));
    return structuredClone(defaultFeedback);
  }
  return data;
}

function sanitize(text = '', max = 2000) {
  return String(text).trim().slice(0, max);
}

router.get('/', (_req, res) => {
  const data = ensureFeedback();
  const items = [...data.items]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 50);
  res.json({ success: true, data: items });
});

router.post('/', (req, res) => {
  const name = sanitize(req.body?.name, 80);
  const location = sanitize(req.body?.location, 40);
  const message = sanitize(req.body?.message, 2000);
  const language = sanitize(req.body?.language || 'nl', 5);
  const rating = Number(req.body?.rating);

  if (name.length < 2) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }
  if (!LOCATIONS.has(location)) {
    return res.status(400).json({ success: false, message: 'Invalid location' });
  }
  if (![1, 2, 3, 4, 5].includes(rating)) {
    return res.status(400).json({ success: false, message: 'Invalid rating' });
  }
  if (message.length < 5) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  const data = ensureFeedback();
  const item = {
    id: createId(),
    name,
    location,
    rating,
    message,
    language,
    createdAt: new Date().toISOString(),
    reply: null,
    repliedAt: null,
  };

  data.items.push(item);
  writeJson(FILE, data);

  res.status(201).json({ success: true, data: item });
});

export default router;
