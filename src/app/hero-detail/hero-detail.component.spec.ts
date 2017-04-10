import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { MockHeroService } from '../hero.service.mock';

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
    fixture = TestBed.createComponent(HeroDetailComponent);
    fixture.componentInstance.hero = { id: 4, name: 'Mr. Hero' };
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.debugElement.injector.get(HeroService).getHero).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });
});
