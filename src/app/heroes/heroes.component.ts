import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Router } from "@angular/router";
import { AddHeroDialogComponent } from '../add-hero-dialog/add-hero-dialog.component';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private heroService: HeroService,
              private router: Router,
              public dialog: MdDialog) { }

  ngOnInit(): void {
    this.getHeros();
  }

  onDeleted(): void {
    this.getHeros();
  }

  getHeros(): void {
    this.heroService.getHeroes().subscribe(h => this.heroes = h);
  }


  openDialog() {
    let dialogRef = this.dialog.open(AddHeroDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.heroes.push(result);
    });
  }
}
