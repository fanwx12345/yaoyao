export type ElementKey = 'fire' | 'water' | 'wood' | 'metal' | 'earth';

export type ElementScores = Record<ElementKey, number>;

export interface ElementMeta {
  key: ElementKey;
  label: string;
  icon: string;
  tone: string;
  textClass: string;
  borderClass: string;
  bgClass: string;
}

export interface QuestionOption {
  id: string;
  label: string;
  element: ElementKey;
  weight: number;
}

export interface Question {
  id: string;
  index: number;
  prompt: string;
  options: QuestionOption[];
}

export interface PersonalityResult {
  id: string;
  mainElement: ElementKey;
  subElement: ElementKey;
  comboLabel: string;
  state: string;
  typeName: string;
  anchor: string;
  animal: string;
  creativeCareer: string;
  missing: string;
  absurdReading: string;
  bestMatch: string;
  relationshipReading: string;
  quote: string;
  fortuneStyle: string;
  longDescription: string;
  careers: string[];
  image: string;
}
