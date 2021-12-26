import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitService {
  Afterlogin = new EventEmitter();
  DashboardDatashow = new EventEmitter()
  constructor() { }
}
