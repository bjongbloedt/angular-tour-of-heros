import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { HeroAddButtonComponent } from './hero-add-button.component';

@Component({
  template: '<div></div>'
})
class DummyComponent {
}

describe('HeroAddButtonComponent', () => {
  let component: HeroAddButtonComponent;
  let fixture: ComponentFixture<HeroAddButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroAddButtonComponent, DummyComponent ],
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
    fixture = TestBed.createComponent(HeroAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
