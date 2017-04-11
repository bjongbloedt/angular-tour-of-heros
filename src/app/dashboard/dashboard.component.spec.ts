import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import 'hammerjs';

import { DashboardComponent } from './dashboard.component';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { MockHeroService } from '../hero.service.mock';
import { HeroService } from '../hero.service';
import { MockHeroSearchService } from '../hero-search.service.mock';
import { HeroSearchService } from '../hero-search.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  template: '<div></div>'
})
class DummyComponent {
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        HeroCardComponent,
        HeroSearchComponent,
        DummyComponent
      ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'detail', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: HeroService, useClass: MockHeroService },
        { provide: HeroSearchService, useClass: MockHeroSearchService },
        HeroCardComponent,
        HeroSearchComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit (called on initialization of component)', () => {
    it('should call getHeroes', () => {
      const heroService = fixture.debugElement.injector.get(HeroService);
      expect(heroService.getHeroes).toHaveBeenCalledTimes(1);
      expect(component.heroes.length).toBe(4);
    });

    it('should display the first 4 heroes', () => {
      const element = fixture.debugElement;
      const heroes = element.queryAll(By.css('md-card.hero-card'));
      expect(heroes.length).toBe(4);
    });
  });

  describe('#onDeleted', () => {
    it('should call getHeroes', () => {
      const heroService = fixture.debugElement.injector.get(HeroService);
      expect(heroService.getHeroes).toHaveBeenCalledTimes(1);

      component.onDeleted();

      expect(heroService.getHeroes).toHaveBeenCalledTimes(2);
      expect(component.heroes.length).toBe(4);
    });

    it('should display the first 4 heroes', () => {
      component.onDeleted();

      expect(component.heroes.length).toBe(4);
      const element = fixture.debugElement;
      const heroes = element.queryAll(By.css('md-card.hero-card'));
      expect(heroes.length).toBe(4);
    });
  });
});
