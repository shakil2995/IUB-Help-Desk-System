import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class SharedDataService {
  token  = localStorage.getItem('token');
  user_name = localStorage.getItem('user_name')
  payload = {token : this.token,user_name : this.user_name };
  private initDelivery = new BehaviorSubject(this.payload);
  DeliveryData = this.initDelivery.asObservable();

  constructor() { }

  supplyData(data:any) {
    this.initDelivery.next(data);
  }
}
