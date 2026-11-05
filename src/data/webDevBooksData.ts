import { htmlComicData } from './htmlComicData';
import { cssComicData } from './cssComicData';
import { tailwindComicData } from './tailwindComicData';
import { reactComicData } from './reactComicData';
import { typescriptComicData } from './typescriptComicData';
import { WebDevBook, WebDevBookId } from '../types/webDevComicTypes';

export const webDevBooks: Record<WebDevBookId, WebDevBook> = {
  html: htmlComicData,
  css: cssComicData,
  tailwind: tailwindComicData,
  react: reactComicData,
  typescript: typescriptComicData
};

export const webDevBooksList: WebDevBook[] = [
  htmlComicData,
  cssComicData,
  tailwindComicData,
  reactComicData,
  typescriptComicData
];
