import { Component, OnInit, Input, } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

import { CoreTranslationService } from '@core/services/translation.service';
import { locale as en } from '../../../../main/sample/i18n/en';
import { OrderserviceService } from '../../../../services/parcel/order/orderservice.service';
import { OrdersService } from '../../../../services/parcel/admin/orders.service';
import { DeliveryService } from '../../../../services/parcel/admin/delivery.service';
import { ToastrserviceService } from '../../../../services/notification/toastrservice.service';

//mqtt
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

//push
import { PushNotificationsService } from 'ng-push';

//firestore
import { AngularFirestore } from "@angular/fire/compat/firestore";


interface cancleOrderData {
  ReasonForReject: string;
}

interface assignDeliveryPartner {
  deliveryPartnerId: string;
  name: string;
  image: string;
  contact: string;
}

@Component({
  selector: 'app-pendingorder',
  templateUrl: './pendingorder.component.html',
  styleUrls: ['./pendingorder.component.scss']
})
export class PendingorderComponent implements OnInit {

  public contentHeader: object;

  private subscription: any;

  lat = 22.719568;
  long = 75.8577;
  address = "Indore";
  googleMapType = 'satellite';
  display: any;
  hidden='none'; 
  // @ViewChild(MatSort) sort: MatSort;

  message: string;
  result: any = [];
  ObjData: any = {};
  partnerData = [];
  ordersList: any = [];
  reasonForRejectList: any = [];
  getPartnersList: any = [];
  getDetails: any = [];
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];
  data: string;
  oid: any;

  // delivery partner details

  partnerID: string;
  name: string;
  image: string;
  phone: number;
  gender: string;
  availability: boolean;
  OrderId: string;
  firebasedata!: any;

  @Input('show-modal') showModal: boolean;

  constructor(private orderService: OrderserviceService, private order: OrdersService, private delivery: DeliveryService, private _mqttService: MqttService, private _pushNotifications: PushNotificationsService, private modalService: NgbModal, private _coreTranslationService: CoreTranslationService, private spinnerService: NgxSpinnerService, private toastr: ToastrserviceService, private firestore: AngularFirestore) {
    this._coreTranslationService.translate(en)
  }

  ngOnInit(): void {

    this.contentHeader = {
      headerTitle: 'Parcel',
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
            name: 'Order',
            isLink: false
          }
        ]
      }
    }

    this.firestore.collection('live-pool', ref => ref.where('online', '==', true)).valueChanges({ idField: 'id' }).subscribe((data) => {
      this.partnerData = [];
      data.forEach((element: any) => {
        let partnersList = [
          {
            "latitude": element.current_location[1],
            "longitude": element.current_location[0],
            "icon": "/assets/images/deliverymarker.png",
            "name": element.name,
            "phone": element.phone,
            "on_delivery": element.on_delivery,
            "image": element.image,
            "id": element.id,
          },
        ];
        if (element.drop_location[0] != 0 && element.drop_location[1] != 0) {
          partnersList[1].latitude = element.drop_location[1];
          partnersList[1].longitude = element.drop_location[0];
          partnersList[1].icon = "/assets/images/greenmap-pin-48.png";
        }

        this.partnerData.push(partnersList);
      });
    });

    this.subscription = this._mqttService.observe("NewOrderArrived").subscribe((message: IMqttMessage) => {
      if (message.payload.toString()) {
        let newOrder = JSON.parse(message.payload.toString());
        this.toastr.showSuccess(newOrder.message, newOrder.title);
        var audio = new Audio('../../../../../assets/ting.mp3');
        audio.play();
        this.notify(newOrder.title, newOrder.message);
      }
    });

    this.spinnerService.show();
    this.orderService.getOrdersByType('processing').subscribe((result) => {
      this.spinnerService.hide();
      if (result["items"].length !== 0) {
        this.ordersList = result["items"];
        this.count = result["items"].length;
      }
    })

    this.spinnerService.show();
    this.order.reasonForReject().subscribe((result) => {
      this.spinnerService.hide();
      if (result["items"].length !== 0) {
        this.reasonForRejectList = result["items"];
      }
    })

    this.spinnerService.show();
    this.delivery.getPartners().subscribe((result) => {
      this.spinnerService.hide();
      if (result["items"].length !== 0) {
        this.getPartnersList = result["items"];
      }
    })

  }


  // modal Open Success
  getOrderDetails(modalSuccess: any, ORDERID: any) {
    this.spinnerService.show();
    this.orderService.getDetails(ORDERID).subscribe((res) => {
      this.spinnerService.hide();
      if (res["status"] == true && (res["items"].length !== 0)) {
        this.message = res["message"];
        this.getDetails = res["items"];
        this.modalService.open(modalSuccess, {
          centered: true,
          size: 'lg',
          scrollable: true,
          windowClass: 'modal modal-success'
        });
      } else if (res["status"] == false) {
        this.message = res["message"];
        this.toastr.showError(this.message, "Error!");
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        this.toastr.showError("Something Went Wrong", "Error!");
      }
    },
      (error: HttpErrorResponse) => {
        this.toastr.showInfo(error.error.message, "Information!");
      })
  }

  cancleModal(cancelModalOpen: any, ORDERID: any) {
    this.oid = ORDERID;
    this.modalService.open(cancelModalOpen, {
      centered: true,
      size: 'lg',
      scrollable: true,
      windowClass: 'modal modal-danger'
    });
  }

  cancleOrder(data: any) {
    let postData: cancleOrderData = {
      "ReasonForReject": data.message
    }
    this.spinnerService.show();
    this.orderService.cancelOrder(data.oid, postData).subscribe((res) => {
      this.spinnerService.hide();
      if (res["status"] == true) {
        this.message = res["message"];
        this.toastr.showSuccess(this.message, "Done!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else if (res["status"] == false) {
        this.message = res["message"];
        this.toastr.showError(this.message, "Error!");
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        this.toastr.showError("Something Went Wrong", "Error!");
      }
    },
      (error: HttpErrorResponse) => {
        this.toastr.showInfo(error.error.message, "Information!");
      })
  }

  assignModal(assignModalOpen: any, data: any) {
    this.oid = data.oid;
    this.lat = data.lat;
    this.long = data.long;
    this.modalService.open(assignModalOpen, {
      centered: true,
      size: 'xl',
      scrollable: true,
      windowClass: 'modal modal-success'
    });
  }

  timerModal(timerModalOpen: any) {
    this.hidden = 'block'; 
    this.modalService.open(timerModalOpen, {
      centered: true,
      windowClass: 'modal modal-warning'
    });
  }

  assignDeliveryPartner(data: any) {
    let assignData: assignDeliveryPartner = {
      "deliveryPartnerId": data.partnerID,
      "name": data.name,
      "contact": data.phone,
      "image": data.image
    }
    this.spinnerService.show();
    this.orderService.assignDeliveryPartner(data.OrderId, assignData).subscribe((res) => {
      this.spinnerService.hide();
      if (res["status"] == true) {
        this.message = res["message"];
        this.toastr.showSuccess(this.message, "Done!")
        this.subscription = this._mqttService.observe("OrderPartnerResponse").subscribe((message: IMqttMessage) => {
          if (message.payload.toString()) {
            let response = JSON.parse(message.payload.toString());
            if (response.code == "OrderRejected") {
              this.toastr.showError(response.message, response.title)
              setTimeout(() => {
                window.location.reload();
              }, 1000);
              this.hidden = 'none';
            }
            if (response.code == "OrderAccepted") {
              this.toastr.showSuccess(response.message, response.title)
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
            var audio = new Audio('../../../../../assets/ting.mp3');
            audio.play();
            this.notify(response.title, response.message);
          }
        });
        this.timer(1);
      } else if (res["status"] == false) {
        this.message = res["message"];
        this.toastr.showError(this.message, "Error!")
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        this.toastr.showError("Something Went Wrong", "Error!")
      }
    },
      (error: HttpErrorResponse) => {
        this.toastr.showInfo(error.error.message, "Information!")
      })
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.ngOnInit();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.ngOnInit();
  }

  show(data: any) {
    this.showModal = true;
    this.name = data.name;
    this.phone = data.phone;
    // this.image = data.image;
    this.image = "image";
    this.availability = data.on_delivery;
    this.partnerID = data.partnerID;
    this.OrderId = data.OrderId;

  }

  hide() {
    this.showModal = false;
  }

  notify(title: any, message: any) {
    //our function to be called on click
    let options = { //set options
      body: message,
      icon: "../../../../../assets/images/logo/fablologo.png", //adding an icon
    }
    this._pushNotifications.create(title, options).subscribe();
  }

  timer(minute: any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        clearInterval(timer);
        this.hidden = 'none'; 
      }
    }, 1000);
  }
}
