import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { AppRoutes } from './app.routes';
import { AuthInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(AppRoutes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    importProvidersFrom(IonicModule.forRoot())
  ]
};
