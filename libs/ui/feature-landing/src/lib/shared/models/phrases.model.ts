import { Translation } from './translation.model';

export interface Phrase {
  key: string;
  text: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  translations: Translation[];
  scope: any;
}
