import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RealfakeComponent }      from './realfake/realfake.component';
import { IassistComponent } from './iassist/iassist.component';
import { ScmComponent } from './scm/scm.component';
import { IdressComponent } from './idress/idress.component';
import { ItrustComponent } from './itrust/itrust.component';
import { ImanufactureComponent } from './imanufacture/imanufacture.component';
import { YoloComponent } from './yolo/yolo.component'

import { LoginFormComponent } from './login-form/login-form.component';


import {AuthGuard} from "./auth-guard";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'realfake', component: RealfakeComponent, canActivate: [AuthGuard] },
  { path: 'yolo', component: YoloComponent, canActivate: [AuthGuard] },
  { path: 'iassist', component: IassistComponent, canActivate: [AuthGuard] },
  { path: 'imanufacture', component: ImanufactureComponent, canActivate: [AuthGuard] },
  { path: 'scm', component: ScmComponent, canActivate:[AuthGuard] },
  { path: 'idress', component: IdressComponent, canActivate:[AuthGuard] },
  { path: 'itrust', component: ItrustComponent,canActivate:[AuthGuard] },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule { }
