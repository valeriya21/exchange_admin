import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Broker } from './broker.model';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {
  selectedBroker: Broker;
  brokers: Broker[];
  readonly baseURL = 'http://localhost:3000/brokers';

  constructor(private http : HttpClient) { }

  postBroker(broker: Broker) {
    return this.http.post(this.baseURL, broker);
  }

  getBrokerList() {
    return this.http.get(this.baseURL);
  }

  putBroker(broker: Broker) {
    return this.http.put(this.baseURL + `/${broker._id}`, broker);
  }

  deleteBroker(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
