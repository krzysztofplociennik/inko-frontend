import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl } from '../utils/urlUtils';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = getBaseUrl();
   }

  importFiles() {
    const url: string = this.baseUrl + '/import/multiple';

    const token = localStorage.getItem('jwt');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    this.http.get(url, {
      headers: headers,
      responseType: 'text' as const
    })
      .subscribe(text => {
        console.log('response: ' + text);
      });
  }
}
