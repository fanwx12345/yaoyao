import { ELEMENT_LABELS, getComboId } from './elements';
import type { ElementKey } from '../types/personality';

const bundledImages = import.meta.glob('../../images/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const bundledImageByFileName = Object.fromEntries(
  Object.entries(bundledImages).map(([path, url]) => [
    path.split('/').at(-1) ?? path,
    url,
  ]),
);

export const getPersonalityImage = (main: ElementKey, sub: ElementKey) => {
  const fileName = `${ELEMENT_LABELS[main]} + ${ELEMENT_LABELS[sub]}.png`;
  return bundledImageByFileName[fileName] ?? `/images/${encodeURI(fileName)}`;
};

export const imageMap = {
  fire: {
    fire: getPersonalityImage('fire', 'fire'),
    water: getPersonalityImage('fire', 'water'),
    wood: getPersonalityImage('fire', 'wood'),
    metal: getPersonalityImage('fire', 'metal'),
    earth: getPersonalityImage('fire', 'earth'),
  },
  water: {
    fire: getPersonalityImage('water', 'fire'),
    water: getPersonalityImage('water', 'water'),
    wood: getPersonalityImage('water', 'wood'),
    metal: getPersonalityImage('water', 'metal'),
    earth: getPersonalityImage('water', 'earth'),
  },
  wood: {
    fire: getPersonalityImage('wood', 'fire'),
    water: getPersonalityImage('wood', 'water'),
    wood: getPersonalityImage('wood', 'wood'),
    metal: getPersonalityImage('wood', 'metal'),
    earth: getPersonalityImage('wood', 'earth'),
  },
  metal: {
    fire: getPersonalityImage('metal', 'fire'),
    water: getPersonalityImage('metal', 'water'),
    wood: getPersonalityImage('metal', 'wood'),
    metal: getPersonalityImage('metal', 'metal'),
    earth: getPersonalityImage('metal', 'earth'),
  },
  earth: {
    fire: getPersonalityImage('earth', 'fire'),
    water: getPersonalityImage('earth', 'water'),
    wood: getPersonalityImage('earth', 'wood'),
    metal: getPersonalityImage('earth', 'metal'),
    earth: getPersonalityImage('earth', 'earth'),
  },
} satisfies Record<ElementKey, Record<ElementKey, string>>;

export const getImageById = (main: ElementKey, sub: ElementKey) =>
  imageMap[main]?.[sub] ?? `/images/${getComboId(main, sub)}.png`;
