import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import 'hammerjs';

import { DashboardComponent } from './dashboard.component';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';

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
        RouterTestingModule.withRoutes([
          { path: 'detail', component: DummyComponent }
        ])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([HeroService], (service: HeroService)  => {
    expect(component).toBeTruthy();
  }));
});
