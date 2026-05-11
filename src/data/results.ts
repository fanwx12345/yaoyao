import resultsMarkdown from '../../测试结果文案.md?raw';
import { ELEMENT_ORDER } from './elements';
import { parseResultsMarkdown } from './parseMarkdown';

const parsedResults = parseResultsMarkdown(resultsMarkdown);

export const personalityResults = ELEMENT_ORDER.flatMap((mainElement) =>
  ELEMENT_ORDER.map((subElement) => {
    const result = parsedResults.find(
      (item) => item.mainElement === mainElement && item.subElement === subElement,
    );

    if (!result) {
      throw new Error(`Missing result for ${mainElement}-${subElement}`);
    }

    return result;
  }),
);
