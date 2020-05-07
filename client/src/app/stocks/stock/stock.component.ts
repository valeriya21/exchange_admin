import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Stock } from '../shared/stock.model';
import { StockService } from '../shared/stock.service';

declare var M : any;

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [StockService]
})
export class StockComponent implements OnInit {

  constructor(private stockService : StockService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshStockList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.stockService.selectedStock = {
      _id: "",
      name: "",
      distribution_law: "",
      start_price: null
    }
  }

  refreshStockList() {
    this.stockService.getStocksList().subscribe((res) => {
      this.stockService.stocks = res as Stock[];
    });
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.stockService.postStock(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshStockList();
        M.toast({ html: 'Added successfully'});
      });
    }
    else {
      this.stockService.putStock(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshStockList();
        M.toast({ html: 'Updated successfully'});
      });
    }
  }

  onEdit(stock: Stock) {
    this.stockService.selectedStock = stock;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.stockService.deleteStock(_id).subscribe((res) => {
        this.refreshStockList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully'});
      });
    }
  }



}
