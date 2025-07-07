import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http'; // ✅ AÑADIR ESTO

import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(AppRoutes),
    provideHttpClient(), // ✅ REGISTRA HttpClient
    importProvidersFrom(IonicModule.forRoot())
  ]
});
