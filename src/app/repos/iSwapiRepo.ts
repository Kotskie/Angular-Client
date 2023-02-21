import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HomeWorld } from "../models/homeWorld";
import { Person } from "../models/person";
import { PersonPage } from "../models/personPage";

export interface iSwapiRepo{
  getAllPeople(): Observable<PersonPage>;
  getHomeWorld(homeWorldUrl: string): Observable<HomeWorld>;
  }