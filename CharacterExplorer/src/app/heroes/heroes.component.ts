import { Component, OnInit } from '@angular/core';
import { MarvelDataService, Result, Root } from '../marvel-data.service';
import { Router } from '@angular/router';
import {
  AirtableDataService,
  AirtableFields,
  AirtableRecord,
} from '../airtable-data.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  public marvelData?: Root;
  public heroNameSearch: string;
  public filteredHeroes: Result[];
  public favoriteHeroes: Result[];

  constructor(
    public marvelService: MarvelDataService,
    public airtableService: AirtableDataService,
    private router: Router
  ) {
    this.heroNameSearch = '';
    this.filteredHeroes = [];
    this.favoriteHeroes = [];
  }

  ngOnInit(): void {
    this.airtableService.loadFavoriteHeroesIds();

    this.marvelService
      .loadHeroes()
      .subscribe(data => {
        this.marvelData = data;
        for (let hero of this.marvelData?.data?.results!) {
          if(this.airtableService.favoriteHeroesIds.includes(hero.id)){
            this.favoriteHeroes.push(hero);
          }
        }
      });
  }

  public getFilteredHeroes() {
    let results: Result[] = [];

    for (let hero of this.marvelData?.data?.results!) {
      if (hero.name.toLowerCase().includes(this.heroNameSearch)) {
        results.push(hero);
      }
    }

    return results;
  }

  public navigateToDetails(heroId: number) {
    this.router.navigate(['/heroes', heroId]);
  }
}
