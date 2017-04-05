import { async, TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, XHRBackend, Http, Response, ResponseOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { HeroService } from './hero.service';
import { Hero } from './hero';

const makeHeroData = () => [
  {id: 1, name: 'Windstorm'},
  {id: 2, name: 'Bombasto'},
  {id: 3, name: 'Magneta'},
  {id: 4, name: 'Tornado'},
] as Hero[];

describe('Hero.Service', () => {

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

  describe('#getHeroes', () => {
    let backend: MockBackend;
    let service: HeroService;
    let fakeHeroes: Hero[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new HeroService(http);
      fakeHeroes = makeHeroData();
      const options = new ResponseOptions({status: 200, body: {data: fakeHeroes}});
      response = new Response(options);
    }));

    it('should send GET request to api/heroes', async(inject([], () => {
      let lastConnection: MockConnection;
      backend.connections.subscribe((c: MockConnection) => {
        lastConnection = c;
        c.mockRespond(response);
      });

      service.getHeroes().do(hero => {
        expect(lastConnection.request.method).toEqual(RequestMethod.Get);
        expect(lastConnection.request.url).toEqual('api/heroes');
      }).toPromise();
    })));

    it('should have expected fake heroes', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getHeroes().do(heroes => {
        expect(heroes.length).toBe(fakeHeroes.length, 'should have the expected number of heroes');
      }).toPromise();
    })));

    it('should be ok returning no heroes', async(inject([], () => {
      const resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getHeroes().do(heroes => {
        expect(heroes.length).toBe(0, 'should have no heroes');
      }).toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      const resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getHeroes().do(heroes => {
        fail('should not response with heroes');
      }).catch(err => {
        expect(err).toMatch(/Bad Response Status/);
        expect(err).toMatch(/404/);
        return Observable.of(null);
      }).toPromise();
    })));
  });

  describe('#getHero', () => {
    let backend: MockBackend;
    let service: HeroService;
    let fakeHeroes: Hero[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new HeroService(http);
      fakeHeroes = makeHeroData();
      const options = new ResponseOptions({status: 200, body: {data: fakeHeroes[0]}});
      response = new Response(options);
    }));

    it('should send GET request to api/heroes/:id', async(inject([], () => {
      let lastConnection: MockConnection;
      backend.connections.subscribe((c: MockConnection) => {
        lastConnection = c;
        c.mockRespond(response);
      });

      service.getHero(0).do(hero => {
        expect(lastConnection.request.method).toEqual(RequestMethod.Get);
        expect(lastConnection.request.url).toEqual('api/heroes/0');
      }).toPromise();
    })));

    it('should have expected fake hero', async(inject([], () => {
      let lastConnection: MockConnection;
      backend.connections.subscribe((c: MockConnection) => {
        lastConnection = c;
      });

      service.getHero(0).do(hero => {
        expect(hero.id).toBe(fakeHeroes[0].id, 'should have the expected hero id');
        expect(hero.name).toBe(fakeHeroes[0].name, 'should have the expected hero name');
      }).toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      const resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getHero(0).do(heroes => {
        fail('should not response with heroes');
      }).catch(err => {
        expect(err).toMatch(/Bad Response Status/);
        expect(err).toMatch(/404/);
        return Observable.of(null);
      }).toPromise();
    })));
  });
});
