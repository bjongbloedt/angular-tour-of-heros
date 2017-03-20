import { TestBed, inject, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Response, ResponseOptions } from '@angular/http';
import { HeroService } from './hero.service';


fdescribe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
      ],
      imports: [ HttpModule ]
    });
  });

  describe('#getHeroes', () => {
    it('should be empty', inject([HeroService], (service: HeroService, done) => {
      service.getHeroes().then(heroes => {
        expect(heroes).toEqual(['fart']);
        done();
      });
    }));
  });
});
