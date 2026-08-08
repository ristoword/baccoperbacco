import { Router } from 'express';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { createUploader, publicUploadUrl } from '../utils/upload.js';
import { readJson, writeJson, createId } from '../utils/store.js';
import {
  ensureMenu,
  ensureGallery,
  ensureEvents,
  saveMenu,
  saveGallery,
  saveEvents,
  nextOrder,
} from '../services/contentService.js';

const router = Router();
router.use(requireAdmin);

const uploadGallery = createUploader('gallery');
const uploadMenu = createUploader('menu');
const uploadEvents = createUploader('events');

const FEEDBACK_FILE = 'feedback.json';
const FEEDBACK_EMPTY = { items: [] };

function langFields(body, fields) {
  const out = {};
  for (const field of fields) {
    out[field] = {
      nl: String(body?.[field]?.nl ?? body?.[field] ?? '').trim(),
      en: String(body?.[field]?.en ?? body?.[field] ?? '').trim(),
      it: String(body?.[field]?.it ?? body?.[field] ?? '').trim(),
    };
  }
  return out;
}

router.post('/upload/gallery', uploadGallery.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const url = publicUploadUrl(`gallery/${req.file.filename}`);
  res.json({ success: true, data: { url } });
});

router.post('/upload/menu', uploadMenu.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const url = publicUploadUrl(`menu/${req.file.filename}`);
  res.json({ success: true, data: { url } });
});

router.post('/upload/events', uploadEvents.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const url = publicUploadUrl(`events/${req.file.filename}`);
  res.json({ success: true, data: { url } });
});

/* ——— Gallery ——— */
router.get('/gallery', (_req, res) => {
  const data = ensureGallery();
  res.json({ success: true, data });
});

router.put('/gallery', (req, res) => {
  const items = req.body?.items;
  if (!Array.isArray(items)) {
    return res.status(400).json({ success: false, message: 'items array required' });
  }
  const normalized = items.map((item, index) => ({
    id: item.id || createId(),
    order: index,
    imageUrl: String(item.imageUrl || ''),
    caption: {
      nl: String(item.caption?.nl ?? '').trim(),
      en: String(item.caption?.en ?? '').trim(),
      it: String(item.caption?.it ?? '').trim(),
    },
  }));
  saveGallery({ items: normalized });
  res.json({ success: true, data: { items: normalized } });
});

router.post('/gallery', (req, res) => {
  const imageUrl = String(req.body?.imageUrl || '').trim();
  if (!imageUrl) {
    return res.status(400).json({ success: false, message: 'imageUrl required' });
  }
  const data = ensureGallery();
  const item = {
    id: createId(),
    order: nextOrder(data.items),
    imageUrl,
    caption: {
      nl: String(req.body?.caption?.nl ?? '').trim(),
      en: String(req.body?.caption?.en ?? '').trim(),
      it: String(req.body?.caption?.it ?? '').trim(),
    },
  };
  data.items.push(item);
  saveGallery(data);
  res.status(201).json({ success: true, data: item });
});

router.delete('/gallery/:id', (req, res) => {
  const data = ensureGallery();
  const before = data.items.length;
  data.items = data.items.filter((i) => i.id !== req.params.id);
  if (data.items.length === before) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }
  data.items.forEach((item, index) => {
    item.order = index;
  });
  saveGallery(data);
  res.json({ success: true });
});

/* ——— Menu ——— */
router.get('/menu', (_req, res) => {
  res.json({ success: true, data: ensureMenu() });
});

router.put('/menu', (req, res) => {
  const items = req.body?.items;
  if (!Array.isArray(items)) {
    return res.status(400).json({ success: false, message: 'items array required' });
  }
  const normalized = items.map((item, index) => ({
    id: item.id || createId(),
    order: index,
    name: {
      nl: String(item.name?.nl ?? item.name ?? '').trim(),
      en: String(item.name?.en ?? item.name ?? '').trim(),
      it: String(item.name?.it ?? item.name ?? '').trim(),
    },
    course: {
      nl: String(item.course?.nl ?? item.course ?? 'Antipasti').trim(),
      en: String(item.course?.en ?? item.course ?? 'Antipasti').trim(),
      it: String(item.course?.it ?? item.course ?? 'Antipasti').trim(),
    },
    imageUrl: item.imageUrl ? String(item.imageUrl) : null,
  }));
  saveMenu({ items: normalized });
  res.json({ success: true, data: { items: normalized } });
});

router.post('/menu', (req, res) => {
  const data = ensureMenu();
  const item = {
    id: createId(),
    order: nextOrder(data.items),
    name: {
      nl: String(req.body?.name?.nl ?? 'Nuovo piatto').trim(),
      en: String(req.body?.name?.en ?? 'New dish').trim(),
      it: String(req.body?.name?.it ?? 'Nuovo piatto').trim(),
    },
    course: {
      nl: String(req.body?.course?.nl ?? 'Antipasti').trim(),
      en: String(req.body?.course?.en ?? 'Antipasti').trim(),
      it: String(req.body?.course?.it ?? 'Antipasti').trim(),
    },
    imageUrl: req.body?.imageUrl ? String(req.body.imageUrl) : null,
  };
  data.items.push(item);
  saveMenu(data);
  res.status(201).json({ success: true, data: item });
});

router.delete('/menu/:id', (req, res) => {
  const data = ensureMenu();
  const before = data.items.length;
  data.items = data.items.filter((i) => i.id !== req.params.id);
  if (data.items.length === before) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }
  data.items.forEach((item, index) => {
    item.order = index;
  });
  saveMenu(data);
  res.json({ success: true });
});

/* ——— Events ——— */
router.get('/events', (_req, res) => {
  res.json({ success: true, data: ensureEvents() });
});

router.put('/events', (req, res) => {
  const items = req.body?.items;
  if (!Array.isArray(items)) {
    return res.status(400).json({ success: false, message: 'items array required' });
  }
  const fields = [
    'title',
    'kicker',
    'dateLine',
    'slogan',
    'lead',
    'body',
    'when',
    'where',
    'price',
    'tags',
  ];
  const normalized = items.map((item, index) => {
    const i18n = langFields(item, fields);
    return {
      id: item.id || createId(),
      order: index,
      sede: item.sede === 'den-haag' ? 'den-haag' : 'leiden',
      legacyKey: item.legacyKey || null,
      flyerUrl: item.flyerUrl ? String(item.flyerUrl) : null,
      ...i18n,
    };
  });
  saveEvents({ items: normalized });
  res.json({ success: true, data: { items: normalized } });
});

router.post('/events', (req, res) => {
  const data = ensureEvents();
  const fields = [
    'title',
    'kicker',
    'dateLine',
    'slogan',
    'lead',
    'body',
    'when',
    'where',
    'price',
    'tags',
  ];
  const i18n = langFields(req.body, fields);
  const item = {
    id: createId(),
    order: nextOrder(data.items),
    sede: req.body?.sede === 'den-haag' ? 'den-haag' : 'leiden',
    legacyKey: null,
    flyerUrl: req.body?.flyerUrl ? String(req.body.flyerUrl) : null,
    ...i18n,
  };
  data.items.push(item);
  saveEvents(data);
  res.status(201).json({ success: true, data: item });
});

router.delete('/events/:id', (req, res) => {
  const data = ensureEvents();
  const before = data.items.length;
  data.items = data.items.filter((i) => i.id !== req.params.id);
  if (data.items.length === before) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }
  data.items.forEach((item, index) => {
    item.order = index;
  });
  saveEvents(data);
  res.json({ success: true });
});

/* ——— Feedback ——— */
router.get('/feedback', (_req, res) => {
  const data = readJson(FEEDBACK_FILE, FEEDBACK_EMPTY);
  const items = [...data.items].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json({ success: true, data: items });
});

router.patch('/feedback/:id', (req, res) => {
  const reply = String(req.body?.reply ?? '').trim().slice(0, 2000);
  if (reply.length < 2) {
    return res.status(400).json({ success: false, message: 'Reply is required' });
  }
  const data = readJson(FEEDBACK_FILE, FEEDBACK_EMPTY);
  const item = data.items.find((i) => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }
  item.reply = reply;
  item.repliedAt = new Date().toISOString();
  writeJson(FEEDBACK_FILE, data);
  res.json({ success: true, data: item });
});

export default router;
