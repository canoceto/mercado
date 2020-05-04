import {Component} from '@angular/core';
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'microMarket';
  email: string;
  password: string;

  constructor(public authenticationService: AuthenticationService) {
  }

  signUp() {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signIn() {
    this.authenticationService.SignIn(this.email, this.password)
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.authenticationService.SignOut();
  }

}
