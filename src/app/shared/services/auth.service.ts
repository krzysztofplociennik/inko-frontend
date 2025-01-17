import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
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
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getSecureData(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get('http://localhost:61934/api/secure-data', { headers });
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