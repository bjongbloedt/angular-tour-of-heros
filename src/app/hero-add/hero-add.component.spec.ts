import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { Location } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';

import { HeroAddComponent } from './hero-add.component';
import { HeroService } from '../hero.service';
import { MockHeroService } from '../hero.service.mock';

@Component({
  template: '<div></div>'
})
class DummyComponent {
}

describe('HeroAddComponent', () => {
  let component: HeroAddComponent;
  let fixture: ComponentFixture<HeroAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroAddComponent, DummyComponent ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
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
    fixture = TestBed.createComponent(HeroAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#addHero', () => {
    it('should do nothing if empty string is given', () => {
      const heroService = fixture.debugElement.injector.get(HeroService);
      const loc = fixture.debugElement.injector.get(Location);
      const spy = spyOn(loc, 'back').and.callThrough();

      component.addHero({ name: 'larry', id: 5 }, false);

      expect(heroService.createHero).not.toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should do nothing if whitespace is given', () => {
      const heroService = fixture.debugElement.injector.get(HeroService);
      const loc = fixture.debugElement.injector.get(Location);
      const spy = spyOn(loc, 'back').and.callThrough();

      component.addHero({ name: '   ', id: 5 } , false);

      expect(heroService.createHero).not.toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should create new hero and go back', () => {
      const fakeHero = { name: 'Papa Smurf', id: 6 };
      const heroService = fixture.debugElement.injector.get(HeroService);
      const loc = fixture.debugElement.injector.get(Location);
      const spy = spyOn(loc, 'back').and.callThrough();

      component.addHero(fakeHero, true);

      expect(heroService.createHero).toHaveBeenCalled();
      expect(heroService.createHero).toHaveBeenCalledWith(fakeHero.name);
      expect(spy).toHaveBeenCalled();
    });

    xit('should not go back if create hero returns an error', () => {

    });
  });

  describe('#goback', () => {
    it('should call location back', () => {
      const loc = fixture.debugElement.injector.get(Location);
      const spy = spyOn(loc, 'back').and.callThrough();
      component.goBack();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
