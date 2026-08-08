import { Router } from 'express';
import bcrypt from 'bcryptjs';
import config from '../config/index.js';
import { signAdminToken, requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

router.post('/login', async (req, res) => {
  const username = String(req.body?.username || '').trim();
  const password = String(req.body?.password || '');

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }

  if (username !== config.admin.username) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const ok = await bcrypt.compare(password, config.admin.passwordHash);
  if (!ok) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = signAdminToken({ sub: username, role: 'admin' });
  res.json({
    success: true,
    data: {
      token,
      username,
      expiresIn: 43200,
    },
  });
});

router.get('/me', requireAdmin, (req, res) => {
  res.json({ success: true, data: { username: req.admin.username } });
});

export default router;
