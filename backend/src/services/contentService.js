import { readJson, writeJson, createId } from '../utils/store.js';
import {
  defaultMenu,
  defaultGallery,
  defaultEvents,
} from '../defaults/contentDefaults.js';

const MENU_FILE = 'menu.json';
const GALLERY_FILE = 'gallery.json';
const EVENTS_FILE = 'events.json';

function sortByOrder(items) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function ensureMenu() {
  const data = readJson(MENU_FILE, null);
  if (!data?.items?.length) {
    writeJson(MENU_FILE, structuredClone(defaultMenu));
    return structuredClone(defaultMenu);
  }
  return data;
}

function ensureGallery() {
  const data = readJson(GALLERY_FILE, null);
  if (!data?.items) {
    writeJson(GALLERY_FILE, structuredClone(defaultGallery));
    return structuredClone(defaultGallery);
  }
  return data;
}

function ensureEvents() {
  const data = readJson(EVENTS_FILE, null);
  if (!data?.items?.length) {
    writeJson(EVENTS_FILE, structuredClone(defaultEvents));
    return structuredClone(defaultEvents);
  }
  return data;
}

export function getPublicMenu() {
  const data = ensureMenu();
  return { items: sortByOrder(data.items) };
}

export function getPublicGallery() {
  const data = ensureGallery();
  return { items: sortByOrder(data.items) };
}

export function getPublicEvents() {
  const data = ensureEvents();
  return { items: sortByOrder(data.items) };
}

export function saveMenu(data) {
  writeJson(MENU_FILE, data);
  return data;
}

export function saveGallery(data) {
  writeJson(GALLERY_FILE, data);
  return data;
}

export function saveEvents(data) {
  writeJson(EVENTS_FILE, data);
  return data;
}

export function nextOrder(items) {
  if (!items.length) return 0;
  return Math.max(...items.map((i) => i.order ?? 0)) + 1;
}

export { createId, ensureMenu, ensureGallery, ensureEvents };
