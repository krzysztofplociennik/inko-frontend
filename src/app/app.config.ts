import { APP_INITIALIZER } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module';
import { MessageService } from 'primeng/api';

export function loadConfig(http: HttpClient) {
  return () =>
    http.get('/assets/config.json')
      .toPromise()
      .then((config: any) => {
        (window as any).config = config;
      });
}

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [HttpClient],
      multi: true
    },
    MessageService,
  ]
};
