import { CoreMenu } from '@core/types';

export const menu: CoreMenu[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'Dashboard',
    type: 'item',
    icon: 'home',
    url: 'dashboard'
  },
  {
    id: 'businessregister',
    title: 'Business Registration',
    translate: 'Business Registration',
    type: 'item',
    icon: 'list',
    url: 'businessregister'
  },
  {
    id: 'parcel',
    title: 'parcel',
    translate: 'Parcel',
    type: 'collapsible',
    icon: 'file-text',
    children: [
      {
        id: 'order',
        title: 'order',
        translate: 'Order',
        type: 'collapsible',
        icon: 'circle',
        children: [
          {
            id: 'drafts',
            title: 'Drafts',
            translate: 'Drafts',
            type: 'item',
            url: 'parcel/order/drafts',
          },
          {
            id: 'pending_order',
            title: 'Processing Order',
            translate: 'Processing Order',
            type: 'item',
            url: 'parcel/order/pending_order',
          },
          {
            id: 'partnerassign_order',
            title: 'Partner Assigned Order',
            translate: 'Partner Assigned Order',
            type: 'item',
            url: 'parcel/order/partnerassign_order',
          },
          {
            id: 'outforpickuporder',
            title: 'Out For Pickup Order',
            translate: 'Out For Pickup Order',
            type: 'item',
            url: 'parcel/order/outforpickuporder',
          },
          {
            id: 'reachedpickuporder',
            title: 'Reached Pickup Order',
            translate: 'Reached Pickup Order',
            type: 'item',
            url: 'parcel/order/reachedpickuporder',
          },
          {
            id: 'pickeduporder',
            title: 'Order Picked Up',
            translate: 'Order Picked Up',
            type: 'item',
            url: 'parcel/order/pickeduporder',
          },
          {
            id: 'outfordelivery',
            title: 'Out For Delivery',
            translate: 'Out For Delivery',
            type: 'item',
            url: 'parcel/order/outfordelivery',
          },
          {
            id: 'reacheddelivery',
            title: 'Reached Delivery',
            translate: 'Reached Delivery',
            type: 'item',
            url: 'parcel/order/reacheddelivery',
          },
          {
            id: 'rejected_order',
            title: 'Rejected Order',
            translate: 'Rejected Order',
            type: 'item',
            url: 'parcel/order/rejected_order',
          },
          {
            id: 'delivered_order',
            title: 'Delivered Order',
            translate: 'Delivered Order',
            type: 'item',
            url: 'parcel/order/delivered_order',
          },
        ]
      }
    ]
  },
  {
    id: 'delivery_partner',
    title: 'delivery_partner',
    translate: 'Delivery Partner',
    type: 'collapsible',
    icon: 'file-text',
    children: [
      {
        id: 'verification',
        title: 'Verification',
        translate: 'Verification',
        type: 'collapsible',
        icon: 'circle',
        children: [
          {
            id: 'pending_verification',
            title: 'Pending Verification',
            translate: 'Pending Verification',
            type: 'item',
            url: 'delivery_partner/pending_verification',
          },
        ]
      },
      {
        id: 'ragistration',
        title: 'Ragistration',
        translate: 'Ragistration',
        type: 'collapsible',
        icon: 'circle',
        children: [
          {
            id: 'leads',
            title: 'Leads',
            translate: 'Leads',
            type: 'item',
            url: 'delivery_partner/register/leads',
          },
        ]
      }
    ]
  },


]
