import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderReqBody, OrderStatusReqBody } from '../model/order.model';

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
  updateStatus(id:string, status:OrderStatusReqBody ){
    return this.http.put(`https://restaurantapi.bssoln.com/api/Order/update-status/${id}`, status);
  }
  getSearchedResult( pageNumber: number, perPageNumber: number, searchID:number){
    if(searchID === 6){
       return this.http.get(`https://restaurantapi.bssoln.com/api/Order/datatable?sort=&page=${pageNumber}&per_page=${perPageNumber}&Search=`);
    }else{
    return this.http.get(`https://restaurantapi.bssoln.com/api/Order/datatable?sort=&page=${pageNumber}&per_page=${perPageNumber}&Search=${searchID}`);

    }
  }

  deleteOrder(id:string){
    return this.http.delete(`https://restaurantapi.bssoln.com/api/Order/delete/${id}`);
  }
}
