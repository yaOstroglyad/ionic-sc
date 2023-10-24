import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/auth/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TransactionProcessComponent } from './transaction-process/transaction-process.component';

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
  { path: 'transaction-process', component: TransactionProcessComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
