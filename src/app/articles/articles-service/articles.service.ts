import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleDetails } from '../article-details/article-details';
import { Observable, catchError, map, throwError } from 'rxjs';
import { baseUrl } from 'src/app/shared/utils/urlUtils';
import { AllArticlesItem } from './all-articles-item';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private http: HttpClient,
  ) {}

  // todo: separate method onto different services?

  getArticleDetails(id: string): Observable<ArticleDetails> {
    const url: string = baseUrl + '/article';
    const params = new HttpParams()
      .set('id', id);
    
    return this.http.get<ArticleDetails>(url, { params }).pipe(
      map((response: ArticleDetails) => {
        return response;
      })
    );
  }

  getAllArticles(): Observable<AllArticlesItem[]> {
    const url: string = baseUrl + '/article/getAll';
    
    return this.http.get<AllArticlesItem[]>(url).pipe(
      map((response: AllArticlesItem[]) => {
        return response;
      })
    );
  }

  deleteArticle(id: string): Observable<string> {
    const url: string = `${baseUrl}/article`;
  
    return this.http.delete(url, { 
      params: { id: id },
      responseType: 'text'
    }).pipe(
      map((response: string) => {
        return response;
      }),
      catchError(error => {navigator
        return throwError(() => error);
      })
    );
  }

  updateArticle(id: string, article: ArticleDetails): Observable<ArticleDetails> {
    const url: string = `${baseUrl}/article`;
    return this.http.put<ArticleDetails>(url, article);
  }
}
