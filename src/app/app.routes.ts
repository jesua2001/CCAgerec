
  import { Routes } from '@angular/router';
  import { HomeComponent } from './home/home.component';
  import { LoginComponent } from './login/login.component';
  import { RegisterComponent } from './register/register.component';

  export const AppRoutes: Routes = [
    {
      path: 'home',
      loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
      path: 'login',
      loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
      path: 'register',
      loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'developer-tools',
      loadComponent: () => import('./developertools/developertools.component').then(m => m.DeveloperPanelPage)
    },
    {
      path:'consultarbox',
      loadComponent: () => import('./consultarbox/consultarbox.component').then(m => m.ConsultarboxComponent)
    },
    {
      path:'anadircaja',
      loadComponent: () => import('./anadirbox/anadirbox.component').then(m => m.AnadirboxComponent)
    }
  ];
