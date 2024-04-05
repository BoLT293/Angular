import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { HomepageComponent } from './homepage/homepage.component';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import {MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ToastModule} from 'primeng/toast';
import { ViewComponent } from './view/view.component'
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './load-service/auth.service';
import { HttpmessageService } from './load-service/httpmessage.service';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AddemployeeComponent,
    HomepageComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    RippleModule,
    BrowserAnimationsModule,
    RouterModule,
 
  ],
  providers: [AuthGuard,AuthService,MessageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpmessageService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
