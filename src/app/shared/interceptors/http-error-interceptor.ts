import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 500) {
          this.messageService.add({
            severity: 'error',
            summary: 'Server Error',
            detail: 'An unexpected error occurred. Please try again later or contact support if the problem persists.',
            life: 6000
          });
        }

        if (error.status === 403) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Access Denied',
            detail: 'You do not have permission to perform this action.',
            life: 6000
          });
        }

        if (error.status === 401) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Access Denied',
            detail: 'Wrong credentials.',
            life: 6000
          });
        }

        return throwError(() => error);
      })
    );
  }
}