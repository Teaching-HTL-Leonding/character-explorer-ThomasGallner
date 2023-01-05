import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroesComponent } from './heroes/heroes.component';
import { AirtableAuthInterceptor } from './airtable-auth.interceptor';

export const MARVEL_API_KEY = new InjectionToken<string>('MarvelApiKey');
export const MARVEL_BASE_URL = new InjectionToken<string>('MarvelBaseUrl');
export const AIRTABLE_PAT = new InjectionToken<string>('AirtablePat');
export const AIRTABLE_BASE_URL = new InjectionToken<string>('AirtableUrl');

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailsComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    {
      provide: MARVEL_API_KEY,
      useValue: 'd9c0c5171c94a210303eeaafe3ed9854',
    },
    {
      provide: MARVEL_BASE_URL,
      useValue: 'https://gateway.marvel.com',
    },
    {
      provide: AIRTABLE_PAT,
      useValue: 'pat3LQPpy6kvToyvy.2c368f8d0b12b375517008e8b7152b8daa9f8fdda6577253e02edecba1824134'
    },
    {
      provide: AIRTABLE_BASE_URL,
      useValue: 'https://api.airtable.com',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AirtableAuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
