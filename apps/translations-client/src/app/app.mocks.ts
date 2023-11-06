import { Scope } from './scopes.entity';
import { Phrase } from './phrases.entity';

const data = {
  scopes: [
    { name: 'Global', code: 'G' },
    { name: 'Work Requests', code: 'WR' },
  ] as Array<Scope>,

  phrases: [
    {
      key: 'Paused',
      text: 'Paused',
      id: 1,
    },
    {
      key: 'Translate',
      text: 'Translate',
      id: 2,
    },
    {
      key: 'Language',
      text: 'Language',
      id: 3,
    },
    {
      key: 'Words',
      text: 'Words',
      id: 4,
    },
    {
      key: 'Alphabet',
      text: 'Alphabet',
      id: 5,
    },
  ],

  translations: [
    {
      language: 10, // Spanish
      text: 'Pausado',
    },
    {
      language: 11, // Chinese
      text: '暂停',
    },
    {
      German: 12, // German
      text: 'Angehalten',
    },
  ],
};

export const AppMocks = { data };
