import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hero } from '../hero';

@Component({
  selector: 'hero-add',
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.css']
})
export class HeroAddComponent {
  form: FormGroup;

  constructor(private heroService: HeroService,
              private location: Location,
              private formBuilder: FormBuilder) {

                this.form = formBuilder.group({
                  name: ['', Validators.required]
                });
               }

  addHero(model: Hero, valid: boolean): void {
    console.log(valid);
    if (!valid) { return; }
    const name = model.name.trim();
    this.heroService.createHero(name)
      .subscribe(hero => {
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }
}
