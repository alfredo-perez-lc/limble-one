import { Injectable } from '@angular/core';
import { ApiService } from '@limble/ui/shared';
import { HttpClient } from '@angular/common/http';
import { Phrase } from '../models/phrases.model';

@Injectable({
  providedIn: 'root',
})
export class PhraseService extends ApiService<Phrase> {
  constructor(httpClient: HttpClient) {
    super('phrases', httpClient);
  }
}
