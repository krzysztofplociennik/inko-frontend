import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { getBaseUrl } from '../utils/urlUtils';
import { MessageService } from 'primeng/api';
import { JwtUtils } from '../utils/jwtUtils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '';
  private tokenKey = 'token';
  private loginStateSubject = new BehaviorSubject<boolean>(false);
  private refreshInProgress = false;

  loginState$ = this.loginStateSubject.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.apiUrl = getBaseUrl();
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const isValid = this.isTokenValid();
    this.loginStateSubject.next(isValid);
    
    if (isValid && this.shouldRefreshToken()) {
      this.performTokenRefresh();
    }
  }

  login(credentials: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          this.setToken(response.token);
        }
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
    localStorage.setItem(this.tokenKey, token);
    this.updateLoginState(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.updateLoginState(false);
  }

  isLoggedIn(): boolean {
    return this.isTokenValid();
  }

  isTokenValid(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const tokenPayload = JwtUtils.parseJwt(token);
      const expirationDate = JwtUtils.fetchExpirationDate(tokenPayload);
      return !JwtUtils.hasTokenExpired(expirationDate);
    } catch (error) {
      console.error('Error while trying to parse token! (EID: 202504181233)');
      return false;
    }
  }

  shouldRefreshToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const tokenPayload = JwtUtils.parseJwt(token);
      const expirationDate = JwtUtils.fetchExpirationDate(tokenPayload);
      return JwtUtils.isTokenCloseToExpiring(expirationDate);
    } catch (error) {
      return false;
    }
  }

  performTokenRefresh(): void {
    if (this.refreshInProgress) return;
    
    this.refreshInProgress = true;
    this.refreshToken().subscribe({
      next: () => {
        this.showRefreshTokenMessage();
        this.refreshInProgress = false;
      },
      error: () => {
        this.refreshInProgress = false;
      }
    });
  }

  refreshToken(): Observable<AuthResponse> {
    const token = this.getToken();
    
    if (!token) {
      return throwError(() => new Error('No token available to refresh (EID:202504181330)'));
    }
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/refresh`, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      tap(response => {
        if (response && response.token) {
          this.setToken(response.token);
        }
      }),
      catchError(error => {
        if (error.status === 401) {
          this.clearToken();
        }
        return throwError(() => error);
      })
    );
  }

  private updateLoginState(isLoggedIn: boolean): void {
    this.loginStateSubject.next(isLoggedIn);
  }

  private showRefreshTokenMessage() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'The login token has been successfully refreshed!',
      life: 5000
    });
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