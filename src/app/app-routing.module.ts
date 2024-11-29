import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login/:loginName/:password',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password/:accountId',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordModule)
  },
  {
    path: 'registration-page/:accountId',
    loadChildren: () => import('./registration-page/registration-page.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'transaction-result',
    loadComponent: () => import('./purchase-result-page/purchase-result-page.component').then(m => m.PurchaseResultPageComponent)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'add-data',
        loadChildren: () => import('./add-more-data/add-more-data.module').then(m => m.AddMoreDataModule)
      },
      {
        path: 'privacy-policy',
        loadComponent: () => import('./privacy-policy/privacy-policy.component').then((m) => m.PrivacyPolicyComponent),
      },
      {
        path: 'terms-and-conditions',
        loadComponent: () => import('./terms-and-conditions/terms-and-conditions.component').then((m) => m.TermsAndConditionsComponent),
      },
      {
        path: 'purchase-history',
        loadChildren: () => import('./purchase-history/purchase-history.module').then(m => m.PurchaseHistoryModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
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
