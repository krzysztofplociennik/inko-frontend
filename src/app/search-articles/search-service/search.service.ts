import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleSearch } from '../search-result-item/article-result';
import { Observable, map } from 'rxjs';
import { baseUrl } from 'src/app/shared/utils/urlUtils';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  search(page: number, itemsPerPage: number, searchPhrase: string): Observable<ArticleSearch[]> {
    const url: string = baseUrl + '/search-articles';
    const params = new HttpParams()
      .set('page', page)
      .set('size', itemsPerPage)
      .set('searchPhrase', searchPhrase);
    
    return this.http.get<ArticleSearch[]>(url, { params }).pipe(
      map((response: ArticleSearch[]) => {
        return response;
      })
    );
  }

  getAutocompletes(searchPhrase: string): Observable<string[]> {
    const url: string = baseUrl + '/autocomplete';
    const params = new HttpParams()
      .set('searchPhrase', searchPhrase);

    return this.http.get<string[]>(url, { params }).pipe(
      map((response: string[]) => {
        return response;
      })
    );
  }
}
