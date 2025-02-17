import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl } from '../utils/urlUtils';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleReadService {

  baseBackendUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseBackendUrl = getBaseUrl();
  }

  fetchAllArticleTypes(): Observable<string[]> {
    const url: string = this.baseBackendUrl + '/article/getTypes';

    return this.http.get<string[]>(url).pipe(
      tap((response: string[]) => { return response })
    );
  }
}
