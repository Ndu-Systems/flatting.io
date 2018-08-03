import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
import { AccountService } from '../../../services'; 
import { AuthenticationService } from '../../../shared/authantication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  cardForm: FormGroup
  Email: any
  Password: any
  msgs: Message[] = []

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private accountService : AccountService,
    private authenticationService: AuthenticationService

  ) {
    this.cardForm = fb.group({
      validateEmail: [null, Validators.required],
      validatePassword: [null, Validators.required ]
    })
   }

  ngOnInit() {
    // this.userdDataService.saveUser(null);
    localStorage.clear();
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Successfully Verified' });
  }
  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'warn', summary: 'Validation Message', detail: `${msg}` });
  }
  login(){
    if (!this.Email) {
      this.showError("Email is required");
      return false;
    }
    if (!this.Password) {
      this.showError("Password is required");
      return false;
    }

    this.accountService.loginUser(this.Email,this.Password)
        .subscribe((response) =>{
          let user = response;                 
            if(user.Email!== undefined){
              this.showSuccess();
              setTimeout(() => {            
                localStorage.setItem('currentUser',JSON.stringify({username:user.Email}));                
                this.authenticationService.loginUser(user);
              }, 2000);                           
            }        
          else{
            this.showError("Email/Password is not verified");
          }
        });    
  }

}
