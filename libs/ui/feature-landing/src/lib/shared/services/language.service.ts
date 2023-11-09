import { Injectable } from '@angular/core';
import { ApiService } from '@limble/ui/shared';
import { HttpClient } from '@angular/common/http';
import { Language } from '../models/language.model';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService extends ApiService<Language> {
  constructor(httpClient: HttpClient) {
    super('languages', httpClient);
  }
}
