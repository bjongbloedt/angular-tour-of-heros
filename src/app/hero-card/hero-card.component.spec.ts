import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { HeroCardComponent } from './hero-card.component';
import { HeroService } from '../hero.service';

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
        HeroService
      ]
    })
      .compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HeroCardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('Moar', () => {
    let component: HeroCardComponent;
    let fixture: ComponentFixture<HeroCardComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(HeroCardComponent);
      fixture.componentInstance.hero = {id: 0, name: 'fred'};
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
