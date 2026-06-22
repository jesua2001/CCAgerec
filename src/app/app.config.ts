import { provideRouter, withHashLocation } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';  // <-- Importa el componente aquí
import { AppRoutes } from './app.routes';             // <-- Importa las rutas aquí
import { IonicModule } from '@ionic/angular';

bootstrapApplication(AppComponent, {
  providers: [
    // withHashLocation: GitHub Pages no puede redirigir rutas al index.html,
    // así que el router usa '#/ruta' para que las URLs funcionen al refrescar o enlazar directo.
    provideRouter(AppRoutes, withHashLocation()),
    importProvidersFrom(IonicModule.forRoot()),
  ],
});
