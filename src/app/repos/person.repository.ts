import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from '../models/person';
import { PersonPage } from '../models/personPage';
import { SwapiService } from '../services/swapi.service';
import { Uris } from '../uris/uris';
import { iPeopleRepo } from './iPeopleRepo';

@Injectable({
  providedIn: 'root'
})
export class PersonRepository implements iPeopleRepo {
  private endpoint = '/people';

  constructor(private http: HttpClient, private uris: Uris) { }

  public get(url: string): Observable<any>{
    return this.http.get<any>(url);
  }

  public put(url: string, body: any): Observable<any>{
    return this.http.put<any>(url, body);
  }

  public post(url: string, body: any): Observable<any>{
    return this.http.post<any>(url, body);
  }

  public delete(id: string): Observable<any>{
    return this.http.delete<any>(id);
  }

  getPeople(page: number): Observable<Person[]> {
    const url = this.uris.getPeople(page);
    return this.get(url);
  }

  searchPeople(name: string): Observable<Person[]> {
    const url = this.uris.searchPeople(name);
    return this.get(url);
  }
}
