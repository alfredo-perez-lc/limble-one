import { Injectable } from '@angular/core';
import { ApiService } from '@limble/ui/shared';
import { HttpClient } from '@angular/common/http';
import { Language } from '@limble/shared/domain';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService extends ApiService<Language> {
  constructor(httpClient: HttpClient) {
    super('languages', httpClient);
  }

  downloadAll() {
    this.httpClient
      .request('GET', `http://localhost:3000/languages/1/download-all`)
      .subscribe();
  }
}
