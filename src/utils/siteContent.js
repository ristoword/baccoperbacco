import { dishes } from '../data/dishes.js';

const byId = Object.fromEntries(dishes.map((d) => [d.id, d]));

export function staticDishImage(id) {
  return byId[id]?.image || null;
}

export function staticDishesForLang(lang) {
  return dishes.map((d) => ({
    id: d.id,
    name: d.name,
    course: d.course[lang] || d.course.it,
    image: d.image,
  }));
}

export function menuItemsByCourse(items, lang) {
  const map = new Map();
  for (const item of items) {
    const course = item.course?.[lang] || item.course?.it || item.course?.en || 'Menu';
    const name = item.name?.[lang] || item.name?.it || item.name?.en || '';
    if (!map.has(course)) map.set(course, []);
    map.get(course).push({ id: item.id, name, imageUrl: item.imageUrl });
  }
  return [...map.entries()].map(([course, list]) => ({ course, items: list }));
}

export function resolveMenuImage(item) {
  if (item.imageUrl) return item.imageUrl;
  return staticDishImage(item.id);
}

export function resolveGalleryCaption(item, lang) {
  return item.caption?.[lang] || item.caption?.it || item.caption?.en || '';
}

export function mergeGalleryWithMenuFallback(galleryItems, menuItems, lang) {
  if (galleryItems?.length) {
    return galleryItems.map((g) => ({
      id: g.id,
      image: g.imageUrl,
      label: resolveGalleryCaption(g, lang) || 'Bacco Perbacco',
      sub: '',
    }));
  }
  return menuItems.map((m) => ({
    id: m.id,
    image: resolveMenuImage(m),
    label: m.name?.[lang] || m.name?.it || '',
    sub: m.course?.[lang] || m.course?.it || '',
  }));
}
