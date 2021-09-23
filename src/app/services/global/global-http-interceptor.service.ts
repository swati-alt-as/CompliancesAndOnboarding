
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
 
@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
 
  constructor(public router: Router) { }
  
  //2. Sending an Invalid Token will generate error
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    const token: string = 'invald token';
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
 
    return next.handle(req).pipe(
      catchError((error) => {
        return throwError(error);
      })
    )
  }
 
  
}