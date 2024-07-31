import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleDetails } from '../article-details/article-details';
import { Observable, map } from 'rxjs';
import { baseUrl } from 'src/app/shared/urlUtils';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) {}

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
}
