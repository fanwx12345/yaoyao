import { EMPTY_SCORES, ELEMENT_ORDER, getComboId } from '../data/elements';
import { personalityResults } from '../data/results';
import type {
  ElementKey,
  ElementScores,
  PersonalityResult,
  Question,
} from '../types/personality';

export type AnswerMap = Record<string, string>;

export const calculateScores = (
  questions: Question[],
  answers: AnswerMap,
): ElementScores => {
  const scores: ElementScores = { ...EMPTY_SCORES };

  for (const question of questions) {
    const answerId = answers[question.id];
    const option = question.options.find((item) => item.id === answerId);
    if (option) scores[option.element] += option.weight;
  }

  return scores;
};

export const sortElementsByScore = (scores: ElementScores) =>
  [...ELEMENT_ORDER].sort((left, right) => {
    const scoreDiff = scores[right] - scores[left];
    if (scoreDiff !== 0) return scoreDiff;
    return ELEMENT_ORDER.indexOf(left) - ELEMENT_ORDER.indexOf(right);
  });

export const getTopElements = (scores: ElementScores) => {
  const sortedElements = sortElementsByScore(scores);
  const mainElement = sortedElements[0];
  const secondElement = sortedElements[1];

  if (scores[mainElement] > 0 && scores[secondElement] === 0) {
    return { mainElement, subElement: mainElement };
  }

  return { mainElement, subElement: secondElement };
};

export const resolvePersonalityType = (
  scores: ElementScores,
  results: PersonalityResult[] = personalityResults,
) => {
  const { mainElement, subElement } = getTopElements(scores);
  const id = getComboId(mainElement, subElement);
  const result = results.find((item) => item.id === id);

  if (!result) {
    throw new Error(`Cannot resolve personality type: ${id}`);
  }

  return result;
};

export const getDominantPercent = (
  scores: ElementScores,
  element: ElementKey,
) => {
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  return total === 0 ? 0 : Math.round((scores[element] / total) * 100);
};
