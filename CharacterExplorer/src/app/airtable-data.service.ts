import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AIRTABLE_BASE_URL } from './app.module';

export interface AirtableRoot {
  records: AirtableRecord[];
}

export interface AirtableRecord {
  fields: AirtableFields;
  id?: string;
}

export interface AirtableFields {
  HeroId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AirtableDataService {
  public favoriteHeroesIds: number[];
  private favoriteHeroData?: AirtableRoot;

  constructor(
    private http: HttpClient,
    @Inject(AIRTABLE_BASE_URL) private baseUrl: string
  ) {
    this.favoriteHeroesIds = [];
  }

  public loadFavoriteHeroesIds() {
    return this.http
      .get<AirtableRoot>(`${this.baseUrl}/v0/appqJroNsgQsxxmTA/MarvelHeroes`)
      .subscribe((data) => {
        this.favoriteHeroData = data;
        for (let record of data.records) {
          this.favoriteHeroesIds.push(parseInt(record.fields.HeroId));
        }
      });
  }

  public addFavoriteHeroId(heroId: number) {
    const body: AirtableRoot = {
      records: [{ fields:  {HeroId: heroId.toString()}}],
    };

    return this.http.post(`${this.baseUrl}/v0/appqJroNsgQsxxmTA/MarvelHeroes`, body);
  }

  public deleteFavoriteHeroId(heroId: number) {
    let recordId = '';
    for (let record of this.favoriteHeroData?.records!){
      if (parseInt(record.fields.HeroId) === heroId){
        recordId = record.id!;
        break;
      }
    }

    return this.http.delete(`${this.baseUrl}/v0/appqJroNsgQsxxmTA/MarvelHeroes/${recordId}`);
  }
}
