import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-payment-processor',
  templateUrl: './payment-processor.component.html',
  styleUrls: ['./payment-processor.component.scss'],
})
export class PaymentProcessorComponent implements OnInit {

  @Output() onDataAdd: EventEmitter<any> = new EventEmitter<any>;
  constructor() { }

  ngOnInit() {}

  addData() {
    this.onDataAdd.emit()
  }
}
