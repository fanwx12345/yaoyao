import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { questions } from '../data/questions';
import { calculateScores, type AnswerMap } from '../utils/scoring';
import type { ElementScores } from '../types/personality';

interface TestState {
  answers: AnswerMap;
  scores: ElementScores | null;
  setAnswer: (questionId: string, optionId: string) => void;
  completeTest: () => ElementScores;
  resetTest: () => void;
}

export const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      answers: {},
      scores: null,
      setAnswer: (questionId, optionId) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: optionId },
        })),
      completeTest: () => {
        const scores = calculateScores(questions, get().answers);
        set({ scores });
        return scores;
      },
      resetTest: () => set({ answers: {}, scores: null }),
    }),
    {
      name: 'yaoyao-check-now',
    },
  ),
);
