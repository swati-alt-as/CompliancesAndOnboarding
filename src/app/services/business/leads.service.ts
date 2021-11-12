import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from "rxjs";
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  rooturl = "https://fablo-food-business-oodq3.ondigitalocean.app/";

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

  getLeadsByPincodeNStatus() {
    return this.http.get(this.rooturl + "business/leads/12345/0")
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  getAllLeads() {
    return this.http.get(this.rooturl + "business/leads/all")
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }


}
