import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Hero } from './hero';


@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
               .map(this.validateResponse)
               .map(response => response.json().data as Hero[])
               .catch(this.handleError);
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
               .map(this.validateResponse)
               .map(response => response.json().data as Hero)
               .catch(this.handleError);
  }

  updateHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
               .map(this.validateResponse)
               .map(() => hero)
               .catch(this.handleError);
  }

  createHero(name: string): Observable<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .map(this.validateResponse)
      .map(res => res.json().data)
      .catch(this.handleError);
  }


  deleteHero(id: number): Observable<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map(this.validateResponse)
      .map(() => null)
      .catch(this.handleError);
  }

  private validateResponse(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad Response Status: ' + res.status);
    }
    return res;
  }

  private handleError(error: any) {
    const errorMessage = error.message || 'Server Error';
    return Observable.throw(errorMessage);
  }
}
