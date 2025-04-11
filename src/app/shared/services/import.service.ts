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

  importFile(formData: FormData, token: string | null, url: string): Promise<boolean> {
    return new Promise((resolve) => {
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
          this.messageService.add({ severity: 'success', summary: response });
          resolve(true);
        },
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
          resolve(false);
        },
        complete: () => {
          console.log('Importing the file is complete');
        }
      });
    }
    );
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
