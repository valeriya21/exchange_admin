import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Stock } from './stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  selectedStock: Stock;
  stocks: Stock[];
  readonly baseURL = 'http://localhost:3000/stocks';
  constructor(private http : HttpClient) { }

  postStock(stock: Stock) {
    return this.http.post(this.baseURL, stock);
  }

  getStocksList() {
    return this.http.get(this.baseURL);
  }

  putStock(stock: Stock) {
    return this.http.put(this.baseURL + `/${stock._id}`, stock);
  }

  deleteStock(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
