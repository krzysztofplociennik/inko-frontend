import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { getBaseUrl } from '../utils/urlUtils';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KeepAliveService implements OnInit, OnDestroy {

  baseUrl: string;
  private keepAliveIntervalSubscription: Subscription | undefined;
  private readonly keepAliveIntervalMs = 14 * 60 * 1000;

  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = getBaseUrl();
  }

  ngOnInit(): void {
    this.startKeepAlive();
  }

  ngOnDestroy(): void {
    if (this.keepAliveIntervalSubscription) {
      this.keepAliveIntervalSubscription.unsubscribe();
    }
  }

  startKeepAlive() {
    this.keepAliveIntervalSubscription = interval(this.keepAliveIntervalMs).pipe(
      switchMap(() => this.callBackend())
    ).subscribe({
      next: (response: string) => {
        console.log(response);
      },
      error: (error: string) => {
        console.error('Error while trying to keep alive the backend:', error);
      }
    });
  }

  private callBackend() {
    const url = this.baseUrl + '/keep-alive';
    return this.http.get(
      url,
      {
        responseType: 'text' as const
      }
    );
  }
}