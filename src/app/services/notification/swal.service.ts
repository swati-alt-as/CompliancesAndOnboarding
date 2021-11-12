import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'; 

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  showSweetAlert(heading:any , message: any, title: any){
    Swal.fire(heading, message, title);
  }

}
