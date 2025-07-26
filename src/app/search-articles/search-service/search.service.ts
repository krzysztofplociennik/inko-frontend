import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleSearch } from '../search-result-item/article-result';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { getBaseUrl } from 'src/app/shared/utils/urlUtils';
import { SearchFilter } from './search-filter.api';
import { SearchResult } from '../search-result-item/search-result.api';
import { PaginationResponse } from 'src/app/shared/pagination/pagination-response.api';

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

searchWithFilters(pageNumber: number, itemsPerPage: number, filter: SearchFilter): Observable<SearchResult> {
  const url: string = this.baseBackendUrl + '/search-articles';
  const params = new HttpParams()
    .set('page', pageNumber.toString())
    .set('size', itemsPerPage.toString());
    
  return this.http.post<PaginationResponse<ArticleSearch>>(url, filter, { params }).pipe(
    map((response: PaginationResponse<ArticleSearch>) => {      
      const result: SearchResult = {
        articles: response.content || [],
        totalElements: response.totalElements || 0,
        totalPages: response.totalPages || 0,
        currentPage: response.number || 0,
        pageSize: response.size || itemsPerPage,
        hasNext: !response.last,
        hasPrevious: !response.first
      };
      return result;
    }),
    catchError(error => {
      console.error('(EID: 202507191357) Error while searching for articles!', error);
      
      const emptyResult: SearchResult = {
        articles: [],
        totalElements: 0,
        totalPages: 0,
        currentPage: pageNumber,
        pageSize: itemsPerPage,
        hasNext: false,
        hasPrevious: false
      };
      
      return of(emptyResult);
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

