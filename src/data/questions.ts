import questionsMarkdown from '../../性格测试+职业规划题库.md?raw';
import { parseQuestionsMarkdown } from './parseMarkdown';

export const questions = parseQuestionsMarkdown(questionsMarkdown);
