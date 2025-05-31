import { Component, OnInit } from '@angular/core';
import { CartFoodService } from '../services/cartfood.service';
import { showAllFood } from '../model/food.model';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
@Component({
  selector: 'app-cartfood',
  imports: [AvatarModule, OverlayBadgeModule],
  templateUrl: './cartfood.component.html',
  styleUrl: './cartfood.component.css',
})
export class CartfoodComponent implements OnInit {
  isAnythingAdded: boolean = false;
  cartItems: number = 0;
  cartFoodItems: showAllFood[] = [];
  cartFood: showAllFood[] = [];
  showNewPrice: boolean = false;
  showNewFoodPrice: number = 0;
  onIncrement: number = 1;

  constructor(private cartFoodService: CartFoodService) {}

  ngOnInit() {
    this.getCartFood();
  }
  
  getCartFood() {
    this.cartFoodService.numInCartObservable$.subscribe((res: any) => {
      this.cartFoodItems = this.cartFoodService.getCart();
      this.cartItems = res;
      if (this.cartItems > 0) {
        this.isAnythingAdded = true;
      } else {
        this.isAnythingAdded = false;
      }
    });
  }

  incCount(id: number, count: number | undefined, price: number) {
    if (count) {
      this.showNewPrice = true;
      this.cartFoodItems = this.cartFoodService.getCart();
      this.cartFoodService.onIncrement(id, count, price);
    }
  }

  decCount(id: number, count: number | undefined, price: number) {
    if (count && count >= 2) {
      this.showNewPrice = true;
      this.cartFoodItems = this.cartFoodService.getCart();
      this.cartFoodService.onDecrement(id, count, price);
    }
  }

  onDelete(id: number) {
    this.cartFoodService.onRemovedFoodFromCart(id);
    this.cartFoodItems = this.cartFoodService.getCart();
    console.log('onDelete', this.cartFoodItems);
  }
}
