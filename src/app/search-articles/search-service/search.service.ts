import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleSearch } from '../search-result-item/article-result';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { getBaseUrl } from 'src/app/shared/utils/urlUtils';
import { SearchFilter } from './search-filter.api';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseBackendUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseBackendUrl = getBaseUrl();
  }

  search(page: number, itemsPerPage: number, searchPhrase: string): Observable<ArticleSearch[]> {
    const url: string = this.baseBackendUrl + '/search-articles';
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

  searchWithFilters(pageNumber: number, itemsPerPage: number, filter: SearchFilter) {
    const url: string = this.baseBackendUrl + '/search-articles';

    const params = new HttpParams()
      .set('page', '0')
      .set('size', '10');

    return this.http.post<ArticleSearch[]>(url, filter, { params }).pipe(
      map((response: any) => {
        if (response && response.content) {
          return response.content;
        }
        return response || [];
      }),
      catchError(error => {
        console.log('Error while searching for articles (EID: 202507191357)!', error)
        return of([]);
      })
    );
  }

  getAutocompletes(searchPhrase: string): Observable<string[]> {
    const url: string = this.baseBackendUrl + '/autocomplete';
    const params = new HttpParams()
      .set('searchPhrase', searchPhrase);

    return this.http.get<string[]>(url, { params }).pipe(
      map((response: string[]) => {
        return response;
      })
    );
  }
}

