import { Injectable, OnInit, signal } from '@angular/core';
import { BehaviorSubject, OperatorFunction } from 'rxjs';
import { getAllEmployees } from '../model/employee.model';
import { TableInfoService } from './tablesinfo.service';
import { showAllFood } from '../model/food.model';

@Injectable({
  providedIn: 'root',
})
export class CartFoodService {
  private foods: showAllFood[] = [];
  private numInCart = new BehaviorSubject<number>(0);
  private inCart = new BehaviorSubject<showAllFood[]>([]);

  numInCartObservable$ = this.numInCart.asObservable();

  setCartInfo(addfood: showAllFood) {
      addfood.count = 1;
      addfood.countPrice = addfood.price;
      this.foods = [...this.getCart(), addfood];
      this.update(this.foods);
  }

  onIncrement(id: number, count: number, price: number) {
    let i = this.getCart().findIndex((food) => food.id === id);
    this.foods = this.getCart();
    this.foods[i].count = count + 1;
    this.foods[i].countPrice = price * (count + 1);
    this.update(this.foods);
  }

  onDecrement(id: number, count: number, price: number) {
    let i = this.getCart().findIndex((food) => food.id === id);
    this.foods = this.getCart();
    this.foods[i].count = count - 1;
    this.foods[i].countPrice = price * (count - 1);
    this.update(this.foods);
  }

  onRemovedFoodFromCart(id: number) {
    this.inCart.next(this.getCart().filter((item) => item.id !== id));
    this.numInCart.next(this.getCart().length);
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

  checkFoodExists(id: number) {
    let index = this.getCart().findIndex((item) => item.id !== id);
    if (index >= 0) {
      return;
    }
  }
  constructor() {}
}
