import { Injectable } from '@angular/core';

@Injectable()
export class PhrasesService {
  getPhrasesData() {
    return [
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
    ];
  }
}
