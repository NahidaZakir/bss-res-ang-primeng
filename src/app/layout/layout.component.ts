import { Component, inject, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { CartFoodService } from '../services/cartfood.service';

import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CartfoodComponent } from '../cartfood/cartfood.component';
@Component({
  selector: 'app-layout',
  imports: [
    DrawerModule,
    ButtonModule,
    SplitterModule,
    NavbarComponent,
    RouterOutlet,
    InputTextModule,
    CartfoodComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  menudrawerVisible: boolean = false;
  userEmail = signal('');
  userFullName = signal('');
  cartDrawervisible: boolean = false;
  show: boolean = true;
  foodCart = 0;
  constructor(private cartFoodService: CartFoodService) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.cartFoodService.numInCartObservable$.subscribe((res: any) => {
      this.foodCart = res;
    });
  }

  closeSidebar(event: any) {
    this.menudrawerVisible = false;
    console.log(event, 'closing side bar');
  }

  getUserInfo() {
    const a = localStorage.getItem('email');
    const b = localStorage.getItem('fullname');
    if (a && b) {
      const email = JSON.parse(a);
      const name = JSON.parse(b);
      this.userEmail.set(email);
      this.userFullName.set(name);
    }
  }

  position:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'center'
    | 'topleft'
    | 'topright'
    | 'bottomleft'
    | 'bottomright' = 'center';

  setCartVisible(value: boolean) {
    this.cartDrawervisible = value;
  }
  setMenuDrawerVisible(value: boolean) {
    this.menudrawerVisible = true;
  }
}
