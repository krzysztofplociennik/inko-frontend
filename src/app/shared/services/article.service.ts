import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../utils/urlUtils';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  fetchAllArticleTypes(): Observable<string[]> {
    const url: string = baseUrl + '/article/getTypes';

    return this.http.get<string[]>(url).pipe(
      tap((response: string[]) => { return response })
    );
  }
}
