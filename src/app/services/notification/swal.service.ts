import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'  

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  showSweetAlert(heading:any , message: any, title: any){
    Swal.fire(heading, message, title);
  }

  
  // confirmSweetAlert(){
  //   Swal.fire({
  //     title: 'Are you sure want to remove?',
  //     text: 'You will not be able to recover this file!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'No, keep it'
  //   }).then((result) => {
  //     if (result.value) {        
  //       Swal.fire(
  //         'Deleted!',
  //         'Your imaginary file has been deleted.',
  //         'success'
  //       )
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire(
  //         'Cancelled',
  //         'Your imaginary file is safe :)',
  //         'error'
  //       )
  //     }
  //   })
  // }
 
}
