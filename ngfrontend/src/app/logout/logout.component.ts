import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {

    this.auth.logout().subscribe(data => {
      this.auth.setUser({id:-1});
      this.router.navigateByUrl('/login');
    });


  }

  ngOnInit() {
  }

}
