import antipasto from '../assets/images/dishes/antipasto-misto.jpg';
import bruschetta from '../assets/images/dishes/bruschetta.jpg';
import carpaccio from '../assets/images/dishes/carpaccio.jpg';
import tagliatelle from '../assets/images/dishes/tagliatelle.jpg';
import risotto from '../assets/images/dishes/risotto.jpg';
import vongole from '../assets/images/dishes/vongole.jpg';
import saltimbocca from '../assets/images/dishes/saltimbocca.jpg';
import branzino from '../assets/images/dishes/branzino.jpg';
import scaloppine from '../assets/images/dishes/scaloppine.jpg';
import tiramisu from '../assets/images/dishes/tiramisu.jpg';
import pannaCotta from '../assets/images/dishes/panna-cotta.jpg';
import cannoli from '../assets/images/dishes/cannoli.jpg';

export const dishes = [
  {
    id: 'antipasto-misto',
    name: 'Antipasto misto',
    course: { nl: 'Antipasti', en: 'Antipasti', it: 'Antipasti' },
    image: antipasto,
  },
  {
    id: 'bruschetta',
    name: 'Bruschetta al pomodoro',
    course: { nl: 'Antipasti', en: 'Antipasti', it: 'Antipasti' },
    image: bruschetta,
  },
  {
    id: 'carpaccio',
    name: 'Carpaccio di manzo',
    course: { nl: 'Antipasti', en: 'Antipasti', it: 'Antipasti' },
    image: carpaccio,
  },
  {
    id: 'tagliatelle',
    name: 'Spaghetti al ragù',
    course: { nl: 'Pasta & risotto', en: 'Pasta & risotto', it: 'Pasta & risotto' },
    image: tagliatelle,
  },
  {
    id: 'risotto',
    name: 'Risotto ai funghi',
    course: { nl: 'Pasta & risotto', en: 'Pasta & risotto', it: 'Pasta & risotto' },
    image: risotto,
  },
  {
    id: 'vongole',
    name: 'Spaghetti alle vongole',
    course: { nl: 'Pasta & risotto', en: 'Pasta & risotto', it: 'Pasta & risotto' },
    image: vongole,
  },
  {
    id: 'saltimbocca',
    name: 'Scaloppine ai funghi',
    course: { nl: 'Secondi', en: 'Mains', it: 'Secondi' },
    image: saltimbocca,
  },
  {
    id: 'branzino',
    name: 'Branzino al forno',
    course: { nl: 'Secondi', en: 'Mains', it: 'Secondi' },
    image: branzino,
  },
  {
    id: 'scaloppine',
    name: 'Pollo al limone',
    course: { nl: 'Secondi', en: 'Mains', it: 'Secondi' },
    image: scaloppine,
  },
  {
    id: 'tiramisu',
    name: 'Tiramisù della casa',
    course: { nl: 'Dolci', en: 'Desserts', it: 'Dolci' },
    image: tiramisu,
  },
  {
    id: 'panna-cotta',
    name: 'Panna cotta',
    course: { nl: 'Dolci', en: 'Desserts', it: 'Dolci' },
    image: pannaCotta,
  },
  {
    id: 'cannoli',
    name: 'Cannoli siciliani',
    course: { nl: 'Dolci', en: 'Desserts', it: 'Dolci' },
    image: cannoli,
  },
];

export function dishesByCourse(lang = 'en') {
  const map = new Map();
  for (const dish of dishes) {
    const course = dish.course[lang] || dish.course.en;
    if (!map.has(course)) map.set(course, []);
    map.get(course).push(dish);
  }
  return [...map.entries()].map(([course, items]) => ({ course, items }));
}
