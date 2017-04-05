import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import 'hammerjs';

import { DashboardComponent } from './dashboard.component';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { MockHeroService } from '../hero.service.mock';
import { HeroService } from '../hero.service';
import { MockHeroSearchService } from '../hero-search.service.mock';
import { HeroSearchService } from '../hero-search.service';
import { HeroAddButtonComponent } from '../hero-add-button/hero-add-button.component';


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
        HeroAddButtonComponent,
        DummyComponent
      ],
      imports: [
        MaterialModule,
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
});
