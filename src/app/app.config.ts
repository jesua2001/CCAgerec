import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';  // <-- Importa el componente aquí
import { AppRoutes } from './app.routes';             // <-- Importa las rutas aquí
import { IonicModule } from '@ionic/angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(AppRoutes),
    importProvidersFrom(IonicModule.forRoot()),
  ],
});
