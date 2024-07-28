import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleSearch } from '../search-result-item/article-result';
import { Observable, map } from 'rxjs';
import { baseUrl } from 'src/app/shared/urlUtils';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  search(page: number, itemsPerPage: number): Observable<ArticleSearch[]> {
    const url: string = baseUrl + '/search-articles';
    const params = new HttpParams()
      .set('page', page)
      .set('size', itemsPerPage);
    
    return this.http.get<ArticleSearch[]>(url, { params }).pipe(
      map((response: ArticleSearch[]) => {
        return response;
      })
    );
  }
}
