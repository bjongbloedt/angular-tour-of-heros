import { Observable } from 'rxjs/Observable';
import { Hero } from './hero';

export class MockHeroService {
  getHero = jasmine.createSpy('getHero').and.callFake((id: string) => {
    return Observable.of({ id: 1, name: 'Mr. hero' });
  });
  deleteHero = jasmine.createSpy('deleteHero').and.callFake((hero: Hero) => {
    return Observable.of({ id: 0, name: 'frank' });
  });

  getHeroes = jasmine.createSpy('getHeroes').and.callFake(() => {
    return Observable.of([{ id: 9, name: 'Dr. Fart'}]);
  });
}
