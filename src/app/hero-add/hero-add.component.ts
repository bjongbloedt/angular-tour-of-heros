import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'hero-add',
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.css']
})
export class HeroAddComponent implements OnInit {

  constructor(private heroService: HeroService,
              private location: Location) { }

  ngOnInit() {
  }

  addHero(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.createHero(name)
      .subscribe(hero => {
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }
}
