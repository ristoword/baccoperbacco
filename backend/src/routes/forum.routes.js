import { Router } from 'express';
import { readJson, writeJson, createId } from '../utils/store.js';

const router = Router();
const FILE = 'forum.json';
const EMPTY = { posts: [] };

function sanitize(text = '', max = 2000) {
  return String(text).trim().slice(0, max);
}

router.get('/posts', (_req, res) => {
  const data = readJson(FILE, EMPTY);
  const posts = [...data.posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json({ success: true, data: posts });
});

router.post('/posts', (req, res) => {
  const author = sanitize(req.body?.author, 80);
  const title = sanitize(req.body?.title, 140);
  const message = sanitize(req.body?.message, 2000);
  const language = sanitize(req.body?.language || 'nl', 5);

  if (author.length < 2) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }
  if (title.length < 3) {
    return res.status(400).json({ success: false, message: 'Title is required' });
  }
  if (message.length < 5) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  const data = readJson(FILE, EMPTY);
  const post = {
    id: createId(),
    author,
    title,
    message,
    language,
    createdAt: new Date().toISOString(),
  };

  data.posts.push(post);
  writeJson(FILE, data);

  res.status(201).json({ success: true, data: post });
});

export default router;
