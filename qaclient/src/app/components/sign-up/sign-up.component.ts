import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ValidateEmail } from '../../validators/email.validator';

// import { ServerService } from '../../services/server-api-hit.service'
import { ServerService } from "../../services/server.service"


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  showconfirmpasswarning;
  submitted = false;
  message;
  confirmPassTouched = false;
  // passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{4,}$"

  constructor(private http: HttpClient, private Server: ServerService, private router: Router, private fb: FormBuilder) { }

  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    emailID: ['', [Validators.required, ValidateEmail]],
    password: ['', [Validators.required, Validators.minLength(5)]],//Validators.pattern(this.passwordRegex) is not required to be written here, as it is writtern in html.
    // Similarly, Validatores.required can be removed from here by simply writing required in the html tag of password, as <tag required>Some tag</tag>
    role: ["User"]
  });

  ngOnInit() {
    this.submitted = false
    if (localStorage.getItem('token')) {
      this.router.navigate(['/login'])
    }
  }

  login() {
    this.router.navigate(['/login'])
  }

  confirmPassword() {
    this.confirmPassTouched = true;
    if (this.signupForm.value.password === (<HTMLInputElement>document.getElementById('confirm_password')).value) {
      console.log('equal');
      this.showconfirmpasswarning = false
    } else this.showconfirmpasswarning = true
  }

  checkConfirmPassword() {
    if (this.confirmPassTouched) {
      if (this.signupForm.value.password === (<HTMLInputElement>document.getElementById('confirm_password')).value) {
        console.log('equal');
        this.showconfirmpasswarning = false
      } else this.showconfirmpasswarning = true
    }
  }

  get formControls() {
    // console.log('signupform',this.signupForm)
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.submitted)
    if (this.signupForm.invalid) {
      console.log(this.signupForm.status, 'signup form is invalid')
      return
    }
    else {
      if (this.showconfirmpasswarning) {
        return
      } else {
        // this.signupForm.patchValue({}) can only be used to update a value already present in the signupForm, if we want to add new value, use spread operator
        console.log({ ...this.signupForm.value }, 'signupform')
        this.Server.signupServer(this.signupForm.value).
          subscribe((res) => {
            console.log(res);
            let dataIn = JSON.stringify(res);
            let dataOut = JSON.parse(dataIn);
            this.message = dataOut.message;
            if (dataOut.success) {
              setTimeout(() => this.router.navigate(['/login']), 2000)
            }
          })
      }
    }
  }

}
