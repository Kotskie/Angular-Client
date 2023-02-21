import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Person } from '../models/person';
import { PersonPage } from '../models/personPage';
import { iPeopleRepo } from '../repos/iPeopleRepo';
import { PersonRepository } from '../repos/person.repository';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private personRepo: PersonRepository) { }

  getPeople(page: number): Observable<Person[]> {
    return this.personRepo.getPeople(page);
  }

  searchPeople(name: string): Observable<Person[]> {
    return this.personRepo.searchPeople(name);
  }
}
