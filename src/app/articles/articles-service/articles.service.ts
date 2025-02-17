import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleDetails } from '../article-details/article-details';
import { Observable, catchError, map, throwError } from 'rxjs';
import { getBaseUrl } from 'src/app/shared/utils/urlUtils';
import { AllArticlesItem } from './all-articles-item';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  baseBackendUrl: string = '';

  constructor(
    private http: HttpClient,
  ) {
    this.baseBackendUrl = getBaseUrl();
   }

  // todo: separate method onto different services?

  getArticleDetails(id: string): Observable<ArticleDetails> {
    const url: string = this.baseBackendUrl + '/article/getDetails';
    const params = new HttpParams()
      .set('id', id);

    return this.http.get<ArticleDetails>(url, { params }).pipe(
      map((response: ArticleDetails) => {
        return response;
      })
    );
  }

  getAllArticles(): Observable<AllArticlesItem[]> {
    const url: string = this.baseBackendUrl + '/article/getAll';

    return this.http.get<AllArticlesItem[]>(url).pipe(
      map((response: AllArticlesItem[]) => {
        return response;
      })
    );
  }

  deleteArticle(id: string): Observable<string> {
    const url: string = `${this.baseBackendUrl}/article/delete`;

    const token = localStorage.getItem('jwt');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.delete(url, {
      params: { id: id },
      headers: headers,
      responseType: 'text'
    }).pipe(
      map((response: string) => {
        return response;
      }),
      catchError(error => {
        navigator
        return throwError(() => error);
      })
    );
  }

  updateArticle(article: ArticleDetails): Observable<ArticleDetails> {
    const token = localStorage.getItem('jwt');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    const url: string = `${this.baseBackendUrl}/article/update`;
    return this.http.put<ArticleDetails>(url, article, {
      headers: headers,
    });
  }
}
