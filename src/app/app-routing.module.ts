import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import {NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate : [AuthGuard]},
  { path: 'login', loadChildren: './components/login/login.module#LoginPageModule', canActivate : [NologinGuard] },
  { path: 'signup', loadChildren: './components/signup/signup.module#SignupPageModule', canActivate : [NologinGuard] },
  { path: 'relato', loadChildren: './components/relato/relato.module#RelatoPageModule', canActivate : [AuthGuard] },
  { path: 'nuevorelato', loadChildren: './components/nuevorelato/nuevorelato.module#NuevorelatoPageModule', canActivate : [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
