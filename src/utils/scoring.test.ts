import { describe, expect, it } from 'vitest';
import { questions } from '../data/questions';
import { personalityResults } from '../data/results';
import type { ElementScores, Question } from '../types/personality';
import {
  calculateScores,
  getTopElements,
  resolvePersonalityType,
} from './scoring';

const makeQuestion = (
  id: string,
  optionId: string,
  element: Question['options'][number]['element'],
): Question => ({
  id,
  index: Number(id.replace('q', '')),
  prompt: id,
  options: [{ id: optionId, label: optionId, element, weight: 1 }],
});

describe('scoring', () => {
  it('calculateScores counts selected option elements', () => {
    const localQuestions = [
      makeQuestion('q1', 'a', 'fire'),
      makeQuestion('q2', 'b', 'water'),
      makeQuestion('q3', 'c', 'fire'),
    ];

    expect(calculateScores(localQuestions, { q1: 'a', q2: 'b', q3: 'c' })).toEqual({
      fire: 2,
      water: 1,
      wood: 0,
      metal: 0,
      earth: 0,
    });
  });

  it('getTopElements resolves a normal first and second place', () => {
    const scores: ElementScores = {
      fire: 5,
      water: 4,
      wood: 3,
      metal: 2,
      earth: 1,
    };

    expect(getTopElements(scores)).toEqual({
      mainElement: 'fire',
      subElement: 'water',
    });
  });

  it('getTopElements uses tie-break priority', () => {
    const scores: ElementScores = {
      fire: 3,
      water: 3,
      wood: 3,
      metal: 2,
      earth: 1,
    };

    expect(getTopElements(scores)).toEqual({
      mainElement: 'fire',
      subElement: 'water',
    });
  });

  it('getTopElements returns a pure element when only one element scores', () => {
    const scores: ElementScores = {
      fire: 0,
      water: 0,
      wood: 0,
      metal: 8,
      earth: 0,
    };

    expect(getTopElements(scores)).toEqual({
      mainElement: 'metal',
      subElement: 'metal',
    });
  });

  it('resolvePersonalityType finds the matrix result', () => {
    const result = resolvePersonalityType({
      fire: 6,
      water: 1,
      wood: 2,
      metal: 5,
      earth: 1,
    });

    expect(result.id).toBe('fire-metal');
    expect(result.state).toBe('熔炉型');
  });

  it('loads 15 questions and 25 results from source documents', () => {
    expect(questions).toHaveLength(15);
    expect(personalityResults).toHaveLength(25);
  });
});
