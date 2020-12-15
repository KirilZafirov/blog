import { HomeEntryComponent } from './features/home-entry/home-entry/home-entry.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeEntryModule } from './features/home-entry/home-entry.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HomeEntryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
