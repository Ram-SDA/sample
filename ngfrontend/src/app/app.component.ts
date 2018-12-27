import { Component } from '@angular/core';
import { RealfakeComponent } from './realfake/realfake.component';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Home Page App';

  constructor(public auth: AuthService, private router: Router) {

  }

  logout() {
    this.auth.logout();
  }


}
