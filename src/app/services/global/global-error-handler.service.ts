import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
 
@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
 
  constructor() {} 
 
  handleError(error: Error | HttpErrorResponse) { }
 
}