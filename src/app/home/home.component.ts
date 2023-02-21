import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person';
import { PersonPage } from '../models/personPage';
import { PersonService } from '../services/person.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationService } from '../services/navigation.service';
import { SwapiService } from '../services/swapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  people: Person[] = [];
  page: PersonPage = new PersonPage();
  currentPage: number = 1;
  isLoading: boolean = false;
  isPageLoading: boolean = false;
  searchValue: string = "";

  constructor(
    private navigate: NavigationService, 
    private sanitizer: DomSanitizer, 
    private personService: PersonService,
    private swapiService: SwapiService
    ) { }

  ngOnInit(): void {
    this.getPeople(this.currentPage);
    this.getPageCount();
  }

  getPeople(pageIndex: number): void {
    this.isLoading = true;
    this.personService.getPeople(pageIndex).subscribe({
      next: (response) => {
      console.log("response", response);
      this.people = response;
      this.isLoading = false;
    }, error: (err) => {
      console.error(err);
      this.isLoading = false;
    }
    });
  }

  searchPeople(): void {
    this.isLoading = true;
    this.personService.searchPeople(this.searchValue).subscribe({
      next: (response) => {
        console.log("response", response);
        this.people = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
  
  clearSearched(): void {
    this.isLoading = true;
    this.searchValue = "";
    this.personService.getPeople(this.currentPage).subscribe({
      next: (response) => {
        console.log("response", response);
        this.people = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getPeople(pageNumber);
  }

  ImageFromName(name: string){
    const imageUrl = `assets\\images\\${name}.jpg`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  getPageCount(): number {
    this.isPageLoading = true;
    this.swapiService.getAll().subscribe({
      next: (response) => {
        this.page = response;
        this.isPageLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isPageLoading = false;
      }
    });
    return Math.ceil(this.page.count / this.page.results.length);
  }

  getCount(): number{
    return Math.ceil(this.page.count / this.page.results.length)
  }

  showMoreDetails(index: number) {
    this.isLoading = true;
    this.personService.getPeople(index).subscribe({
      next: (response) => {
        console.log("response", response);
        this.people = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  showPrevDetails(index: number) {
    if(index <= 0){
      this.currentPage = 0;
    }

    this.personService.getPeople(index).subscribe({
      next: (response) => {
        console.log("response", response);
        this.people = response;
        this.isLoading = true;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  nextPage(){
    this.currentPage++;
    this.getPeople(this.currentPage);
  }

  prevPage(){
    this.currentPage--;
    this.getPeople(this.currentPage);
  }

  goToCharacterDetails(person: Person){
    this.navigate.goToCharacterDetails();
    this.swapiService.setCurrentPerson(person);
  }
}
