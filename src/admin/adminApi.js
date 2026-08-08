const TOKEN_KEY = 'bacco_admin_token';

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function adminFetch(path, options = {}) {
  const token = getAdminToken();
  const headers = { ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  const res = await fetch(`/api/admin${path}`, { ...options, headers });
  const json = await res.json().catch(() => ({}));
  if (res.status === 401) {
    setAdminToken(null);
    throw new Error('SESSION_EXPIRED');
  }
  if (!res.ok || json.success === false) {
    throw new Error(json.message || 'Request failed');
  }
  return json.data;
}

export async function loginAdmin(username, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Login failed');
  }
  setAdminToken(json.data.token);
  return json.data;
}

export async function fetchAdminMe() {
  const token = getAdminToken();
  if (!token) return null;
  const res = await fetch('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    setAdminToken(null);
    return null;
  }
  return json.data;
}

export function uploadFile(folder, file) {
  const form = new FormData();
  form.append('file', file);
  return adminFetch(`/upload/${folder}`, { method: 'POST', body: form });
}

export const adminApi = {
  getGallery: () => adminFetch('/gallery'),
  saveGallery: (items) => adminFetch('/gallery', { method: 'PUT', body: JSON.stringify({ items }) }),
  addGalleryItem: (payload) =>
    adminFetch('/gallery', { method: 'POST', body: JSON.stringify(payload) }),
  deleteGalleryItem: (id) => adminFetch(`/gallery/${id}`, { method: 'DELETE' }),

  getMenu: () => adminFetch('/menu'),
  saveMenu: (items) => adminFetch('/menu', { method: 'PUT', body: JSON.stringify({ items }) }),
  addMenuItem: (payload) => adminFetch('/menu', { method: 'POST', body: JSON.stringify(payload) }),
  deleteMenuItem: (id) => adminFetch(`/menu/${id}`, { method: 'DELETE' }),

  getEvents: () => adminFetch('/events'),
  saveEvents: (items) => adminFetch('/events', { method: 'PUT', body: JSON.stringify({ items }) }),
  addEvent: (payload) => adminFetch('/events', { method: 'POST', body: JSON.stringify(payload) }),
  deleteEvent: (id) => adminFetch(`/events/${id}`, { method: 'DELETE' }),

  getFeedback: () => adminFetch('/feedback'),
  replyFeedback: (id, reply) =>
    adminFetch(`/feedback/${id}`, { method: 'PATCH', body: JSON.stringify({ reply }) }),
};

export async function fetchPublicContent(type) {
  const res = await fetch(`/api/content/${type}`);
  const json = await res.json();
  if (!json.success) throw new Error('Failed to load content');
  return json.data;
}
