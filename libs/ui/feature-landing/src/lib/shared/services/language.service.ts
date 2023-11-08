import { Injectable } from '@angular/core';
import { ApiService } from '@limble/ui/shared';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService extends ApiService<any> {
  constructor(httpClient: HttpClient) {
    super('languages', httpClient);
  }
}
