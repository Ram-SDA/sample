import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Scm } from './scm';
import { ScmCounterMain } from './scm';
import { DSCONFIG } from '../datas/dsconfig';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ScmService {

  constructor(private http: HttpClient) { }


  /** GET scm table from the server */
  getScm (type,page): Observable<any> {
    var param = "test";

    return this.http.get<any>(DSCONFIG.BACKENDHOST+'scm?type='+type+'&page='+page)
        .pipe(
            tap(data => console.log(`fetched data`)),
            catchError(this.handleError('getScm', []))
        );
  }

  getScmmetrics (): Observable<any> {


    return this.http.get<any>(DSCONFIG.BACKENDHOST+'scm/metrics')
        .pipe(
            tap(data => console.log(`fetched data`)),
            catchError(this.handleError('getScmmetrics', []))
        );
  }

  getScmSendReminder (caseIds): Observable<any> {


    return this.http.get<any>(DSCONFIG.BACKENDHOST+'scm/sendmail?caseIds='+caseIds)
        .pipe(
            tap(data => console.log(`Sent Reminder`)),
            catchError(this.handleError('getScmSendReminder', []))
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
