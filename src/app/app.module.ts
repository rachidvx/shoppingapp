import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import {ShareModule} from "./shared/shared.module"
import {CoreModule} from "./core.module";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,       
    HomeComponent,  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ShareModule,
    CoreModule,
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
