import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { getBaseUrl } from '../utils/urlUtils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '';

  private loginStateSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  loginState$ = this.loginStateSubject.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = getBaseUrl();
  }

  login(credentials: { username: string; password: string }): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('jwt', response.token);
        return response;
      }),
      catchError(error => {
        const errorResponse: ErrorResponse = {
          status: error.status,
          message: error.error?.message || 'Login failed. Please check your credentials.',
        };
        
        return throwError(() => errorResponse);
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.updateLoginState(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.removeItem('token');
    this.updateLoginState(false);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  private updateLoginState(isLoggedIn: boolean): void {
    this.loginStateSubject.next(isLoggedIn);
  }
}

export interface AuthResponse {
  token: string;
  message: string;
}

export interface ErrorResponse {
  status: number;
  message: string;
}