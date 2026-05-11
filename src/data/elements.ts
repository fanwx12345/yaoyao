import type { ElementKey, ElementMeta, ElementScores } from '../types/personality';

export const ELEMENT_ORDER: ElementKey[] = [
  'fire',
  'water',
  'wood',
  'metal',
  'earth',
];

export const ELEMENT_LABELS: Record<ElementKey, string> = {
  fire: '火',
  water: '水',
  wood: '木',
  metal: '金',
  earth: '土',
};

export const LABEL_TO_ELEMENT: Record<string, ElementKey> = {
  火: 'fire',
  水: 'water',
  木: 'wood',
  金: 'metal',
  土: 'earth',
};

export const EMPTY_SCORES: ElementScores = {
  fire: 0,
  water: 0,
  wood: 0,
  metal: 0,
  earth: 0,
};

export const ELEMENT_META: Record<ElementKey, ElementMeta> = {
  fire: {
    key: 'fire',
    label: '火',
    icon: '🔥',
    tone: '热烈、爆发、漂亮地烧起来',
    textClass: 'text-fire-ink',
    borderClass: 'border-fire',
    bgClass: 'bg-fire-soft',
  },
  water: {
    key: 'water',
    label: '水',
    icon: '💧',
    tone: '流动、潜伏、情绪像深海',
    textClass: 'text-water-ink',
    borderClass: 'border-water',
    bgClass: 'bg-water-soft',
  },
  wood: {
    key: 'wood',
    label: '木',
    icon: '🌳',
    tone: '生长、计划、把明天列成清单',
    textClass: 'text-wood-ink',
    borderClass: 'border-wood',
    bgClass: 'bg-wood-soft',
  },
  metal: {
    key: 'metal',
    label: '金',
    icon: '💰',
    tone: '锋利、效率、把一切换算成成本',
    textClass: 'text-metal-ink',
    borderClass: 'border-metal',
    bgClass: 'bg-metal-soft',
  },
  earth: {
    key: 'earth',
    label: '土',
    icon: '⛰️',
    tone: '稳定、承接、已经精神退休',
    textClass: 'text-earth-ink',
    borderClass: 'border-earth',
    bgClass: 'bg-earth-soft',
  },
};

export const getComboId = (main: ElementKey, sub: ElementKey) =>
  `${main}-${sub}`;

export const getComboLabel = (main: ElementKey, sub: ElementKey) =>
  `${ELEMENT_LABELS[main]} + ${ELEMENT_LABELS[sub]}`;
