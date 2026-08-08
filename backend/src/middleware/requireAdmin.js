import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export function signAdminToken(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '12h' });
}

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    req.admin = { username: decoded.sub };
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired session' });
  }
}
