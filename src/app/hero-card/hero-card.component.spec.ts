import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { HeroCardComponent } from './hero-card.component';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs/Observable';
import { Hero } from '../hero';


class MockHeroService {
  delete = jasmine.createSpy('delete').and.callFake((hero: Hero) => {
    return Observable.of({ id: 0, name: 'frank' });
  });
}

@Component({
  template: '<div></div>'
})
class DummyComponent {
}

describe('HeroCardComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroCardComponent, DummyComponent],
      imports: [
        MaterialModule,
        RouterTestingModule.withRoutes([
          { path: 'detail', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: HeroService, useClass: MockHeroService }
      ]
    })
      .compileComponents();
  }));

  it('should create the hero-card', async(() => {
    const fixture = TestBed.createComponent(HeroCardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('card', () => {
    let component: HeroCardComponent;
    let fixture: ComponentFixture<HeroCardComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(HeroCardComponent);
      fixture.componentInstance.hero = { id: 0, name: 'fred' };
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have hero name as a title', () => {
      const element = fixture.nativeElement;
      fixture.detectChanges();
      expect(element.querySelector('md-card-title').textContent).toEqual('fred');
    });

    it('should have hero id as a sub-title', () => {
      const element = fixture.nativeElement;
      fixture.detectChanges();
      expect(element.querySelector('md-card-subtitle').textContent).toEqual('0');
    });

    it('should have an info button', () => {
      const element = fixture.nativeElement;
      fixture.detectChanges();
      expect(element.querySelector('md-icon')).toBeTruthy();
    });

    it('should have a delete icon', () => {
      const element = fixture.nativeElement;
      fixture.detectChanges();
      expect(element.querySelector('md-icon')).toBeTruthy();
    });

    xit('should call delte when the delete icon is clicked', () => {
      expect(true).toBe(false);
    });
  });
});
