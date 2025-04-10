import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    const token = localStorage.getItem('token');
  
    const url: string = this.baseUrl + '/import/multiple';
  
    this.http.post(
      url,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'text' as const
      }
    ).subscribe({
      next: (response: string) => {
        console.log('response: ' + response);
        this.messageService.add({ severity: 'success', summary: response });
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error)
      },
      complete: () => console.log('Importing is complete')
    });
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = typeof error.error === 'string' ? error.error : 'Importing files failed';
  
    const userFriendlyMessage = errorMessage
      .replace('[InkoValidationException] ', '')
      .replace('[InkoImportException] ', '')
  
    this.messageService.add({
      severity: 'error',
      summary: 'Importing files failed',
      detail: userFriendlyMessage
    });
  }
}
