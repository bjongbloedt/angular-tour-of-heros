import { Observable } from 'rxjs/Observable';
import { Hero } from './hero';

export class MockHeroSearchService {
    search = jasmine.createSpy('search').and.callFake((term: string) => {
        return Observable.of({ id: 1, name: 'Mr. Hero'});
    });
}
