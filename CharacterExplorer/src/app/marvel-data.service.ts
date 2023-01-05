import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MARVEL_API_KEY, MARVEL_BASE_URL } from './app.module';

export interface Root {
  data: Data;
}

export interface Data {
  results: Result[];
}

export interface Result {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  series: Series;
}

export interface Series {
  items: Item2[];
}

export interface Item2 {
  name: string; // series name
}

export interface Thumbnail {
  path: string;
  extension: string;
}

@Injectable({
  providedIn: 'root',
})
export class MarvelDataService {
  constructor(
    private http: HttpClient,
    @Inject(MARVEL_API_KEY) private marvelApiKey: string,
    @Inject(MARVEL_BASE_URL) private marvelBaseUrl: string
  ) {}

  public loadHeroes(): Observable<Root> {
    return this.http.get<Root>(
      `${this.marvelBaseUrl}:443/v1/public/characters?limit=12&apikey=${this.marvelApiKey}`
    );
  }

  public loadHero(id: string): Observable<Root> {
    return this.http.get<Root>(
      `${this.marvelBaseUrl}:443/v1/public/characters/${id}?&apikey=${this.marvelApiKey}`
    );
  }
}
