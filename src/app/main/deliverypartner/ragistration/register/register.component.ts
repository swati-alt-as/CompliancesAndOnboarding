import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CoreTranslationService } from '@core/services/translation.service';
import { NgxSpinnerService } from "ngx-spinner";
import Stepper from 'bs-stepper';

import { locale as en } from '../../../../main/sample/i18n/en';
import { BusinessragistrationService } from '../../../../services/business/registration/businessragistration.service';
import { DeliveryserviceService } from '../../../../services/deliverypartner/deliveryservice.service';
import { ToastrserviceService } from '../../../../services/notification/toastrservice.service';
import { LocationService } from '../../../../services/location/location.service';
import { CommonService } from '../../../../services/admin/common.service';
import { environment } from '../../../../../environments/environment';

//modal
import { Observable } from "rxjs";

// firebase
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize } from "rxjs/operators";

interface BasicDetails {
  name: string,
  address: string,
  gender: string,
  dob: string,
  phone: number,
  token: string,
  blood_group: string,
  app_version: string,

  city_id: string,
  city_name: string,
  country_id: string,
  country_name: string,
  state_id: string,
  state_name: string,
}

interface KycDetails {
  token: string,
  pancard: {
    image: string,
  },
  photo: string,
  bankProof: string,
  aadharcard: {
    front_image: string,
    back_image: string,
  },
  app_version: string
}

interface BankDetails {
  token: string,
  IFSCcode: string,
  bankName: string,
  accountNumber: string,
  bankBeneficiaryName: string,
  bankBeneficiaryId: string,
  bankContactId: string,
  app_version: string,
}

interface WithVehicleDetails {
  token: string,
  vehicle_type: string,
  LicenseImage: string,
  InsuranceImage: string,
  InsuranceNumber: string,
  VehicleName: string,
  VehicleNumber: string,
  app_version: string,
}

interface WithoutVehicleDetails {
  token: string,
  vehicle_type: string,
  app_version: string,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public contentHeader: object;
  private modernWizardStepper: Stepper;
  private bsStepper;

  basicDetails!: FormGroup;
  kycDetails!: FormGroup;
  bankDetails!: FormGroup;
  vehicleDetails!: FormGroup;
  termsDetails!: FormGroup;

  basic_step = false;
  kyc_step = false;
  bank_step = false;
  vehicle_step = false;
  terms_step = false;

  bankFileType: string;
  selfieFileType: string;
  pancardFileType: string;
  aadharfrontFileType: string;
  aadharbackFile_type: string;
  licenceFileType: string;
  insuranceFileType: string;

  bankFile: any;
  pancardFile: any;
  selfieFile: any;
  licenceFile: any;
  insuranceFile: any;
  adhar_frontFile: any;
  adhar_backFile: any;

  downloadURL: Observable<string>;
  bankUrl: any;
  pancardUrl: any;
  selfieUrl: any;
  licenceUrl: any;
  insuranceUrl: any;
  adhar_frontUrl: any;
  adhar_backUrl: any;

  countries: any = [];
  states: any = [];
  cityList: any = [];
  bloodgroupList: any = [];
  message: string;
  result: any = [];

  partnerDetails: any = [];
  getStatus: any = [];
  registertoken: string = "";
  phonenumber: string = "";
  bankname: any;
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];
  data: string;

  // details
  basicDetail: any = [];
  kycDetail: any = [];
  bankDetail: any = [];
  vehicleDetail: any = [];
  
  constructor(private formBuilder: FormBuilder, private delivery: DeliveryserviceService, private ragister: BusinessragistrationService, private storage: AngularFireStorage, private location: LocationService, private common: CommonService, private router: ActivatedRoute, private _coreTranslationService: CoreTranslationService, private spinnerService: NgxSpinnerService, private toastr: ToastrserviceService) {
    this._coreTranslationService.translate(en)
  }

  ngOnInit(): void {

    this.modernWizardStepper = new Stepper(document.querySelector('#stepper3'), {
      linear: false,
      animation: true
    });

    this.bsStepper = document.querySelectorAll('.bs-stepper');

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
            name: 'Delivery Partner Registration',
            isLink: false
          }
        ]
      }
    }

    this.registertoken = this.router.snapshot.params.token;
    this.phonenumber = this.router.snapshot.params.phone;
    if (this.registertoken) {
      this.delivery.checkRegistrationStatusByToken(this.registertoken).subscribe((result) => {
        if (result["items"].length !== 0) {
          this.getStatus = result["items"];
          // console.log(this.getStatus)
        }
      })
      this.delivery.basicDetailsByToken(this.registertoken).subscribe((result) => {
        if (result["items"].length !== 0) {
          this.basicDetail = result["items"];
        }
      })
      this.delivery.kycByToken(this.registertoken).subscribe((result) => {
        if (result["items"].length !== 0) {
          this.kycDetail = result["items"];
        }
      })
      this.delivery.bankDetailsByToken(this.registertoken).subscribe((result) => {
        if (result["items"].length !== 0) {
          this.bankDetail = result["items"];
        }
      })
      this.delivery.vehicleDetailsByToken(this.registertoken).subscribe((result) => {
        if (result["items"].length !== 0) {
          this.vehicleDetail = result["items"];
        }
      })
    } else {
      this.getStatus.BasicDetailsStatus = 0;
    }

    this.location.activeCountriesList().subscribe((result) => {
      if (result["items"].length !== 0) {
        this.countries = result["items"];
      }
    })

    this.common.bloodgroup().subscribe((result) => {
      if (result["items"].length !== 0) {
        this.bloodgroupList = result["items"];
      }
    })

    this.basicDetails = this.formBuilder.group({
      blood_group: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.kycDetails = this.formBuilder.group({
      pancard: ['', Validators.required],
      photo: ['', Validators.required],
      bankProof: ['', Validators.required],
      aadharcardfront: ['', Validators.required],
      aadharcardback: ['', Validators.required],
    });

    this.bankDetails = this.formBuilder.group({
      IFSCcode: ['', Validators.required],
      bankName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      bankBeneficiaryName: ['', Validators.required],
      bankContactId: ['', Validators.required],
    });

    this.vehicleDetails = this.formBuilder.group({
      vehicle_type: ['', Validators.required],
      VehicleName: [''],
      VehicleNumber: [''],
      InsuranceNumber: [''],
      InsuranceImage: [''],
      LicenseImage: [''],
    });

    this.termsDetails = this.formBuilder.group({
      terms: ['', Validators.required],
      alert: ['', Validators.required],
    });
  }

  setRequired() {
    return [Validators.required];
  }

  get basic() { return this.basicDetails.controls; }
  get kyc() { return this.kycDetails.controls; }
  get bank() { return this.bankDetails.controls; }
  get vehicle() { return this.vehicleDetails.controls; }
  get terms() { return this.termsDetails.controls; }

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

  addbasicDetails() {
    var countryArray = this.basicDetails.value["country"].split("+++");
    var stateArray = this.basicDetails.value["state"].split("+++");
    var cityArray = this.basicDetails.value["city"].split("+++");
    var genderArray = this.basicDetails.value["gender"].split("+++");
    var bloodgroupArray = this.basicDetails.value["blood_group"].split("+++");
    let postData: BasicDetails = {
      "name": this.basicDetails.value["name"],
      "phone": this.basicDetails.value["phone"],
      "dob": this.basicDetails.value["dob"],
      "gender": genderArray[1],
      "blood_group": bloodgroupArray[1],
      "country_id": countryArray[0],
      "country_name": countryArray[1],
      "state_id": stateArray[0],
      "state_name": stateArray[1],
      "city_id": cityArray[0],
      "city_name": cityArray[1],
      "address": this.basicDetails.value["address"],
      "token": this.registertoken,
      "app_version": environment.app_version
    };
    this.delivery.basicDetails(postData).subscribe((resultData) => {
      this.result = resultData;
      if (this.result["status"] == true) {
        // localStorage.setItem("businessData", JSON.stringify(this.result["items"]));
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

  onPhotoFileChange(event: any) {
    this.selfieFile = event.target.files[0];
  }

  onBankFileChange(event: any) {
    this.bankFile = event.target.files[0];
  }

  onPancardFileChange(event: any) {
    this.pancardFile = event.target.files[0];
  }

  onAdharFrontFileChange(event: any) {
    this.adhar_frontFile = event.target.files[0];
  }

  onAdharBackFileChange(event: any) {
    this.adhar_backFile = event.target.files[0];
  }

  addkycDetails() {

    var n = "selfie.jpg";
    const selfiefilePath = `delivery/${this.registertoken}/${n}`;
    const selfiefileRef = this.storage.ref(selfiefilePath);
    const selfietask = this.storage.upload(selfiefilePath, this.selfieFile);
    selfietask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = selfiefileRef.getDownloadURL();
          this.downloadURL.subscribe(photourl => {
            if (photourl) {
              this.selfieUrl = photourl;
              localStorage.setItem("selfiedocumenturl", JSON.stringify(this.selfieUrl));
            }
          });
        })
      )
      .subscribe(photourl => {
        
      }), (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status)
        // console.log(error)
      };

    var bank = "bankdocument.jpg";
    const filePath = `delivery/${this.registertoken}/${bank}`;
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

    var aadhaarfront = "aadhaarfrontdocument.jpg";
    const aadhaarfrontPath = `delivery/${this.registertoken}/${aadhaarfront}`;
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
        
      }), (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status)
      };

    var aadharback = "aadhaarbackdocument.jpg";
    const aadharbackPath = `delivery/${this.registertoken}/${aadharback}`;
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
        this.toastr.showError(error.error.message, error.error.status)
      };

    var pan = "pandocument.jpg";
    const pancardPath = `delivery/${this.registertoken}/${pan}`;
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
        
      }), (error: HttpErrorResponse) => {
        this.toastr.showError(error.error.message, error.error.status)
      };
    let kycData: KycDetails = {
      "token": this.registertoken,
      "photo": JSON.parse(localStorage.getItem('selfiedocumenturl')),
      "bankProof": JSON.parse(localStorage.getItem('bankdocumenturl')),
      "aadharcard": {
        "front_image": JSON.parse(localStorage.getItem('aadhaarfrontdocumenturl')),
        "back_image": JSON.parse(localStorage.getItem('aadharbackdocumenturl'))
      },
      "pancard": {
        "image": JSON.parse(localStorage.getItem('pancarddocumenturl')),
      },
      "app_version": environment.app_version
    };
    this.delivery.kyc(kycData).subscribe((resultData) => {
      this.result = resultData;
      if (this.result["status"] == true) {
        this.message = this.result["message"];
        this.toastr.showSuccess(this.message, "Done")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (this.result["status"] == false) {
        this.message = this.result["message"];
        this.toastr.showError(this.message, this.result["status"])
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

  addbankDetails() {
    let postData: BankDetails = {
      "IFSCcode": this.bankDetails.value["IFSCcode"],
      "bankName": this.bankDetails.value["bankName"],
      "accountNumber": this.bankDetails.value["accountNumber"],
      "bankBeneficiaryName": this.bankDetails.value["bankBeneficiaryName"],
      "bankBeneficiaryId": this.bankDetails.value["accountNumber"],
      "bankContactId": this.bankDetails.value["bankContactId"],
      "token": this.registertoken,
      "app_version": environment.app_version
    };
    // console.log(postData)
    this.delivery.bankDetails(postData).subscribe((resultData) => {
      this.result = resultData;
      if (this.result["status"] == true) {
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

  onInsuranceFileChange(event: any) {
    this.insuranceFile = event.target.files[0];
  }

  onLicenseFileChange(event: any) {
    this.licenceFile = event.target.files[0];
  }

  haveVehicle(event) {
    // console.log(event.target.value);
    if (!(event.target.value == "None")) {
      this.vehicleDetails.controls.VehicleName.setValidators(this.setRequired());
      this.vehicleDetails.controls.VehicleNumber.setValidators(this.setRequired());
      this.vehicleDetails.controls.InsuranceNumber.setValidators(this.setRequired());
      this.vehicleDetails.controls.InsuranceImage.setValidators(this.setRequired());
      this.vehicleDetails.controls.LicenseImage.setValidators(this.setRequired());
    } else {
      this.vehicleDetails.controls.VehicleName.clearValidators();
      this.vehicleDetails.controls.VehicleNumber.clearValidators();
      this.vehicleDetails.controls.InsuranceNumber.clearValidators();
      this.vehicleDetails.controls.InsuranceImage.clearValidators();
      this.vehicleDetails.controls.LicenseImage.clearValidators();
    }
  }

  addvehicleDetails() {

    if (this.vehicleDetails.value["vehicle_type"] != "None") {
      var n = "insurance.jpg";
      const insurancefilePath = `delivery/${this.registertoken}/${n}`;
      const insurancefileRef = this.storage.ref(insurancefilePath);
      const insurancetask = this.storage.upload(insurancefilePath, this.insuranceFile);
      insurancetask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = insurancefileRef.getDownloadURL();
            this.downloadURL.subscribe(insuranceurl => {
              if (insuranceurl) {
                this.insuranceUrl = insuranceurl;
                localStorage.setItem("insurancedocumenturl", JSON.stringify(this.insuranceUrl));
              }
            });
          })
        )
        .subscribe(insuranceurl => {
         
        }), (error: HttpErrorResponse) => {
          this.toastr.showError(error.error.message, error.error.status)
          // console.log(error)
        };
  
      var licence = "licencedocument.jpg";
      const filePath = `delivery/${this.registertoken}/${licence}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.licenceFile);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(licenceurl => {
              if (licenceurl) {
                this.licenceUrl = licenceurl;
                localStorage.setItem("licencedocumenturl", JSON.stringify(this.licenceUrl));
              }
            });
          })
        )
        .subscribe(licenceurl => {
          
        }), (error: HttpErrorResponse) => {
          this.toastr.showError(error.error.message, error.error.status)
        };
  
      let postData: WithVehicleDetails = {
        "VehicleName": this.vehicleDetails.value["VehicleName"],
        "VehicleNumber": this.vehicleDetails.value["VehicleNumber"],
        "InsuranceNumber": this.vehicleDetails.value["InsuranceNumber"],
        "InsuranceImage": JSON.parse(localStorage.getItem('insurancedocumenturl')),
        "LicenseImage": JSON.parse(localStorage.getItem('licencedocumenturl')),
        "vehicle_type": this.vehicleDetails.value["vehicle_type"],
        "token": this.registertoken,
        "app_version": environment.app_version
      };
      this.delivery.vehicleDetails(postData).subscribe((resultData) => {
        this.result = resultData;
        if (this.result["status"] == true) {
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
    } else {
      let postData: WithoutVehicleDetails = {
        "vehicle_type": this.vehicleDetails.value["vehicle_type"],
        "token": this.registertoken,
        "app_version": environment.app_version
      };
      this.delivery.vehicleDetails(postData).subscribe((resultData) => {
        this.result = resultData;
        if (this.result["status"] == true) {
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
  }

  addtermsDetails(){
    // console.log(this.termsDetails.value);
    if((this.termsDetails.value["terms"])&&(this.termsDetails.value["alert"])){
      this.delivery.termCondition("",this.registertoken).subscribe((resultData) => {
        this.result = resultData;
        if (this.result["status"] == true) {
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
  }

}
