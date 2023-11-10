import { Injectable } from '@angular/core';
import { Phrase } from '../../../shared';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationsDialogService {
  addedPhraseSubject = new Subject<Phrase>();
  public addedPhrase$ = this.addedPhraseSubject.asObservable();
  constructor() {}

  addPhrase(phrase: Phrase) {
    this.addedPhraseSubject.next(phrase);
  }
}
