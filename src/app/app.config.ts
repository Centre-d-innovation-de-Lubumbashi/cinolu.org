import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode, LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { provideApp } from '@core';
import { appRoutes } from 'app/app.routes';
import { provideIcons } from 'app/common/icons/icons.provider';
import { provideClientHydration } from '@angular/platform-browser';
import { PageTitleStrategy } from './common/strategies/page-title.strategy';
import { httpInterceptor } from './common/interceptors/http.interceptor';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { authReducers } from './common/store/app.reducers';
import { AuthEffects } from './common/store/app.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor])),
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    provideRouter(appRoutes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideIcons(),
    provideApp({
      app: {
        layout: 'empty',
        scheme: 'light',
        screens: {
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1440px'
        },
        theme: 'theme-default'
      }
    }),
    provideClientHydration(),
    provideEffects([AuthEffects]),
    provideStore({
      auth: authReducers
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ]
};
