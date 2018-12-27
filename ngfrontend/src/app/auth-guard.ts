import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import {Observable} from "rxjs/index";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {

    if (!this.auth.isUserValid()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

}
