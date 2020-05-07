import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BrokerService } from '../shared/broker.service';
import { Broker } from '../shared/broker.model';

declare var M : any;

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.css'],
  providers: [BrokerService]
})
export class BrokerComponent implements OnInit {

  constructor(private brokerService : BrokerService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshBrokerList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.brokerService.selectedBroker = {
      _id: "",
      first_name: "",
      last_name: "",
      balance: null
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.brokerService.postBroker(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshBrokerList();
        M.toast({ html: 'Added successfully'});
      });
    }
    else {
      this.brokerService.putBroker(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshBrokerList();
        M.toast({ html: 'Updated successfully'});
      });
    }
  }

  refreshBrokerList() {
    this.brokerService.getBrokerList().subscribe((res) => {
      this.brokerService.brokers = res as Broker[];
    });
  }

  onEdit(broker: Broker) {
    this.brokerService.selectedBroker = broker;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.brokerService.deleteBroker(_id).subscribe((res) => {
        this.refreshBrokerList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully'});
      });
    }
  }

}
