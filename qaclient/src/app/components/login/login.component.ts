import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidateEmail } from '../../validators/email.validator';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CheckRoleService } from '../../services/check-role.service';

// import { ServerApiHitService} from '../../_services/server-api-hit.service';
import { ServerService } from "../../services/server.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  message;
  subscription

  constructor(private http: HttpClient,private checkRoleService : CheckRoleService, private Server: ServerService, private fb: FormBuilder, private router: Router) { }

  loginForm = this.fb.group({
    emailID: ['', [Validators.required, ValidateEmail]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  ngOnInit() {
    let token = localStorage.getItem('token');
    console.log('this is token', token);
    if (token) {
      console.log('token is present');
      this.router.navigate(['/admin']);
    }
  }

  get formControls() {
    return this.loginForm.controls
  }

  signup() {
    this.router.navigate(['/signup'])
  }

  submit() {
    this.submitted = true;
    console.log(this.submitted)
    if (this.loginForm.invalid) {
      console.log(this.loginForm.status, 'Login form is invalid')
      return
    }
    else {
      console.log(this.loginForm.value);
      this.Server.loginServer(this.loginForm.value).
        subscribe((res) => {
          console.log(res);
          let dataIn = JSON.stringify(res);
          let dataOut = JSON.parse(dataIn);
          if (dataOut.token && dataOut.success) {
            localStorage.setItem('token', dataOut.token);
            localStorage.setItem('name', dataOut.name);
            // localStorage.setItem('userId',dataOut.userId);
            if (dataOut.role === "Admin") {
              console.log('Admin')
              this.router.navigate(['/admin'])
            } else {
              console.log('Not Admin')              
              this.router.navigate(['/start']);
            }
          } else {
            this.message = dataOut.message;
          }
        })
    }
  }

}
