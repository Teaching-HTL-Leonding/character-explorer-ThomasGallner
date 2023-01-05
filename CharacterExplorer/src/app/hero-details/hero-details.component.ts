import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AirtableDataService } from '../airtable-data.service';
import { MarvelDataService, Result } from '../marvel-data.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css'],
})
export class HeroDetailsComponent implements OnInit {
  public heroId: string;
  public hero?: Result;

  constructor(
    public marvelService: MarvelDataService,
    public airtableService: AirtableDataService,
    private route: ActivatedRoute
  ) {
    this.heroId = '';
  }

  ngOnInit() {
    this.heroId = this.route.snapshot.paramMap.get('id')!;
    this.marvelService
      .loadHero(this.heroId)
      .subscribe((data) => (this.hero = data.data.results[0]));
  }
}
