import {BrowserModule} from '@angular/platform-browser';
import {NgModule }from '@angular/core';

import {AppRoutingModule}from './app-routing.module';
import {AppComponent}from './app.component';
/* Firebase services */
import {AngularFireModule}from "@angular/fire";
import {AngularFireAuthModule}from "@angular/fire/auth";
import {environment}from '../environments/environment';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AuthenticationService} from "./shared/authentication.service";
import { MarketComponent } from './market/market.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MarketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.cubeGrid,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'}),
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
