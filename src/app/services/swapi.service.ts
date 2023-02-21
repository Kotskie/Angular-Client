import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SwapiRepository } from '../repos/swapi.repository';
import { PersonPage } from '../models/personPage';
import { Person } from '../models/person';
import { HomeWorld } from '../models/homeWorld';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private currentPerson: BehaviorSubject<Person> = new BehaviorSubject<Person>(new Person());

  constructor(private swapiRepo: SwapiRepository) { }

  getAll(): Observable<PersonPage> {
    return this.swapiRepo.getAllPeople();
  }

  setCurrentPerson(selectedPerson: Person){
    this.currentPerson.next(selectedPerson);
  }

  getCurrentPerson(): Observable<Person>{
    return this.currentPerson;
  }

  getHomeworldInformation(homeWorldUrl: string): Observable<HomeWorld>{
    return this.swapiRepo.getHomeWorld(homeWorldUrl);
  }
}
