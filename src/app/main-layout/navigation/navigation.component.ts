 
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
 


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef;

  clicked: boolean;
  currentUser  :any
  constructor() {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {   
    this.currentUser  = localStorage.getItem("currentUser"); 
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

}
