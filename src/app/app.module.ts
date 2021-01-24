import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import {RecipesModule } from './recipes/recipes.module'
import { ShoppingListModule  } from "./shopping-list/shopping-list.module";
import {ShareModule} from "./shared/shared.module"
import {CoreModule} from "./core.module";
import {AuthModule} from "./auth/auth.module"
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
    RecipesModule,
    ShoppingListModule,
    ShareModule,
    CoreModule,
    AuthModule
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
