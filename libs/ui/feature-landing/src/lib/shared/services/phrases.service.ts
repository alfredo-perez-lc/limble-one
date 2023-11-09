import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Phrase } from '../models/phrases.model';
import { ApiService } from '@limble/ui/shared';

@Injectable({
  providedIn: 'root',
})
export class PhraseService extends ApiService<Phrase> {
  constructor(httpClient: HttpClient) {
    super('phrases', httpClient);
  }
}
