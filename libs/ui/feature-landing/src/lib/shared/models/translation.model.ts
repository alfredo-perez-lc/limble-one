import { Language } from './language.model';

export interface Translation {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  language: Language;
}
