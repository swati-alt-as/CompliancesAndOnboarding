import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from "rxjs";
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeliveryserviceService {

  onboardingurl = "https://fablo-delivery-t37st.ondigitalocean.app/onboarding/";
  adminrooturl = "https://fablo-delivery-t37st.ondigitalocean.app/admin/verification/";

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

  getUnverified() {
    return this.http.get(this.adminrooturl + "getUnverified")
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  getAllPartnerDetails(data: any) {
    return this.http.get(this.adminrooturl + "getAllPartnerDetails/" + data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  verifyAllPartnerDetails(data: any) {
    return this.http.get(this.adminrooturl + "verifyAllPartnerDetails/" + data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  getAll() {
    return this.http.get(this.onboardingurl + "lead/getAll")
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  checkRegistrationStatusByToken(data: any) {
    return this.http.get(this.onboardingurl + "basicDetails/checkRegistrationStatusByToken/" + data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  basicDetails(data: any) {
    return this.http.post(this.onboardingurl + "basicDetails" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  kyc(data: any) {
    return this.http.post(this.onboardingurl + "kyc" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  bankDetails(data: any) {
    return this.http.post(this.onboardingurl + "bankDetails" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  vehicleDetails(data: any) {
    return this.http.post(this.onboardingurl + "vehicleDetails" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  termCondition(data: any, token: any) {
    return this.http.post(this.onboardingurl + "termCondition/" + token + "/accept" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  basicDetailsByToken(data: any) {
    return this.http.get(this.onboardingurl + "basicDetails/byToken/" + data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  kycByToken(data: any) {
    return this.http.get(this.onboardingurl + "kyc/byToken/" + data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  bankDetailsByToken(data: any) {
    return this.http.get(this.onboardingurl + "bankDetails/byToken/" + data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  vehicleDetailsByToken(data: any) {
    return this.http.get(this.onboardingurl + "vehicleDetails/byToken/" + data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }


}
