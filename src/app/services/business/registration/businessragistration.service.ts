import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from "rxjs";
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessragistrationService {

  rooturl = "https://fablo-food-business-oodq3.ondigitalocean.app/business/";

  constructor(private http: HttpClient) { }

  // Error handling 
  handleError(error: HttpErrorResponse) {
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

  getStatus(data:any) {
    return this.http.get(this.rooturl + "register/getStatus/" + data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }
  
  sendOtp(data:any) {
    return this.http.get(this.rooturl + "login/sendOtp/" + data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  verifyOtp(data:any) {
    return this.http.post(this.rooturl + "login/verifyOtp" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  getPendingRegistrations() {
    return this.http.get(this.rooturl + "register/getPendingRegistrations")
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  basicDetails(data:any) {
    return this.http.post(this.rooturl + "register/basicDetails" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  contactDetails(data:any) {
    return this.http.post(this.rooturl + "register/contactDetails" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  getBankData(data:any) {
    return this.http.get(this.rooturl + "register/getBankData/" + data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  bankDetails(data:any) {
    return this.http.post(this.rooturl + "register/bankDetails" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  taxDetails(data:any) {
    return this.http.post(this.rooturl + "register/taxDetails" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  kycDetails(data:any) {
    return this.http.post(this.rooturl + "register/kycDetails" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  fssaiDetails(data:any) {
    return this.http.post(this.rooturl + "register/fssaiDetails" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  commissionDetails(data:any) {
    return this.http.post(this.rooturl + "register/commissionDetails" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  commissionRate(data:any) {
    return this.http.get(this.rooturl + "register/commissionRate/" + data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

}
