import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../models/person';
import { NavigationService } from '../services/navigation.service';
import { PersonService } from '../services/person.service';
import { SwapiService } from '../services/swapi.service';
import { Location } from '@angular/common';
import { HomeWorld } from '../models/homeWorld';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  person!: Person;
  homeWorldInformation!: HomeWorld;

  constructor(
    private route: ActivatedRoute,  
    private sanitizer: DomSanitizer, 
    private personService: PersonService,
    private swapiService: SwapiService,
    private navigate: NavigationService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getSelectedPerson();
    this.getHomeWorldInformation(this.person.homeworld);
  }

  getSelectedPerson(){
    this.swapiService.getCurrentPerson().subscribe({
      next: (person: Person) => {
        this.person = person;
      }
    })
  }

  getHomeWorldInformation(url: string){
    this.swapiService.getHomeworldInformation(url).subscribe({
      next: (homeWorld) => {
        this.homeWorldInformation = homeWorld;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  ImageFromName(name: string){
    const imageUrl = `assets\\images\\${name}.jpg`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  goToHome(){
    this.location.back();
  }
}
