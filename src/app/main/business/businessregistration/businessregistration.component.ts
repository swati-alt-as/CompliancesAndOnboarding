import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
//firebase
import { AngularFireStorage } from "@angular/fire/compat/storage";
import Stepper from 'bs-stepper';

import { BusinessService } from '../../../services/business/business.service';
import { BusinessragistrationService } from '../../../services/business/registration/businessragistration.service';
import { LocationService } from '../../../services/location/location.service';
import { SwalService } from '../../../services/notification/swal.service';
import { ToastrserviceService } from '../../../services/notification/toastrservice.service';
import { environment } from '../../../../environments/environment';

//modal
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

interface verifyotp {
  token: string
  otp: string
}

interface basicDetails {
  business_name: string
  phone: string
  category_id: string
  category_english: string
  category_hindi: string
  business_type: string
  business_type_name: string
  city_id: string
  city_name: string
  country_id: string
  country_name: string
  state_id: string
  state_name: string
  area_id: string,
  area_name: string,
  pincode: string,
  address: {
    line_one: string,
    line_two: string,
  }
  token: string
  business_logo: string
  app_version: string
}

interface contactPerson {
  token: string
  type: string
  name: string
  email: string
  invoicing_email: string
  app_version: string
}

interface bank {
  token: string
  branch_name: string
  account_number: string
  bank_name: string
  document: {
    file_type: string,
    file: string
  },
  ifsc_code: string
  beneficiary_name: string
  app_version: string
}

interface WithGstTax {
  token: string
  pancard: {
    number: string,
    file: string,
    file_type: string
  },
  turnOver: number,
  gst: {
    is_available: Boolean,
    number: string,
    file: string,
    file_type: string
  },
  app_version: string
}

interface tax {
  token: string
  pancard: {
    number: string,
    file: string,
    file_type: string
  },
  turnOver: number,
  gst: {
    is_available: Boolean,
  },
  app_version: string
}

interface WithFssaiAvailable {
  token: string
  availability: boolean
  license: {
    number: string,
    file: string,
    file_type: string
  },
  app_version: string
}

interface fssai {
  token: string
  availability: boolean
  acknowledgement: {
    number: string,
    apply_date: string
  },
  app_version: string
}

interface kyc {
  token: string
  aadhar_number: string
  aadhar_front: {
    file_type: string,
    file: string
  },
  aadhar_back: {
    file_type: string,
    file: string
  },
  app_version: string
}

interface commission {
  token: string
  commission: {
    rate: number
  },
  app_version: string
}


@Component({
  selector: 'app-businessregistration',
  templateUrl: './businessregistration.component.html',
  styleUrls: ['./businessregistration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BusinessregistrationComponent implements OnInit {

  public contentHeader: object;
  private modernWizardStepper: Stepper;
  private bsStepper;
  public selectMulti = [{ name: 'English' }, { name: 'French' }, { name: 'Spanish' }];
  public selectMultiSelected;

  categoriesList: any = [];
  cityList: any = [];
  businessBasicDetail: any = [];
  areaList: any = [];
  countries: any = [];
  states: any = [];
  commissionRateList: any = {};


  businessDetails!: FormGroup;
  contactPersonDetails!: FormGroup;
  bankDetails!: FormGroup;
  taxDetails!: FormGroup;
  fssaiDetails!: FormGroup;
  kycDetails!: FormGroup;
  commissionDetails!: FormGroup;
  eSignatureDetails!: FormGroup;

  business_step = false;
  contactPerson_step = false;
  bank_step = false;
  tax_step = false;
  fssai_step = false;
  kyc_step = false;
  commission_step = false;
  eSign_step = false;

  bankname: any;
  message: string;
  title: string;
  otp: any;
  registrationStatus: boolean = true;
  otpSent: boolean = false;
  otpVerified: boolean = false;

  bankFileType: string;
  gstFileType: string;
  pancardFileType: string;
  fssaiFileType: string;
  aadharfrontFileType: string;
  aadharbackFile_type: string;
  confirmationResult: any;
  registertoken: string = "";

  result: any = {};
  getStatus: any = {};
  businessSessionData: any = {};
  logo: any;
  bankFile: any;
  pancardFile: any;
  gstFile: any;
  fssaiFile: any;
  adhar_frontFile: any;
  adhar_backFile: any;
  downloadURL: Observable<string>;
  logoUrl: any;
  bankUrl: any;
  pancardUrl: any;
  gstUrl: any;
  fssaiUrl: any;
  adhar_frontUrl: any;
  adhar_backUrl: any;


  constructor(private formBuilder: FormBuilder, private business: BusinessService, private storage: AngularFireStorage, private ragister: BusinessragistrationService, private location: LocationService, private router: ActivatedRoute, private swal: SwalService, private toastr: ToastrserviceService,) { }

  /**
   * Modern Horizontal Wizard Stepper Next
   */
  modernHorizontalNext() {
    this.modernWizardStepper.next();
  }
  /**
  * Modern Horizontal Wizard Stepper Previous
  */
  modernHorizontalPrevious() {
    this.modernWizardStepper.previous();
  }

  onSubmit() {
    alert('Submitted!!');
    return false;
  }

  ngOnInit(): void {

    if (localStorage.getItem('businessData')) {
      this.businessSessionData = JSON.parse(localStorage.getItem('businessData'));
      this.registertoken = this.businessSessionData.token;
      this.ragister.getStatus(this.registertoken).subscribe((result) => {
        if (result["items"].length !== 0) {
          this.getStatus = result["items"];
        }
      })
      this.ragister.commissionRate(this.registertoken).subscribe((result) => {
        if (result["items"].length !== 0) {
          this.commissionRateList = result["items"];
        }
      })
    } else {
      this.getStatus.BasicDetails = 0;
    }
    this.business.getAllCategories().subscribe((result) => {
      if (result["items"].length !== 0) {
        this.categoriesList = result["items"];
      }
    })

    this.location.activeCountriesList().subscribe((result) => {
      if (result["items"].length !== 0) {
        this.countries = result["items"];
      }
    })

    this.businessDetails = this.formBuilder.group({
      business_name: ['', Validators.required],
      category: ['', Validators.required],
      phone: ['', Validators.required],
      otp: ['', Validators.required],
      business_type: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      area: ['', Validators.required],
      pincode: ['', Validators.required],
      address_line_one: ['', Validators.required],
      address_line_two: ['', Validators.required],
      business_logo: ['', Validators.required],
    });

    this.contactPersonDetails = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      invoicing_email: ['', Validators.required]
    });

    this.bankDetails = this.formBuilder.group({
      branch_name: ['', Validators.required],
      account_number: ['', Validators.required],
      bank_name: ['', Validators.required],
      document: ['', Validators.required],
      file_type: ['', Validators.required],
      beneficiary_name: ['', Validators.required],
      ifsc_code: ['', Validators.required]
    });

    this.taxDetails = this.formBuilder.group({
      is_available: [''],
      gstfile_type: [''],
      gst_number: [''],
      gst_image: [''],
      pancardfile_type: ['', Validators.required],
      pancard_number: ['', Validators.required],
      turnOver: ['', Validators.required],
      pancard_image: ['', Validators.required]
    });

    this.fssaiDetails = this.formBuilder.group({
      availability: [''],
      fssai_number: [''],
      fssaifile_type: [''],
      fssai_image: [''],
      acknowledgement_number: [''],
      acknowledgement_applydate: ['']
    });

    this.kycDetails = this.formBuilder.group({
      aadhar_number: ['', Validators.required],
      aadhar_front: ['', Validators.required],
      aadhar_frontfile_type: ['', Validators.required],
      aadhar_backfile_type: ['', Validators.required],
      aadhar_back: ['', Validators.required]
    });

    this.commissionDetails = this.formBuilder.group({
      rate: ['', Validators.required]
    });

    this.eSignatureDetails = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.modernWizardStepper = new Stepper(document.querySelector('#stepper3'), {
      linear: false,
      animation: true
    });

    this.bsStepper = document.querySelectorAll('.bs-stepper');

    // content header
    this.contentHeader = {
      headerTitle: 'Registration',
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
            name: 'Business Onboard',
            isLink: false
          }
        ]
      }
    };
  }


  get basic() { return this.businessDetails.controls; }
  get contactPerson() { return this.contactPersonDetails.controls; }
  get bank() { return this.bankDetails.controls; }
  get tax() { return this.taxDetails.controls; }
  get fssai() { return this.fssaiDetails.controls; }
  get kyc() { return this.kycDetails.controls; }
  get commission() { return this.commissionDetails.controls; }
  get eSign() { return this.eSignatureDetails.controls; }


  setRequired() {
    return [Validators.required];
  }

  bankDocumentType(event) {
    this.bankFileType = event.target.value
  }

  gstDocumentType(event) {
    this.gstFileType = event.target.value
  }

  pancardDocumentType(event) {
    this.pancardFileType = event.target.value
  }

  fssaiDocumentType(event) {
    this.fssaiFileType = event.target.value
  }

  aadhar_frontDocumentType(event) {
    this.aadharfrontFileType = event.target.value
  }

  aadhar_backDocumentType(event) {
    this.aadharbackFile_type = event.target.value
  }

  haveGST(event) {
    if (this.taxDetails.value.is_available) {
      this.taxDetails.controls.gstfile_type.setValidators(this.setRequired());
      this.taxDetails.controls.gst_number.setValidators(this.setRequired());
      this.taxDetails.controls.gst_image.setValidators(this.setRequired());
    } else {
      this.taxDetails.controls.gstfile_type.clearValidators();
      this.taxDetails.controls.gst_number.clearValidators();
      this.taxDetails.controls.gst_image.clearValidators();
    }
  }

  haveFssai(event) {
    if (this.fssaiDetails.value.availability) {
      this.fssaiDetails.controls.fssaifile_type.setValidators(this.setRequired());
      this.fssaiDetails.controls.fssai_number.setValidators(this.setRequired());
      this.fssaiDetails.controls.fssai_image.setValidators(this.setRequired());
      this.fssaiDetails.controls.acknowledgement_number.clearValidators();
      this.fssaiDetails.controls.acknowledgement_applydate.clearValidators();
    } else {
      this.fssaiDetails.controls.acknowledgement_number.setValidators(this.setRequired());
      this.fssaiDetails.controls.acknowledgement_applydate.setValidators(this.setRequired());
      this.fssaiDetails.controls.fssaifile_type.clearValidators();
      this.fssaiDetails.controls.fssai_number.clearValidators();
      this.fssaiDetails.controls.fssai_image.clearValidators();
    }
  }

  titleName(event) {
    this.title = event.target.value
  }

  countryChangeHandler(country: any) {
    var countryArray = country.target.value.split("+++");
    this.location.activeStatesList(countryArray[0]).subscribe((result) => {
      if (result["items"].length !== 0) {
        this.states = result["items"];
      }
    })
  }

  stateChangeHandler(state: any) {
    var stateArray = state.target.value.split("+++");
    this.location.activeCitiesList(stateArray[0]).subscribe((result) => {
      if (result["items"].length !== 0) {
        this.cityList = result["items"];
      }
    })
  }

  cityChangeHandler(cityId: any) {
    var cityIdArray = cityId.target.value.split("+++");
    this.location.activeAreasList(cityIdArray[0]).subscribe((result) => {
      if (result["items"].length !== 0) {
        this.areaList = result["items"];
      }
    })
  }

  sendOtp() {
    this.ragister.sendOtp(this.businessDetails.value["phone"]).subscribe((resultData) => {
      this.result = resultData;
      if (this.result["status"] == true) {
        this.message = this.result["message"];
        console.log(this.result["items"].code);
        this.registertoken = this.result["items"].token;
        this.ragister.getStatus(this.registertoken).subscribe((result) => {
          if (result["items"].length !== 0) {
            this.getStatus = result["items"];
          }
        })
        this.ragister.commissionRate(this.registertoken).subscribe((result) => {
          if (result["items"].length !== 0) {
            this.commissionRateList = result["items"];
          }
        })
        this.toastr.showSuccess(this.message, "Done");
        this.otpSent = true;
      } else if (this.result["status"] == false) {
        this.message = this.result["message"];
        this.toastr.showError(this.message, "Error!");
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
      (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status);
      })
  }

  verifyOtp() {
    let postData: verifyotp = {
      "token": this.registertoken,
      "otp": this.businessDetails.value["otp"]
    }
    this.ragister.verifyOtp(postData).subscribe((resultData) => {
      this.result = resultData;
      if (this.result["status"] == true) {
        this.message = this.result["message"];
        this.otpVerified = true;
        this.toastr.showSuccess(this.message, "Done")
      } else if (this.result["status"] == false) {
        this.message = this.result["message"];
        this.toastr.showError(this.message, "Error!")
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
      (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status)
      })
  }

  onFileChange(event: any) {
    this.logo = event.target.files[0];
  }

  onBankFileChange(event: any) {
    this.bankFile = event.target.files[0];
  }

  onPancardFileChange(event: any) {
    this.pancardFile = event.target.files[0];
  }

  onGstFileChange(event: any) {
    this.gstFile = event.target.files[0];
  }

  onFssaiFileChange(event: any) {
    this.fssaiFile = event.target.files[0];
  }

  onAdharFrontFileChange(event: any) {
    this.adhar_frontFile = event.target.files[0];
  }

  onAdharBackFileChange(event: any) {
    this.adhar_backFile = event.target.files[0];
  }

  basicDetails() {
    var categoryArray = this.businessDetails.value["category"].split("+++");
    var countryArray = this.businessDetails.value["country"].split("+++");
    var stateArray = this.businessDetails.value["state"].split("+++");
    var cityArray = this.businessDetails.value["city"].split("+++");
    var areaArray = this.businessDetails.value["area"].split("+++");
    var business_typeArray = this.businessDetails.value["business_type"].split("+++");

    var n = "businesslogo.jpg";
    const filePath = `fablo_business/merchant/${this.registertoken}/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.logo);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.logoUrl = url;
              localStorage.setItem("businesslogourl", JSON.stringify(this.logoUrl));
            }
          });
        })
      )
      .subscribe(url => {
        
      }), (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status)
        // console.log(error)
      };
    let postData: basicDetails = {
      "business_name": this.businessDetails.value["business_name"],
      "phone": this.businessDetails.value["phone"],
      "category_id": categoryArray[0],
      "category_english": categoryArray[1],
      "category_hindi": categoryArray[2],
      "business_type": business_typeArray[0],
      "business_type_name": business_typeArray[1],
      "country_id": countryArray[0],
      "country_name": countryArray[1],
      "state_id": stateArray[0],
      "state_name": stateArray[1],
      "city_id": cityArray[0],
      "city_name": cityArray[1],
      "area_id": areaArray[0],
      "area_name": areaArray[1],
      "pincode": this.businessDetails.value["pincode"],
      "business_logo": JSON.parse(localStorage.getItem('businesslogourl')),
      "address": {
        "line_one": this.businessDetails.value["address_line_one"],
        "line_two": this.businessDetails.value["address_line_two"]
      },
      "token": this.registertoken,
      "app_version": environment.app_version
    };
    this.ragister.basicDetails(postData).subscribe((resultData) => {
      this.result = resultData;
      if (this.result["status"] == true) {
        localStorage.setItem("businessData", JSON.stringify(this.result["items"]));
        this.message = this.result["message"];
        this.toastr.showSuccess(this.message, "Done")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (this.result["status"] == false) {
        this.message = this.result["message"];
        this.toastr.showError(this.message, "Error!")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
      (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status)
      })
  }

  addContactPerson() {
    this.businessSessionData = JSON.parse(localStorage.getItem('businessData'));
    let contactPersonData: contactPerson = {
      "token": this.businessSessionData.token,
      "type": this.contactPersonDetails.value["type"],
      "name": this.contactPersonDetails.value["name"],
      "email": this.contactPersonDetails.value["email"],
      "invoicing_email": this.contactPersonDetails.value["invoicing_email"],
      "app_version": environment.app_version
    };
    this.ragister.contactDetails(contactPersonData).subscribe((resultData) => {
      this.result = resultData;
      if (this.result["status"] == true) {
        this.message = this.result["message"];
        this.toastr.showSuccess(this.message, "Done");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (this.result["status"] == false) {
        this.message = this.result["message"];
        this.toastr.showError(this.message, this.result["status"]);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
      (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status);
      })
  }

  fetchBankName(event: any) {
    let ifsc = event.target.value
    this.ragister.getBankData(ifsc).subscribe((result) => {
      if (result["items"]) {
        this.bankname = result["items"]
      } else if (result["success"] == false) {
        this.bankname = "Bank Not Found"
      }
    })
  }

  addBank() {
    if (this.bankFileType == "image") {
      var n = "bankdocument.jpg";
    } else {
      var n = "bankdocument.pdf";
    }
    const filePath = `fablo_business/merchant/${this.registertoken}/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.bankFile);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.bankUrl = url;
              localStorage.setItem("bankdocumenturl", JSON.stringify(this.bankUrl));
            }
          });
        })
      )
      .subscribe(url => {
        
      }), (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status)
      };
    this.businessSessionData = JSON.parse(localStorage.getItem('businessData'));
    let bankData: bank = {
      "token": this.businessSessionData.token,
      "account_number": this.bankDetails.value["account_number"],
      "bank_name": this.bankDetails.value["bank_name"],
      "branch_name": this.bankDetails.value["branch_name"],
      "document": {
        "file_type": this.bankFileType,
        "file": JSON.parse(localStorage.getItem('bankdocumenturl'))
      },

      "beneficiary_name": this.bankDetails.value["beneficiary_name"],
      "ifsc_code": this.bankDetails.value["ifsc_code"],
      "app_version": environment.app_version
    };
    this.ragister.bankDetails(bankData).subscribe((resultData) => {
      this.result = resultData;
      if (this.result["status"] == true) {
        this.message = this.result["message"];
        this.toastr.showSuccess(this.message, "Done");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (this.result["status"] == false) {
        this.message = this.result["message"];
        this.toastr.showError(this.message, this.result["status"]);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
      (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status);
      })
  }

  addTax() {
    if (this.pancardFileType == "image") {
      var pan = "pandocument.jpg";
    } else {
      var pan = "pandocument.pdf";
    }
    const pancardPath = `fablo_business/merchant/${this.registertoken}/${pan}`;
    const pancardRef = this.storage.ref(pancardPath);
    const pancardtask = this.storage.upload(pancardPath, this.pancardFile);
    pancardtask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = pancardRef.getDownloadURL();
          this.downloadURL.subscribe(panurl => {
            if (panurl) {
              this.pancardUrl = panurl;
              localStorage.setItem("pancarddocumenturl", JSON.stringify(this.pancardUrl));
            }
          });
        })
      )
      .subscribe(panurl => {
        if (panurl) {
        }
      }), (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status);
      };

    this.businessSessionData = JSON.parse(localStorage.getItem('businessData'));
    if (this.taxDetails.value["is_available"]) {
      if (this.gstFileType == "image") {
        var n = "gstdocument.jpg";
      } else {
        var n = "gstdocument.pdf";
      }
      const filePath = `fablo_business/merchant/${this.registertoken}/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.gstFile);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                this.gstUrl = url;
                localStorage.setItem("gstdocumenturl", JSON.stringify(this.gstUrl));
              }
            });
          })
        )
        .subscribe(url => {
          
        }), (error: HttpErrorResponse) => {
          this.toastr.showError(error.error.message, error.error.status);
        };
      let taxData: WithGstTax = {
        "token": this.businessSessionData.token,
        "pancard": {
          "number": this.taxDetails.value["pancard_number"],
          "file": JSON.parse(localStorage.getItem('pancarddocumenturl')),
          "file_type": this.pancardFileType
        },
        "gst": {
          "is_available": this.taxDetails.value["is_available"],
          "number": this.taxDetails.value["gst_number"],
          "file": JSON.parse(localStorage.getItem('gstdocumenturl')),
          "file_type": this.gstFileType
        },
        "turnOver": this.taxDetails.value["turnOver"],
        "app_version": environment.app_version
      };
      this.ragister.taxDetails(taxData).subscribe((resultData) => {
        this.result = resultData;
        if (this.result["status"] == true) {
          this.message = this.result["message"];
          this.toastr.showSuccess(this.message, "Done");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (this.result["status"] == false) {
          this.message = this.result["message"];
          this.toastr.showError(this.message, this.result["status"]);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      },
        (error: HttpErrorResponse) => {
          this.toastr.showError(error.error.message, error.error.status);
        })
    } else {
      let taxData: tax = {
        "token": this.businessSessionData.token,
        "pancard": {
          "number": this.taxDetails.value["pancard_number"],
          "file": JSON.parse(localStorage.getItem('pancarddocumenturl')),
          "file_type": this.pancardFileType
        },
        "gst": {
          "is_available": false,
        },
        "turnOver": this.taxDetails.value["turnOver"],
        "app_version": environment.app_version
      };
      this.ragister.taxDetails(taxData).subscribe((resultData) => {
        this.result = resultData;
        if (this.result["status"] == true) {
          this.message = this.result["message"];
          this.toastr.showSuccess(this.message, "Done");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (this.result["status"] == false) {
          this.message = this.result["message"];
          this.toastr.showError(this.message, this.result["status"]);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      },
        (error: HttpErrorResponse) => {
          this.toastr.showError(error.error.message, error.error.status);
        })
    }

  }

  addFssai() {
    this.businessSessionData = JSON.parse(localStorage.getItem('businessData'));
    if (this.fssaiDetails.value["availability"]) {
      if (this.fssaiFileType == "image") {
        var n = "fssaidocument.jpg";
      } else {
        var n = "fssaidocument.pdf";
      }
      const filePath = `fablo_business/merchant/${this.registertoken}/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.fssaiFile);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                this.fssaiUrl = url;
                localStorage.setItem("fssaidocumenturl", JSON.stringify(this.fssaiUrl));
              }
            });
          })
        )
        .subscribe(url => {
          
        }), (error: HttpErrorResponse) => {
          this.toastr.showError(error.error.message, error.error.status);
        };
      let fssaiData: WithFssaiAvailable = {
        "token": this.businessSessionData.token,
        "availability": this.fssaiDetails.value["availability"],
        "license": {
          "number": this.fssaiDetails.value["fssai_number"],
          "file": JSON.parse(localStorage.getItem('fssaidocumenturl')),
          "file_type": this.fssaiFileType
        },
        "app_version": environment.app_version
      };
      this.ragister.fssaiDetails(fssaiData).subscribe((resultData) => {
        this.result = resultData;
        if (this.result["status"] == true) {
          this.message = this.result["message"];
          this.toastr.showSuccess(this.message, "Done");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (this.result["status"] == false) {
          this.message = this.result["message"];
          this.toastr.showError(this.message, this.result["status"]);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      },
        (error: HttpErrorResponse) => {
          this.toastr.showError(error.error.message, error.error.status);
        })
    } else {
      let fssaiData: fssai = {
        "token": this.businessSessionData.token,
        "availability": false,
        "acknowledgement": {
          "number": this.fssaiDetails.value["acknowledgement_number"],
          "apply_date": this.fssaiDetails.value["acknowledgement_applydate"]
        },
        "app_version": environment.app_version
      };
      this.ragister.fssaiDetails(fssaiData).subscribe((resultData) => {
        this.result = resultData;
        if (this.result["status"] == true) {
          this.message = this.result["message"];
          this.toastr.showSuccess(this.message, "Done");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (this.result["status"] == false) {
          this.message = this.result["message"];
          this.toastr.showError(this.message, this.result["status"]);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      },
        (error: HttpErrorResponse) => {
          this.toastr.showError(error.error.message, error.error.status);
        })
    }

  }

  addKyc() {
    if (this.aadharfrontFileType == "image") {
      var aadhaarfront = "aadhaarfrontdocument.jpg";
    } else {
      var aadhaarfront = "aadhaarfrontdocument.pdf";
    }
    const aadhaarfrontPath = `fablo_business/merchant/${this.registertoken}/${aadhaarfront}`;
    const aadhaarfrontRef = this.storage.ref(aadhaarfrontPath);
    const aadhaarfronttask = this.storage.upload(aadhaarfrontPath, this.adhar_frontFile);
    aadhaarfronttask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = aadhaarfrontRef.getDownloadURL();
          this.downloadURL.subscribe(aadhaarfronturl => {
            if (aadhaarfronturl) {
              this.adhar_frontUrl = aadhaarfronturl;
              localStorage.setItem("aadhaarfrontdocumenturl", JSON.stringify(this.adhar_frontUrl));
            }
          });
        })
      )
      .subscribe(aadhaarfronturl => {
        if (aadhaarfronturl) {
        }
      }), (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status);
      };
    if (this.aadharbackFile_type == "image") {
      var aadharback = "aadhaarbackdocument.jpg";
    } else {
      var aadharback = "aadhaarbackdocument.pdf";
    }
    const aadharbackPath = `fablo_business/merchant/${this.registertoken}/${aadharback}`;
    const aadharbackRef = this.storage.ref(aadharbackPath);
    const aadharbacktask = this.storage.upload(aadharbackPath, this.adhar_backFile);
    aadharbacktask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = aadharbackRef.getDownloadURL();
          this.downloadURL.subscribe(aadharbackurl => {
            if (aadharbackurl) {
              this.adhar_backUrl = aadharbackurl;
              localStorage.setItem("aadharbackdocumenturl", JSON.stringify(this.adhar_backUrl));
            }
          });
        })
      )
      .subscribe(aadharbackurl => {
        
      }), (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status);
      };
    this.businessSessionData = JSON.parse(localStorage.getItem('businessData'));
    let kycData: kyc = {
      "token": this.businessSessionData.token,
      "aadhar_number": this.kycDetails.value["aadhar_number"],
      "aadhar_front": {
        "file": JSON.parse(localStorage.getItem('aadhaarfrontdocumenturl')),
        "file_type": this.aadharfrontFileType
      },
      "aadhar_back": {
        "file": JSON.parse(localStorage.getItem('aadharbackdocumenturl')),
        "file_type": this.aadharbackFile_type
      },
      "app_version": environment.app_version
    };
    this.ragister.kycDetails(kycData).subscribe((resultData) => {
      this.result = resultData;
      if (this.result["status"] == true) {
        this.message = this.result["message"];
        this.toastr.showSuccess(this.message, "Done")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (this.result["status"] == false) {
        this.message = this.result["message"];
        this.toastr.showError(this.message, this.result["status"]);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
      (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status);
      })
  }

  addCommission() {
    this.businessSessionData = JSON.parse(localStorage.getItem('businessData'));
    let commissionData: commission = {
      "token": this.businessSessionData.token,
      "commission": {
        "rate": this.commissionDetails.value["rate"]
      },
      "app_version": environment.app_version
    };
    this.ragister.commissionDetails(commissionData).subscribe((resultData) => {
      this.result = resultData;
      if (this.result["status"] == true) {
        this.message = this.result["message"];
        this.toastr.showSuccess(this.message, "Done");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (this.result["status"] == false) {
        this.message = this.result["message"];
        this.toastr.showError(this.message, this.result["status"]);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
      (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status);
      })
  }

  addESign() {

  }

}
