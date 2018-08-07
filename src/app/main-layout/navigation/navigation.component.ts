 
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../shared/authantication';
 


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef;
  isLoggedIn$: Observable<boolean>; 
  clicked: boolean;
  user$ : any = JSON.parse(localStorage.getItem('currentUser'));
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {   
    this.isLoggedIn$ = this.authenticationService.isLoggedIn;
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }
  onLogout(){
    this.authenticationService.logoutUser();
  }
}
