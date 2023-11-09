import { Injectable } from '@angular/core';
import { ApiService } from '@limble/ui/shared';
import { HttpClient } from '@angular/common/http';
import { Translation } from '../models/translation.model';

@Injectable({
  providedIn: 'root',
})
export class TranslationsService extends ApiService<Translation> {
  constructor(httpClient: HttpClient) {
    super('translations', httpClient);
  }
}
