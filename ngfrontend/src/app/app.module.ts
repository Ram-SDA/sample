import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import  { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SimpleNotificationsModule } from 'angular2-notifications';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { HttpClientModule }    from '@angular/common/http';



import { AppRoutingModule } from './/app-routing.module';

import { RealfakeComponent } from './realfake/realfake.component';
import { HomeComponent } from './home/home.component';
import { IassistComponent } from './iassist/iassist.component';
import { ScmComponent } from './scm/scm.component';
import { IdressComponent } from './idress/idress.component';
import { YoloComponent } from './yolo/yolo.component';
import { ImanufactureComponent } from './imanufacture/imanufacture.component';
import { ItrustComponent } from './itrust/itrust.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {AuthService} from "./auth.service";
import {AuthGuard} from "./auth-guard";
import {StorageServiceModule} from "angular-webstorage-service";
import { LogoutComponent } from './logout/logout.component';
import { FooterComponent } from './footer/footer.component';
import { NavmenuComponent } from './navmenu/navmenu.component';

@NgModule({
  declarations: [
    AppComponent,
    RealfakeComponent,
    HomeComponent,
    IassistComponent,
    ScmComponent,
    IdressComponent,
    YoloComponent,
    ImanufactureComponent,
    ItrustComponent,
    LoginFormComponent,
    LogoutComponent,
    FooterComponent,
    NavmenuComponent
  ],
  imports: [
    BrowserModule,
    StorageServiceModule,
    FormsModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
