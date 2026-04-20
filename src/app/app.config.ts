import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module';
import { MessageService } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { HttpErrorInterceptor } from './shared/interceptors/http-error-interceptor';

export function loadConfig(http: HttpClient) {
    return () =>
        http.get('/assets/config.json')
            .toPromise()
            .then((config: any) => {
                (window as any).config = config;
            });
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideRouter(routes),
        {
            provide: APP_INITIALIZER,
            useFactory: loadConfig,
            deps: [HttpClient],
            multi: true
        },
        provideHttpClient(
            withInterceptorsFromDi() 
        ),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        MessageService,
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.app-dark'
                }
            }
        })
    ]
};