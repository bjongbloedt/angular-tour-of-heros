import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {
  @Input() hero: Hero;
  @Output() onDeleted = new EventEmitter<void>();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
  }

  delete(hero: Hero): void {
    this.heroService
        .delete(hero.id)
        .subscribe(() => {
          this.onDeleted.emit();
        });
  }

}
