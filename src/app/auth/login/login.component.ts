import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginErr: any;
  loading = false;

  constructor(public f: FormBuilder, private route: Router, private auth_service: AuthenticationService) {
    this.loginForm = this.f.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  get lf() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  signIn() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const UserData = this.loginForm.value;
    this.loading = true;
    this.auth_service.SignIn(UserData.email, UserData.password)
    //   }, err => {
    //     this.loading = false;
    //     this.loginErr = err.error.errors[0].message;
    //   });
    this.route.navigate(['/market']);
  }
}
