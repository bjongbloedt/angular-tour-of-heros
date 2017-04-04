import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs/Observable';
import { Hero } from '../hero';

class MockHeroService {
  getHero = jasmine.createSpy('getHero').and.callFake((id: string) => {
    return Observable.of({ id: 1, name: 'Mr. hero' });
  });
  delete = jasmine.createSpy('delete').and.callFake((hero: Hero) => {
    return Observable.of({ id: 0, name: 'frank' });
  });
}

@Component({
  template: '<div></div>'
})
class DummyComponent {
}

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent, DummyComponent],
      imports: [
        MaterialModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'detail', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: HeroService, useClass: MockHeroService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    fixture.componentInstance.hero = { id: 4, name: 'Mr. Hero' };
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
