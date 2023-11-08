import { HttpClient, HttpParams } from '@angular/common/http';
import { PageQuery } from './api.model';

export abstract class ApiService<T> {
  protected constructor(
    private entityName: string,
    private httpClient: HttpClient
  ) {}

  public getAll(pageQuery?: PageQuery) {
    return this.request('GET', pageQuery);
  }

  public get(id: number) {
    return this.request('GET', undefined, undefined, id);
  }

  protected request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    pageQuery?: PageQuery,
    body?: any,
    id?: number
  ) {
    const url = this.getUrl(id);
    const options = this.getOptions(pageQuery, body);

    return this.httpClient.request<T>(method, url, options);
  }

  private getUrl(id?: number) {
    const idPath = !id ? '' : `/${id}`;
    return `http://localhost:3000/${this.entityName}${idPath}`;
  }

  private getOptions(pageQuery?: PageQuery, body?: any) {
    const httpParams = new HttpParams();
    if (pageQuery) {
      httpParams.set('limit', pageQuery.limit.toString());
      httpParams.set('offset', pageQuery.offset.toString());
    }

    return {
      params: httpParams,
      body,
    };
  }
}