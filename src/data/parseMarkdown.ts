import { getComboId, getComboLabel, LABEL_TO_ELEMENT } from './elements';
import { getPersonalityImage } from './imageMap';
import type {
  ElementKey,
  PersonalityResult,
  Question,
  QuestionOption,
} from '../types/personality';

const resultHeaders = [
  'comboLabel',
  'state',
  'animal',
  'creativeCareer',
  'missing',
  'absurdReading',
  'bestMatch',
  'relationshipReading',
  'quote',
  'fortuneStyle',
  'icon',
  'longDescription',
] as const;

const elementLabels = Object.keys(LABEL_TO_ELEMENT).join('');
const comboPattern = new RegExp(`^[${elementLabels}] \\+ [${elementLabels}]$`);

const stripMarkdownImages = (value: string) =>
  value.replace(/!\[[^\]]*]\([^)]*\)/g, '').trim();

const splitMarkdownRow = (line: string) => {
  const cells: string[] = [];
  let current = '';
  let escaped = false;

  for (const char of line.trim()) {
    if (char === '|' && !escaped) {
      cells.push(current.trim());
      current = '';
    } else {
      current += char;
    }
    escaped = char === '\\' && !escaped;
    if (char !== '\\') escaped = false;
  }

  if (current.trim() || line.trim().endsWith('|')) cells.push(current.trim());
  if (cells[0] === '') cells.shift();
  if (cells.at(-1) === '') cells.pop();

  return cells.map((cell) => cell.replace(/\\\|/g, '|'));
};

const getTypeInfo = (comboLabel: string, state: string, source: string) => {
  const nameLabel = '类型命名：';
  const anchorLabel = '类型锚点：';
  const nameStart = source.indexOf(nameLabel);
  const anchorStart = source.indexOf(anchorLabel);

  if (comboLabel === '火 + 木' && !source.startsWith('火+木')) {
    return {
      typeName: 'SPARK',
      anchor: '热情已点燃，持续性仍在加载中。',
      longDescription:
        '火+木 | 速燃型类型命名：SPARK（速燃型）类型锚点：热情已点燃，持续性仍在加载中。你擅长开始，擅长被新鲜感点亮，也擅长在三分钟后发现另一片更亮的火光。你的职业建议是选择需要快速启动、快速试错、快速点燃团队情绪的场景，把短促但高亮的热情用在真正需要引爆的地方。',
    };
  }

  if (nameStart < 0 || anchorStart < 0) {
    return {
      typeName: state.replace('型', '').toUpperCase(),
      anchor: source.slice(0, 36),
      longDescription: source,
    };
  }

  const rawName = source.slice(nameStart + nameLabel.length, anchorStart).trim();
  const typeName = rawName.split('（')[0].trim();
  const afterAnchor = source.slice(anchorStart + anchorLabel.length);
  const anchor = afterAnchor.split('。')[0]?.trim();

  return {
    typeName,
    anchor: anchor ? `${anchor}。` : source.slice(0, 36),
    longDescription: source,
  };
};

const getCareers = (longDescription: string, creativeCareer: string) => {
  const marker = '天选职业：';
  const start = longDescription.indexOf(marker);
  if (start < 0) return [creativeCareer];

  const chunk = longDescription.slice(start + marker.length);
  const sentence = chunk.split(/[您你]/)[0] ?? '';
  const careers = sentence
    .replace(/[。|]/g, '/')
    .split('/')
    .map((career) => career.trim())
    .filter(Boolean);

  return careers.length ? careers : [creativeCareer];
};

export const parseResultsMarkdown = (markdown: string): PersonalityResult[] => {
  return markdown
    .split(/\r?\n/)
    .map(splitMarkdownRow)
    .filter((cells) => cells.length >= resultHeaders.length && comboPattern.test(cells[0]))
    .map((cells) => {
      const comboLabel = cells[0];
      const [mainLabel, subLabel] = comboLabel.split(' + ');
      const mainElement = LABEL_TO_ELEMENT[mainLabel];
      const subElement = LABEL_TO_ELEMENT[subLabel];
      const longSource = stripMarkdownImages(cells[11]);
      const info = getTypeInfo(comboLabel, cells[1], longSource);

      return {
        id: getComboId(mainElement, subElement),
        mainElement,
        subElement,
        comboLabel: getComboLabel(mainElement, subElement),
        state: cells[1],
        animal: cells[2],
        creativeCareer: cells[3],
        missing: cells[4],
        absurdReading: cells[5],
        bestMatch: cells[6],
        relationshipReading: cells[7],
        quote: cells[8],
        fortuneStyle: cells[9],
        typeName: info.typeName,
        anchor: info.anchor,
        longDescription: info.longDescription,
        careers: getCareers(info.longDescription, cells[3]),
        image: getPersonalityImage(mainElement, subElement),
      };
    });
};

export const parseQuestionsMarkdown = (markdown: string): Question[] => {
  const questionBlocks = markdown.matchAll(/---Q(\d+)：([\s\S]*?)(?=---Q\d+：|---计分规则|$)/g);

  return Array.from(questionBlocks).map((match) => {
    const [, indexValue, block] = match;
    const index = Number(indexValue);
    const [promptPart] = block.split(/\r?\n\s*·/);
    const prompt = promptPart.trim();
    const optionPattern = /·\s*[^A-E]*([A-E])\.\s*([\s\S]*?)（([火水木金土])）/g;
    const options: QuestionOption[] = Array.from(block.matchAll(optionPattern)).map(
      ([, optionId, label, elementLabel]) => ({
        id: optionId.toLowerCase(),
        label: label.trim(),
        element: LABEL_TO_ELEMENT[elementLabel],
        weight: 1,
      }),
    );

    return {
      id: `q${index}`,
      index,
      prompt,
      options,
    };
  });
};

export const findResult = (
  results: PersonalityResult[],
  mainElement: ElementKey,
  subElement: ElementKey,
) => results.find((result) => result.id === getComboId(mainElement, subElement));
