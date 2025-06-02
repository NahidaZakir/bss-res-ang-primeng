import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OrderService } from '../services/order.service';
import { allOrders, allOrdersRespBody } from '../model/order.model';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-orders',
  imports: [ButtonModule, CardModule,FormsModule, Select],
  providers: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrderService) {}
  allorders: allOrders[] = [];
  showStatusOption: boolean = false;
  cities: City[] | undefined;

  selectedCity: City | undefined;

 
  ngOnInit() {
    this.orderService.getRequiredOrder(1, 10).subscribe((res: any) => {
      this.allorders = res.data;
      console.log(this.allorders);
    });
     this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  onEditStatus(value:string) {
    this.showStatusOption = true;
  }
}
