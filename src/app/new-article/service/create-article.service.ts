import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { baseUrl } from 'src/app/shared/urlUtils';
import { HttpClient } from '@angular/common/http';
import { ArticleCreate, ArticleType } from '../article';

@Injectable({
  providedIn: 'root'
})
export class CreateArticleService {

  constructor(
    private http: HttpClient
  ) { }

  create(
    title: string,
    type: string,
    tags: string[],
    content: string
  ): Observable<string> {
    const url: string = baseUrl + '/article/add';

    const articleToSend: ArticleCreate = {
      title: title, 
      content: content,
      type: type,
      tags: tags
    };
    
    return this.http.post<string>(url, articleToSend).pipe(
      map((response: string) => {        
        return response;
      })
    );
  }
}
