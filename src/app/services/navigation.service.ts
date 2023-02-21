import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private home: string = "home";
  private characterDetails: string = "person";

  constructor(
    private router: Router,
    private location: Location
    ) { }

  private navigateTo(path: string){
    this.router.navigate([`${path}`])
  }

  goToCharacterHome(){
    this.navigateTo(this.home);
  }

  goToCharacterDetails(){
    this.navigateTo(this.characterDetails);
  }
}
