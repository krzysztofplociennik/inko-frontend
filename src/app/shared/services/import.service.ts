import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl } from '../utils/urlUtils';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  baseUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.baseUrl = getBaseUrl();
   }

  importFiles(formData: FormData) {
    const token = localStorage.getItem('token')

    const url: string = this.baseUrl + '/import/multiple';

      this.http.post(url, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).subscribe(
        response => {
            console.log('Upload successful:', response);
            this.messageService.add({ severity: 'success', summary: 'File Uploaded', detail: '' });
        },
        error => {
            console.error('Upload error:', error);
            this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: 'Check authentication' });
        }
    );
  }
}
