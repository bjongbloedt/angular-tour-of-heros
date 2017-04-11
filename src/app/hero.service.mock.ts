import { Observable } from 'rxjs/Observable';
import { Hero } from './hero';

const heroList = [
  { id: 9, name: 'Dr. Fart'},
  { id: 0, name: 'larry' },
  { id: 1, name: 'Jim' },
  { id: 2, name: 'larry' },
  { id: 5, name: 'larry' },
];

export class MockHeroService {
  getHero = jasmine.createSpy('getHero').and.callFake((id: string) => {
    return Observable.of({ id: 1, name: 'Mr. hero' });
  });

  deleteHero = jasmine.createSpy('deleteHero').and.callFake((hero: Hero) => {
    return Observable.of({ id: 0, name: 'frank' });
  });

  getHeroes = jasmine.createSpy('getHeroes').and.callFake(() => {
    return Observable.of(heroList);
  });

  createHero = jasmine.createSpy('getHeroes').and.callFake((hero: string) => {
    return Observable.of([{ id: 9, name: 'Dr. Fart'}]);
  });
}
