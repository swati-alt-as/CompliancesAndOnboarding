import { Component, OnInit } from '@angular/core'

//test image upload
// import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { map, finalize } from "rxjs/operators";
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
            name: 'Home',
            isLink: true,
            link: '/home'
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
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
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
        console.log(error)
      };
  }
  
}
