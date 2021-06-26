
import {environment} from "./../environments/environment"

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AddpostComponent } from './pages/addpost/addpost.component';
import { PagenotfounfComponent } from './pages/pagenotfounf/pagenotfounf.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

import {NgxImageCompressService} from 'ngx-image-compress';

import { FormsModule } from '@angular/forms';

// firebase related imports

import { AngularFireAuthModule} from "@angular/fire/auth"
import { AngularFireModule } from "@angular/fire"
import {  AngularFireStorageModule } from "@angular/fire/storage"
import { AngularFireDatabaseModule } from "@angular/fire/database";


// for toast
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { ToastrModule } from "ngx-toastr"


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddpostComponent,
    PagenotfounfComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FontAwesomeModule
    
  ],
  providers: [
    NgxImageCompressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
