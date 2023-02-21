import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Person } from "../models/person";
import { PersonPage } from "../models/personPage";

export interface iPeopleRepo{
    getPeople(pageNumber: number): Observable<Person[]>;
    searchPeople(name: String): Observable<Person[]>;
  }