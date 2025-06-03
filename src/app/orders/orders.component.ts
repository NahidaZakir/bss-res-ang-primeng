import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OrderService } from '../services/order.service';
import { IftaLabelModule } from 'primeng/iftalabel';

import { SelectModule } from 'primeng/select';
import {
  allOrders,
  allOrdersRespBody,
  OrderStatusReqBody,
} from '../model/order.model';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
interface OrderStatus {
  name: string;
  code: number;
}

interface search {
  name: string;
  code: number;
}
@Component({
  selector: 'app-orders',
  imports: [
    ButtonModule,
    CardModule,
    FormsModule,
    SelectModule,
    IftaLabelModule,
  ],
  providers: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  searchType: search[] | undefined;

  selectedSearch: search | undefined;

  allorders: allOrders[] = [];

  allStatus: OrderStatus[] | undefined;

  selectedStatus: OrderStatus | undefined;
  selectedOrderId: string = '';
  setStatus: OrderStatusReqBody = new OrderStatusReqBody();
  orderID!: string;
  showStatusOption: boolean = false;
  showUpdated: boolean = false;
  showStatus: boolean = true;
  otherShow: boolean = true;
  showAllOrdersByDefault: boolean = true;
  searchedOrder: allOrders[] = [];
  ngOnInit() {
    this.searchType = [
      { name: 'All', code: 6 },
      { name: 'Pending', code: 0 },
      { name: 'Confirmed', code: 1 },
      { name: 'Preparing', code: 2 },
      { name: 'Prepared To Serve', code: 3 },
      { name: 'Served', code: 4 },
      { name: 'Paid', code: 5 },
    ];

    this.allStatus = [
      { name: 'Pending', code: 0 },
      { name: 'Confirmed', code: 1 },
      { name: 'Preparing', code: 2 },
      { name: 'Prepared To Serve', code: 3 },
      { name: 'Served', code: 4 },
      { name: 'Paid', code: 5 },
    ];
    this.getOrders();
  }
  getOrders() {
    this.orderService.getRequiredOrder(1, 10).subscribe((res: any) => {
      this.allorders = res.data;
    });
  }
  searchFor(event: any) {
    this.orderService
      .getSearchedResult(1, 10, event.value.code)
      .subscribe((res: any) => {
        this.searchedOrder = res.data;
        this.showAllOrdersByDefault = false;
      });
  }
  onEditStatus(value: string) {
    this.selectedOrderId = value;
    this.showStatusOption = true;
    this.orderID = value;
    this.showUpdated = false;
    this.showStatus = false;
  }
  setNewStatus(event: any, order: allOrders) {
    console.log(event);
    order.orderStatus = event.value.name;
    this.selectedOrderId = '';
    this.showStatusOption = false;
    this.showUpdated = true;
    this.setStatus.status = event.value.code;
    this.orderService
      .updateStatus(this.orderID, this.setStatus)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
  onDeleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe((res: any) => {
      console.log('deleted');
      this.getOrders();
    });
  }
}
