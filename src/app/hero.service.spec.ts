import { async, TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, XHRBackend, Http } from '@angular/http';

import { HeroService } from './hero.service';

fdescribe('Hero.Service', () => {

  beforeEach( async() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        HeroService,
        { provide: XHRBackend, useClass: MockBackend}
      ]


    })
    .compileComponents();
  });

  it('can instantiate service when injecting http',
    inject([HeroService], (service: HeroService) => {
      expect(service instanceof HeroService).toBe(true);
  }));

  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http was null');
    const service = new HeroService(http);
    expect(service instanceof HeroService).toBe(true);
  }));

  it('can provide the MockBackend as XHRBackend',
    inject([XHRBackend], (backend: XHRBackend) => {
    expect(backend).not.toBeNull('backend was null');
  }));
});
