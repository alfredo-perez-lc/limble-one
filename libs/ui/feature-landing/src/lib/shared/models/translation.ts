import { Language } from './language.model';

export interface Translation {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  language: Language;
}
