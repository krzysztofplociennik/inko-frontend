import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { baseUrl } from '../utils/urlUtils';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  constructor(
    private http: HttpClient
  ) {}

  doBackup() {
    
    const url: string = baseUrl + '/backup';

    return this.http.get<string>(url).pipe(
      tap((response: string) => { return response })
    );

  }
}
