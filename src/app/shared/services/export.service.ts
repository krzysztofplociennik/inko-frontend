import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { baseUrl } from '../utils/urlUtils';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(
    private http: HttpClient
  ) { }

  exportWithHTML() {
    const url: string = baseUrl + '/export/withHTML';

    const token = localStorage.getItem('jwt');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    })
      .subscribe(blob => {
        this.downloadFile(blob, true);
      });
  }

  exportWithoutHTML() {
    const url: string = baseUrl + '/export/withoutHTML';

    const token = localStorage.getItem('jwt');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    })
      .subscribe(blob => {
        this.downloadFile(blob, false);
      });
  }

  private downloadFile(blob: Blob, withHTML: boolean) {

    const filename = withHTML ?
      'inko_backup_HTML_' + new Date() + '.zip'
      :
      'inko_backup_NO_HTML_' + new Date() + '.zip';

    const a = document.createElement('a');

    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
