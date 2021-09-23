import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http'
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { retry, catchError } from 'rxjs/operators';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  // rooturl = "http://192.168.1.26:3001/";
  rooturl = "https://fablo-administrator-ahyzw.ondigitalocean.app/locations/";
  isLoggedIn: boolean = false;
  public redirectUrl: string;

  constructor(private http: HttpClient) { }

  // Error handling 
  handleError(error: HttpErrorResponse) {
    // console.log(error) 
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  activeCitiesList(data:any) {
    return this.http.get(this.rooturl + "cities/" + data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  activeCountriesList() {
    return this.http.get(this.rooturl + "countries")
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  activeStatesList(data:any) {
    return this.http.get(this.rooturl + "states/" + data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  activeAreasList(data:any) {
    return this.http.get(this.rooturl + "areas/" + data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

}
