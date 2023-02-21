import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeWorld } from '../models/homeWorld';
import { Person } from '../models/person';
import { PersonPage } from '../models/personPage';
import { SwapiService } from '../services/swapi.service';
import { Uris } from '../uris/uris';
import { iSwapiRepo } from './iSwapiRepo';

@Injectable({
  providedIn: 'root'
})
export class SwapiRepository implements iSwapiRepo {
  private url = '/people';

  constructor(private http: HttpClient, private uris: Uris) { }

  private get(url: string): Observable<any>{
    return this.http.get<any>(url);
  }

  getAllPeople(): Observable<PersonPage> {
    const url = this.uris.getAllPeople();
    return this.get(url);
  }

  getHomeWorld(homeWorldUrl: string): Observable<HomeWorld>{
    return this.get(homeWorldUrl);
  }
}