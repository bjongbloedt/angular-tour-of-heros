import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { HeroSearchComponent } from './hero-search.component';
import { HeroSearchService } from '../hero-search.service';
import { MockHeroSearchService } from '../hero-search.service.mock';

@Component({
  template: '<div></div>'
})
class DummyComponent {
}

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [HeroSearchComponent, DummyComponent],
        imports: [
          MaterialModule,
          RouterTestingModule.withRoutes([
            { path: 'detail', component: DummyComponent }
          ])
        ],
        providers: [
          { provide: HeroSearchService, useClass: MockHeroSearchService }
        ]
      })
        .compileComponents();
    }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
