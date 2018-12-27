import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { DSCONFIG } from '../datas/dsconfig';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})


export class ImanufactureService {

  constructor(private http: HttpClient) { }

  /** GET getSymptons json from the server */
  getNLP (query): Observable<any> {
    var param = "test";

    return this.http.get<any>(DSCONFIG.IMANUFACTURE_NLPURL+query)
        .pipe(
            tap(data => console.log(`fetched data`)),
            catchError(this.handleError('getSymptons', []))
        );
  }

  getExpertData (query): Observable<any> {
    console.dir(query);
    var param = query.symptoms.length ? query.symptoms.join() : query.parts.length;


    console.dir(param);

    return this.http.get<any>(DSCONFIG.IMANUFACTURE_DIAGNOSTICURL+param)
        .pipe(
            tap(data => console.log(`fetched data`)),
            catchError(this.handleError('getSymptons', []))
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
