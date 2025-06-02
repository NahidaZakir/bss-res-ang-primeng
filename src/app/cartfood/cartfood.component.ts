import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartFoodService } from '../services/cartfood.service';
import { showAllFood } from '../model/food.model';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Item, OrderReqBody } from '../model/order.model';
import { OrderService } from '../services/order.service';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cartfood',
  imports: [
    OverlayBadgeModule,
    ScrollPanelModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    ConfirmDialog,
    ToastModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './cartfood.component.html',
  styleUrl: './cartfood.component.css',
  providers: [ConfirmationService, MessageService],
})
export class CartfoodComponent implements OnInit {
  isAnythingAdded: boolean = false;
  cartItems: number = 0;
  cartFoodItems: showAllFood[] = [];
  cartFood: showAllFood[] = [];
  showNewPrice: boolean = false;
  showNewFoodPrice: number = 0;
  onIncrement: number = 1;
  subTotal = 0;
  visible: boolean = false;


  constructor(
    private cartFoodService: CartFoodService,
    private orderService: OrderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  newOrder: OrderReqBody = new OrderReqBody();
  // allFoodsArray: Item[] = [];

  // ordersArray: OrderReqBody = new OrderReqBody();

  // foodItem: Item = new Item();
  foodArray: Item[] = [];

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
      let x = this.cartFoodService.calcSubtotal();
      this.subTotal = this.cartFoodService.getSubtotal();
      console.log('getcartfood total', this.subTotal);
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

  confirm() {
    this.confirmationService.confirm({
      message: 'Order has been placed successfully',
      icon: 'pi pi-check-circle',
      closable:false,
      rejectVisible: false, // Hides the "No" button
      acceptLabel: 'OK',
      acceptButtonStyleClass: 'okaybtn',
      accept: () => {},
    });

    const now = new Date();
    const utcTime = new Date(now.getTime() - 6 * 60 * 60 * 1000);
    const utcTimeString = utcTime.toISOString();

    for (let i = 0; i < this.cartFoodItems.length; i++) {
      let food = this.cartFoodItems[i];
      if (food.count && food.countPrice) {
        let x = new Item(food.id, food.count, food.price, food.countPrice);
        this.foodArray = [...this.foodArray, x];
      }
    }

    this.newOrder.tableId = this.cartFoodService.getTableID();
    this.newOrder.orderNumber = utcTimeString;
    this.newOrder.amount = this.cartFoodService.getSubtotal();
    this.newOrder.items = this.foodArray;
    this.orderService.createOrder(this.newOrder).subscribe((res: any) => {});
  }
}
