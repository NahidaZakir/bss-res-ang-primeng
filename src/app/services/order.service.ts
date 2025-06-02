import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderReqBody } from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  getAllOrders() {
    return this.http.get(
      'https://restaurantapi.bssoln.com/api/Order/datatable'
    );
  }

  createOrder(order: OrderReqBody) {
    return this.http.post(
      'https://restaurantapi.bssoln.com/api/order/create',
      order
    );
  }
  getRequiredOrder(pageNumber: number, perPageNumber: number) {
    return this.http.get(
      `https://restaurantapi.bssoln.com/api/Order/datatable?page=${pageNumber}&per_page=${perPageNumber}`
    );
  }
}
