import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { HeroService } from '../hero.service';

@Component({
  selector: 'add-hero-dialog',
  templateUrl: './add-hero-dialog.component.html',
  styleUrls: ['./add-hero-dialog.component.css']
})
export class AddHeroDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<AddHeroDialogComponent>,private heroService: HeroService) { }

  ngOnInit() {
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .subscribe(hero => {
        this.dialogRef.close(hero);
      });
  }

}
