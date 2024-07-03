import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { baseUrl } from 'src/app/shared/urlUtils';
import { HttpClient } from '@angular/common/http';
import { ArticleCreate } from '../article';

@Injectable({
  providedIn: 'root'
})
export class CreateArticleService {

  constructor(
    private http: HttpClient
  ) { }

  create(): Observable<string> {
    const url: string = baseUrl + '/articles/add';

    const dummyArticle: ArticleCreate = {
      title: 'dummyTitle ', 
      content: 'dummyContent ',
      type: 'PROGRAMMING',
      tags: ['Java', 'Spring', 'REST', 'Hibernate']
    };
    
    return this.http.post<string>(url, dummyArticle).pipe(
      map((response: string) => {        
        return response;
      })
    );
  }
}
