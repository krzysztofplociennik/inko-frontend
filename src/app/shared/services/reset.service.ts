import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl } from '../utils/urlUtils';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(
    private http: HttpClient
  ) { }

  reset(): Observable<string> {
    const url = getBaseUrl() + '/reset';
    return this.http.post(url, null, { responseType: 'text' });
  }
}
