import { TestBed, inject,  fakeAsync, tick, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Response, ResponseOptions, Http } from '@angular/http';
import { HeroSearchService } from './hero-search.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';


describe('HeroSearchService', () => {
  const heroes = [
    {id: 0, name: 'Dr. Fart'},
    {id: 1, name: 'Dr. Fart jr'}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroSearchService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]
    });
  }));

  it('should be created', inject([HeroSearchService], (service: HeroSearchService) => {
    expect(service).toBeTruthy();
  }));

  describe('search function', () => {

    it('should return a list of heroes', async(
      inject([HeroSearchService, MockBackend], (service: HeroSearchService, backend: MockBackend) => {
      const response = new ResponseOptions({
        body: {data: heroes}
      });

      const baseResponse = new Response(response);
      backend.connections.subscribe(
        (c: MockConnection) => c.mockRespond(baseResponse)
      );
      service.search('fart').do(res => {
        console.log(res);
        expect(res.length).toEqual(heroes.length);
      }).toPromise();
    })));

  });
});
