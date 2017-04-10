import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
});
