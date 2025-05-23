import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl } from '../utils/urlUtils';
import { JwtUtils } from '../utils/jwtUtils';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = getBaseUrl();
  }

  async exportWithHTML() {
    const url: string = this.baseUrl + '/export/withHTML';

    const token = JwtUtils.getToken();

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

  async exportWithoutHTML() {
    const url: string = this.baseUrl + '/export/withoutHTML';

    const token = JwtUtils.getToken();

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
