import {Inject, Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of, ReplaySubject} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { DSCONFIG } from '../datas/dsconfig';

import { Router } from '@angular/router';
import {LOCAL_STORAGE, SESSION_STORAGE, StorageService} from "angular-webstorage-service";

@Injectable({
  providedIn: 'root'
})

export class AuthService  {

  public user: any;


  public constructor(@Inject(LOCAL_STORAGE) private storage: StorageService,private http: HttpClient, private router: Router) {

    this.user =  this.storage.get('USEROBJ');
    console.dir(this.user);
    console.log('User retreived');
    console.log('Constructor called');

    this.asyncGetUser();

  }


  public isUserValid() {

    if (typeof this.user === 'undefined') return false;
    if (this.user == '' || this.user == null) return false;
    if (typeof this.user.id === 'undefined') return false;

    console.dir(this.user);
    if (this.user.id == "-1" ) {
      console.log('Invalid user');
      return false;
    }
    console.log('Valid user');
    return true;

  }


  /*
   * Login by post
   */
  public loginPost(email,password)
  {
    debugger;
    var myThis = this;
    return this.http.post<any>(DSCONFIG.BACKENDHOST+'loginpost',{ email: email, password: password },{ withCredentials: true })
        .pipe(

            tap(function(data){
              console.log('Insite loginpost');
              console.dir(data);
              //save this to storage
              myThis.setUser(data);


            }),
            catchError(this.handleError('loginPost', []))
        );
  }

  logout(): Observable<any>
  {
    var myThis = this;
    return this.http.get<any>(DSCONFIG.BACKENDHOST+'logout',{ withCredentials: true })
        .pipe(

            tap(function(data){
              console.log('Insite logout');
              console.dir(data);
              //save this to storage
              myThis.setUser({id:-1});
              myThis.router.navigate(['home']);
            }),
            catchError(this.handleError('loginPost', []))
        );
  }

  public asyncGetUser() {

      this.getCurrentUser().subscribe(data => {
        this.setUser(data);

    });

  }


  public setUser(user) {

    this.user = user;
    this.storage.set('USEROBJ', user);
    console.dir(user);
    console.log('User saved');

  }


  getCurrentUser(): Observable<any> {

    return this.http.get(DSCONFIG.BACKENDHOST+'user',{ withCredentials: true }).pipe(
        tap(data => console.log(`fetched data`)),
        catchError(this.handleError('getCurrentUser', []))
    );

  }

  /**
   * binu@dronasys.com
   * ignore below
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
