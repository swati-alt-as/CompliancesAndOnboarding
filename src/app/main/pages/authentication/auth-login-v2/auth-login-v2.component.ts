import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
// import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from '../../../../services/authentication/login.service';
import { ToastrserviceService } from '../../../../services/notification/toastrservice.service'
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
interface paramData {
  employee_code: string,
  password: string,
  access_type: string
}

@Component({
  selector: 'app-auth-login-v2',
  templateUrl: './auth-login-v2.component.html',
  styleUrls: ['./auth-login-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginV2Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;

  // Private
  private _unsubscribeAll: Subject<any>;
  message: string;
  signin: FormGroup;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private loginService: LoginService,
    private toastr: ToastrserviceService
    // private toastr: ToastrService
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Login
    this.loading = true;

    // redirect to home page
    setTimeout(() => {
      this._router.navigate(['/']);
    }, 100);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn') == "true") {
      this._router.navigate(['/dashboard'])
    }

    this.loginForm = this._formBuilder.group({
      employee_code: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  adminLogIn() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    // Login
    this.loading = true;

    let loginPostData: paramData = {
      "employee_code": this.loginForm.value["employee_code"],
      "password": this.loginForm.value["password"],
      "access_type": "onboarding"
    };
    this.loginService.adminLogin(loginPostData).subscribe((result) => {
      if (result["status"] == true) {
        this.message = result["message"];
        this.toastr.showSuccess(this.message, "Done!")
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem("employeeData", JSON.stringify(result["items"]));
        this._router.navigate(['/dashboard'])
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      } else if (result["status"] == false) {
        this.message = result["message"];
        this.toastr.showError(this.message, "Error!")
        this._router.navigate(['/pages/authentication/login'])
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        this._router.navigate(['/pages/authentication/login'])
      }
    },
      (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, "Error!")
        this.loading = false;        
      })
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
