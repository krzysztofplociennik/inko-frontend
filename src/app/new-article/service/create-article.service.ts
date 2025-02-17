import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { getBaseUrl } from 'src/app/shared/utils/urlUtils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleCreate } from '../article';

@Injectable({
  providedIn: 'root'
})
export class CreateArticleService {

  baseBackendUrl: string = '';

  constructor(
    private http: HttpClient
  ) { 
    this.baseBackendUrl = getBaseUrl();
  }

  create(
    title: string,
    type: string,
    tags: string[],
    content: string
  ): Observable<string> {
    const url: string = this.baseBackendUrl + '/article/add';
    const articleToSend: ArticleCreate = {
      title: title, 
      content: content,
      type: type,
      tags: tags
    };  

    const token = localStorage.getItem('jwt');    
    
    const headers = new HttpHeaders()
    .set('Accept', 'text/plain')
    .set('Authorization', `Bearer ${token}`);
    
    return this.http.post(url, articleToSend, { 
      headers: headers, 
      responseType: 'text' 
    }).pipe(
      map(response => response.trim())
    );
  }
}
