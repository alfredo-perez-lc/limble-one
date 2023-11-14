import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationQueryDto } from '@limble/shared/domain';

export abstract class ApiService<T> {
  protected constructor(
    private entityName: string,
    public httpClient: HttpClient
  ) {}

  public getAll(paginationQueryDto?: PaginationQueryDto): Observable<T[]> {
    return this.request('GET', paginationQueryDto);
  }

  public get(id: string): Observable<T> {
    return this.request('GET', undefined, undefined, id);
  }

  public create(body: Partial<T>): Observable<T> {
    return this.request('POST', undefined, body);
  }

  public update(id: string, body: Partial<T>): Observable<T> {
    return this.request('PATCH', undefined, body, id);
  }
  protected request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    paginationQuery?: PaginationQueryDto,
    body?: any,
    id?: string
  ) {
    const url = this.getUrl(id);
    const options = this.getOptions(paginationQuery, body);

    console.log({
      method,
      url,
      options,
    });

    return this.httpClient.request<T>(method, url, options);
  }

  private getUrl(id?: string) {
    const idPath = !id ? '' : `/${id}`;
    return `http://localhost:3000/${this.entityName}${idPath}`;
  }

  private getOptions(paginationQuery?: PaginationQueryDto, body?: any) {
    let params = {};
    if (paginationQuery) {
      const paginationParams = {
        limit: paginationQuery.limit.toString(),
        offset: paginationQuery.offset.toString(),
        orderBy: paginationQuery.orderBy,
        orderDirection: paginationQuery.orderDirection,
      };
      params = { ...paginationParams };
    }

    return {
      params,
      body,
    };
  }
}
