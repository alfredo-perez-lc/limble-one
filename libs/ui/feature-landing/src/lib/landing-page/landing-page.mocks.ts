import { Translation } from '../shared';

const data = {
  scopes: [
    { name: 'Global', code: 'G' },
    { name: 'Work Requests', code: 'WR' },
  ],
  languages: [
    {
      id: 1,
      code: 'en',
      name: 'English',
    },
    {
      id: 2,
      code: 'es',
      name: 'Spanish',
    },
    {
      id: 3,
      code: 'ar',
      name: 'Arabic',
    },
    {
      id: 4,
      code: 'zh',
      name: 'Chinese',
    },
    {
      id: 5,
      code: 'nl',
      name: 'Dutch',
    },
    {
      id: 6,
      code: 'fr',
      name: 'French',
    },
    {
      id: 7,
      code: 'de',
      name: 'German',
    },
    {
      id: 8,
      code: 'he',
      name: 'Hebrew',
    },
    {
      id: 9,
      code: 'it',
      name: 'Italian',
    },
    {
      id: 10,
      code: 'lv',
      name: 'Latvian',
    },
    {
      id: 11,
      code: 'no',
      name: 'Norwegian',
    },
    {
      id: 12,
      code: 'pl',
      name: 'Polish',
    },
    {
      id: 13,
      code: 'pt',
      name: 'Portuguese',
    },
    {
      id: 14,
      code: 'ro',
      name: 'Romanian',
    },
    {
      id: 15,
      code: 'ru',
      name: 'Russian',
    },
    {
      id: 16,
      code: 'sw',
      name: 'Swedish',
    },
    {
      id: 17,
      code: 'th',
      name: 'Thai',
    },
    {
      id: 18,
      code: 'tr',
      name: 'Turkish',
    },
  ],
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
  translatedPhrase: {
    id: 1,
    key: 'hello_world',
    text: 'Hello World!',
    createdAt: '2023-11-09T01:32:57.658Z',
    updatedAt: '2023-11-09T01:32:57.658Z',
    scope: {
      id: 1,
      name: 'Global',
      description:
        'Contains phrases that are used in globally in the application or in multiple features',
      createdAt: '2023-11-08T23:33:12.935Z',
      updatedAt: '2023-11-08T23:33:12.935Z',
    },
    translations: [
      {
        id: 26,
        text: 'Hello World!',
        createdAt: '2023-11-09T01:32:57.991Z',
        updatedAt: '2023-11-09T01:32:57.991Z',
        language: {
          id: 1,
          code: 'en',
          name: 'English',
        },
      },
      {
        id: 27,
        text: '¡Hola mundo!',
        createdAt: '2023-11-09T01:32:58.220Z',
        updatedAt: '2023-11-09T01:32:58.220Z',
        language: {
          id: 2,
          code: 'es',
          name: 'Spanish',
        },
      },
      {
        id: 28,
        text: 'مرحبا بالعالم!',
        createdAt: '2023-11-09T01:32:58.460Z',
        updatedAt: '2023-11-09T01:32:58.460Z',
        language: {
          id: 3,
          code: 'ar',
          name: 'Arabic',
        },
      },
      {
        id: 29,
        text: '你好，世界！',
        createdAt: '2023-11-09T01:32:58.654Z',
        updatedAt: '2023-11-09T01:32:58.654Z',
        language: {
          id: 4,
          code: 'zh',
          name: 'Chinese',
        },
      },
      {
        id: 30,
        text: 'Hallo wereld!',
        createdAt: '2023-11-09T01:32:58.881Z',
        updatedAt: '2023-11-09T01:32:58.881Z',
        language: {
          id: 5,
          code: 'nl',
          name: 'Dutch',
        },
      },
      {
        id: 31,
        text: 'Bonjour tout le monde !',
        createdAt: '2023-11-09T01:32:59.112Z',
        updatedAt: '2023-11-09T01:32:59.112Z',
        language: {
          id: 6,
          code: 'fr',
          name: 'French',
        },
      },
      {
        id: 32,
        text: 'Hallo Welt!',
        createdAt: '2023-11-09T01:32:59.334Z',
        updatedAt: '2023-11-09T01:32:59.334Z',
        language: {
          id: 7,
          code: 'de',
          name: 'German',
        },
      },
      {
        id: 33,
        text: 'שלום עולם!',
        createdAt: '2023-11-09T01:32:59.564Z',
        updatedAt: '2023-11-09T01:32:59.564Z',
        language: {
          id: 8,
          code: 'he',
          name: 'Hebrew',
        },
      },
      {
        id: 34,
        text: 'Ciao mondo!',
        createdAt: '2023-11-09T01:32:59.763Z',
        updatedAt: '2023-11-09T01:32:59.763Z',
        language: {
          id: 9,
          code: 'it',
          name: 'Italian',
        },
      },
      {
        id: 35,
        text: 'Sveika pasaule!',
        createdAt: '2023-11-09T01:32:59.959Z',
        updatedAt: '2023-11-09T01:32:59.959Z',
        language: {
          id: 10,
          code: 'lv',
          name: 'Latvian',
        },
      },
      {
        id: 36,
        text: 'Hei verden!',
        createdAt: '2023-11-09T01:33:00.186Z',
        updatedAt: '2023-11-09T01:33:00.186Z',
        language: {
          id: 11,
          code: 'no',
          name: 'Norwegian',
        },
      },
      {
        id: 37,
        text: 'Witaj Świat!',
        createdAt: '2023-11-09T01:33:00.382Z',
        updatedAt: '2023-11-09T01:33:00.382Z',
        language: {
          id: 12,
          code: 'pl',
          name: 'Polish',
        },
      },
      {
        id: 38,
        text: 'Olá, mundo!',
        createdAt: '2023-11-09T01:33:00.598Z',
        updatedAt: '2023-11-09T01:33:00.598Z',
        language: {
          id: 13,
          code: 'pt',
          name: 'Portuguese',
        },
      },
      {
        id: 39,
        text: 'Bună lume!',
        createdAt: '2023-11-09T01:33:00.815Z',
        updatedAt: '2023-11-09T01:33:00.815Z',
        language: {
          id: 14,
          code: 'ro',
          name: 'Romanian',
        },
      },
      {
        id: 40,
        text: 'Привет, мир!',
        createdAt: '2023-11-09T01:33:01.016Z',
        updatedAt: '2023-11-09T01:33:01.016Z',
        language: {
          id: 15,
          code: 'ru',
          name: 'Russian',
        },
      },
      {
        id: 41,
        text: 'Habari Ulimwengu!',
        createdAt: '2023-11-09T01:33:01.212Z',
        updatedAt: '2023-11-09T01:33:01.212Z',
        language: {
          id: 16,
          code: 'sw',
          name: 'Swedish',
        },
      },
      {
        id: 42,
        text: 'สวัสดีเวิลด์!',
        createdAt: '2023-11-09T01:33:01.406Z',
        updatedAt: '2023-11-09T01:33:01.406Z',
        language: {
          id: 17,
          code: 'th',
          name: 'Thai',
        },
      },
      {
        id: 43,
        text: 'Merhaba Dünya!',
        createdAt: '2023-11-09T01:33:01.606Z',
        updatedAt: '2023-11-09T01:33:01.606Z',
        language: {
          id: 18,
          code: 'tr',
          name: 'Turkish',
        },
      },
    ] as unknown as Translation[],
  },
};

export const LandingPageMocks = {
  data,
};
