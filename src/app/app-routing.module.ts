import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordModule)
  },
  {
    path: 'registration-page',
    loadChildren: () => import('./registration-page/registration-page.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', redirectTo: 'home', pathMatch: 'full' },
  { path: 'forgot-password', redirectTo: 'forgot-password', pathMatch: 'full' },
  { path: 'registration-page', redirectTo: 'registration-page', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
