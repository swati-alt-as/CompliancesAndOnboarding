import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = "firebaseCloudsSorage";
  selectedFile!: File;
  currenturl: any;
  newurl: any;
  fb: any;
  downloadURL!: Observable<string>;

  constructor(private storage: AngularFireStorage) { }

  public contentHeader: object


  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Dashboard',
            isLink: true,
            link: '/dashboard'
          },
          {
            name: 'Dashboard',
            isLink: false
          }
        ]
      }
    }
  }

  // image upload

  onFileSelected(event: any) {
    var n = "businesslogo.jpg";
    const file = event.target.files[0];
    const filePath = `fablo_business/merchant/2F47471fd3fdf1dbeb308d343bff9a27df684a324/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`fablo_business/merchant/2F47471fd3fdf1dbeb308d343bff9a27df684a324/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      }), (error: HttpErrorResponse) => {
        console.log(error.error.message, error.error.status)
      };
  }
  
}
