import { Injectable, OnInit, signal } from '@angular/core';
import { BehaviorSubject, OperatorFunction } from 'rxjs';
import { getAllEmployees } from '../model/employee.model';
import { TableInfoService } from './tablesinfo.service';
import { showAllFood } from '../model/food.model';
import { cartFood } from '../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartFoodService {
  private foods: showAllFood[] = [];
  total: number = 0;
  private numInCart = new BehaviorSubject<number>(0);
  private subTotal = new BehaviorSubject<number>(0);
  private tableID = new BehaviorSubject<number>(0);
  private inCart = new BehaviorSubject<showAllFood[]>([]);

  numInCartObservable$ = this.numInCart.asObservable();
  tableIDObservable$ = this.tableID.asObservable();

  getSubtotal() {
    return this.subTotal.getValue();
  }
  calcSubtotal() {
    this.foods = this.getCart();
    this.total = 0;
    for (let i = 0; i < this.foods.length; i++) {
      let x = this.foods[i].countPrice;
      if (x) {
        this.total = this.total + x;
        console.log('total ++ ', i, this.total);
      }
    }
    this.subTotal.next(this.total);
  }

  setCartInfo(addfood: showAllFood) {
    addfood.count = 1;
    addfood.countPrice = addfood.price;
    this.foods = [...this.getCart(), addfood];
    this.update(this.foods);
    // this.calcSubtotal();
  }

  onIncrement(id: number, count: number, price: number) {
    let i = this.getCart().findIndex((food) => food.id === id);
    this.foods = this.getCart();
    this.foods[i].count = count + 1;
    this.foods[i].countPrice = price * (count + 1);
    this.update(this.foods);
    // this.calcSubtotal();
  }

  onDecrement(id: number, count: number, price: number) {
    let i = this.getCart().findIndex((food) => food.id === id);
    this.foods = this.getCart();
    this.foods[i].count = count - 1;
    this.foods[i].countPrice = price * (count - 1);
    this.update(this.foods);
    // this.calcSubtotal();
  }

  onRemovedFoodFromCart(id: number) {
    this.inCart.next(this.getCart().filter((item) => item.id !== id));
    this.numInCart.next(this.getCart().length);
    // this.calcSubtotal();
  }

  getCart() {
    return this.inCart.getValue();
  }

  getItems() {
    return this.numInCart.getValue();
  }
  update(value: showAllFood[]) {
    this.inCart.next(value);
    this.numInCart.next(value.length);
  }

  setTableID(id: number) {
    this.tableID.next(id);
    console.log('inside set', this.tableID.getValue());
  }
  getTableID(): number {
    console.log('inside get', this.tableID.getValue());

    return this.tableID.getValue();
  }
  reset(){
    this.inCart.next([]);
    this.numInCart.next(0);
  }
  constructor() {}
}
