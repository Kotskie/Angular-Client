import { Component, OnInit } from '@angular/core';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private navigate: NavigationService){}

  ngOnInit(): void {
    this.navigate.goToCharacterHome();
  }
}
