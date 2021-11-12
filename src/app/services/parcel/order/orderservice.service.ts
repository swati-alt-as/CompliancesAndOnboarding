import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from "rxjs";
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  rooturl = "https://order-eqoju.ondigitalocean.app/parcel/";

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

  getOrdersByType(type: any) {
    return this.http.get(this.rooturl + "admin/orders/get/" + type)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  getDetails(ORDERID: any) {
    return this.http.get(this.rooturl + "order/getDetails/" + ORDERID)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }
  
  getAllData() {
    return this.http.get(this.rooturl + "draft/getAllData/")
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  assignDeliveryPartner(ORDERID: any, data: any) {
    return this.http.post(this.rooturl + "admin/order/assignDeliveryPartner/" + ORDERID, data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  cancelOrder(ORDERID: any, data: any) {
    return this.http.post(this.rooturl + "admin/order/cancelOrder/" + ORDERID, data)
      .pipe(
        retry(1),
        catchError((err) => {
          return throwError(err);    //Rethrow it back to component
        })
      )
  }


}
