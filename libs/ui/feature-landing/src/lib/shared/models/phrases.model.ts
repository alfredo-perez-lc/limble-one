import { Translation } from './translation';

export interface Phrase {
  key: string;
  text: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  translations: Translation[];
  scope: any;
}
