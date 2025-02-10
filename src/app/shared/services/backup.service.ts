import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { baseUrl } from '../utils/urlUtils';

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  constructor(
    private http: HttpClient
  ) { }

  doBackup() {

    const url: string = baseUrl + '/backup';

    this.http.get(url, { responseType: 'blob' })
      .subscribe(blob => {
        this.downloadFile(blob);
      });

  }

  private downloadFile(blob: Blob) {
    const filename = 'inko_backup_' + new Date() + '.zip';

    const a = document.createElement('a');

    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
