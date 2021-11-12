import { TestBed } from '@angular/core/testing';

import { DeliveryserviceService } from './deliveryservice.service';

describe('DeliveryserviceService', () => {
  let service: DeliveryserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
