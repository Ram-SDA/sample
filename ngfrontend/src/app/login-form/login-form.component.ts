import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  email: string;
  password: string;
  loginFailed = false;


  constructor(private auth: AuthService, private router: Router) {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
    // var height = (window.screen.height) + "px";
    // var width = (window.screen.width) + "px";
  }

  login() {
    console.log(' email '+this.email + " " + this.password);

    this.loginFailed = false;
debugger;
    this.auth.loginPost(this.email,this.password).subscribe(user => {
      this.auth.user = user;
debugger;
      if (this.auth.isUserValid())
      {
        console.log('Valid Logged in');
        console.dir(this.auth.user);
        this.router.navigate(['home']);
      }
      else
      {
        this.loginFailed = true;
        console.dir(this.auth.user);
        console.log('Login failed');
      }


    });

  }

}
