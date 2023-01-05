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
  private marvelData?: Root;
  public heroNameSearch: string;
  public favoriteHeroesIds: number[];

  constructor(
    public marvelService: MarvelDataService,
    public airtableService: AirtableDataService,
    private router: Router
  ) {
    this.heroNameSearch = '';
    this.favoriteHeroesIds = [];
  }

  ngOnInit(): void {
    this.marvelService
      .loadHeroes()
      .subscribe((data) => (this.marvelData = data));

    this.airtableService.loadFavoriteHeroes().subscribe((data) => {
      for (let record of data.records) {
        this.favoriteHeroesIds.push(parseInt(record.fields.HeroId));
      }
    });
  }

  public getHeroes() {
    return this.marvelData?.data?.results;
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
