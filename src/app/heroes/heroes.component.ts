import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private heroService: HeroService,
              private router: Router) { }

  ngOnInit(): void {
    this.getHeros();
  }

  onDeleted(): void {
    this.getHeros();
  }

  getHeros(): void {
    this.heroService.getHeroes().subscribe(h => this.heroes = h);
  }
}
