import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  initial_payload={transfer : false,data:{}}
  private initDelivery = new BehaviorSubject({});
  DeliveryData = this.initDelivery.asObservable();
  constructor() { }
  supplyData(data:any) {
    this.initDelivery.next(data);
  }
}
