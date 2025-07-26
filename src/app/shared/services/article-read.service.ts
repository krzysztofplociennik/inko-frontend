import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl } from '../utils/urlUtils';
import { map, Observable, of, tap } from 'rxjs';
import { ArticleType } from 'src/app/new-article/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleReadService {

  baseBackendUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseBackendUrl = getBaseUrl();
  }

  fetchArticleTypes(): Observable<ArticleType[]> {
    const storageTypesAsString = localStorage.getItem('article-types');
    if (storageTypesAsString) {
      const storageTypesAsArray: string[] = storageTypesAsString.split(",");
      return of(this.mapIntoArticleTypeArray(storageTypesAsArray))
    }

    const url: string = this.baseBackendUrl + '/article/getTypes';

    return this.http.get<string[]>(url).pipe(
      tap((requestTypes: string[]) => {
        localStorage.setItem('article-types', requestTypes.toString());
      }),
      map((types: string[]) => {
        return this.mapIntoArticleTypeArray(types);
      })
    )
  }

  private mapIntoArticleTypeArray(types: string[]) {
    let array: ArticleType[] = [];
    types.forEach(type => {
      array.push( {name: type })
    });
    return array;
  }
}
