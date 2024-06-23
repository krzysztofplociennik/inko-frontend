import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { baseUrl } from '../../shared/urlUtils';
import { Observable, map, shareReplay } from 'rxjs';
import { PostCreate, PostRead } from '../post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}

  fetchPosts(page: number, itemsPerPage: number): Observable<PostRead[]> {
    const url: string = baseUrl + '/posts/getPosts';
    const params = new HttpParams()
      .set('page', page)
      .set('size', itemsPerPage);
    
    return this.http.get<PostRead[]>(url, { params }).pipe(
      map((response: PostRead[]) => {
        return response;
      })
    );
  }

  createPost(title: string, content: string): Observable<number> {
    const url: string = baseUrl + '/posts/addPost';

    const dummyPost: PostCreate = { title: title, content: content };
    
    return this.http.post<number>(url, dummyPost).pipe(
      map((response: number) => {        
        return response;
      })
    );
  }
  
}
