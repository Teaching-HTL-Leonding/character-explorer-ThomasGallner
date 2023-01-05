import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AIRTABLE_BASE_URL } from './app.module';

export interface AirtableRoot {
  records: AirtableRecord[];
}

export interface AirtableRecord {
  fields: AirtableFields;
  id: string;
}

export interface AirtableFields {
  HeroId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AirtableDataService {
  constructor(private http: HttpClient, @Inject(AIRTABLE_BASE_URL) private baseUrl: string) {
  }
  public loadFavoriteHeroes(): Observable<AirtableRoot> {
    return this.http.get<AirtableRoot>(
      `${this.baseUrl}/v0/appqJroNsgQsxxmTA/MarvelHeroes`
    );
  }

  // public deleteFavoriteHero(id: string): Observable<unknown> {
  //   const body = {
  //     fields: fields,
  //   };
  //   return this.http.patch(
  //     `https://api.airtable.com/v0/app5jvVBBLNcWUL3M/WeatherData/${id}`,
  //     body
  //   );
  // }
}
