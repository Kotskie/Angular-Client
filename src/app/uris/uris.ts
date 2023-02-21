import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class Uris {
    private baseUrl: string = "http://localhost:8080";
    private swapiUrl = 'https://swapi.dev/api/people';

    public getPeople(pageNumber: number): string{
        return this.baseUrl+"/people"+"?page="+pageNumber;
    }

    public searchPeople(name: string): string{
        return this.baseUrl+"/person/"+name;
    }

    public getAllPeople(): string{
        return this.swapiUrl;
    }
  }