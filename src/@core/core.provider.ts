import {
  EnvironmentProviders,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideEnvironmentInitializer
} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationService } from '@core/services/confirmation';
import { LoadingService } from '@core/services/loading';
import { AuthService } from './auth/auth.service';

export const provideApp = (): EnvironmentProviders[] => {
  const providers: EnvironmentProviders[] = [
    importProvidersFrom(MatDialogModule),
    provideEnvironmentInitializer(() => inject(ConfirmationService)),
    provideEnvironmentInitializer(() => inject(LoadingService)),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.getProfile();
    })
  ];
  return providers;
};
