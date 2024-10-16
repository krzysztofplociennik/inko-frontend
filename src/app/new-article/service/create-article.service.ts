import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { baseUrl } from 'src/app/shared/utils/urlUtils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleCreate } from '../article';

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
    
    const headers = new HttpHeaders().set('Accept', 'text/plain');
    
    return this.http.post(url, articleToSend, { 
      headers: headers, 
      responseType: 'text' 
    }).pipe(
      map(response => response.trim())
    );
  }
}
