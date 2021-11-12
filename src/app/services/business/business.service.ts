import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from "rxjs";
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  rooturl = "https://fablo-food-business-oodq3.ondigitalocean.app/business";

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

  getRegistrationStatusByToken(data:any) {
      return this.http.get(this.rooturl +"/token/"+ data + "/status")
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  getAllCategories() {
    return this.http.get(this.rooturl + "/categories")
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  createBusiness(data:any) {
    return this.http.post(this.rooturl , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  contactPerson(data:any) {
    return this.http.post(this.rooturl + "/contactPerson/" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }
  
  bank(data:any) {
    return this.http.post(this.rooturl + "/bank/" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  documents(data:any) {
    return this.http.post(this.rooturl + "/documents" , data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  businessBasicDetail(data :any) {
    return this.http.get(this.rooturl + "/details/"+ data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  getBusinessByToken(data :any) {
    return this.http.get(this.rooturl + "/"+ data + "/getAllDetails")
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  contactPersonDetail(data :any) {
    return this.http.get(this.rooturl + "/contactPerson/"+ data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  bankDetail(data :any) {
    return this.http.get(this.rooturl + "/bank/"+ data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  bankIFSC(data :any) {
    return this.http.get("https://ifsc.razorpay.com/"+ data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  kycDetail(data :any) {
    return this.http.get(this.rooturl + "/kyc/"+ data + "/documents")
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

}
