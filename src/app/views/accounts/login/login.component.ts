 import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
import { AccountService } from '../../../services';
import { UserDataService } from '../../../shared/services';

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
    private userdDataService: UserDataService
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
    this.msgs.push({ severity: 'warn', summary: 'Error Message', detail: `${msg}` });
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
        .subscribe(response =>{
          if(response){
             
            let user = response.data[0];
            if(user.Email!== undefined){
              this.showSuccess();
              setTimeout(() => {
                // this.userdDataService.saveUser(user);
                localStorage.setItem("currentUser",JSON.stringify({username:user.Email }));
               this.router.navigate(["/dashboards/v1"]);   
              }, 2000);                           
            }
          }
        });    
  }

}
