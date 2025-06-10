import { MenuModule } from 'primeng/menu';

import { Component, EventEmitter, inject, OnInit,Output,signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
      imports: [Menu, ToastModule,ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
      userEmail = signal('');
  userFullName = signal('');

  @Output() menuClicked  = new EventEmitter<boolean>();

  router = inject(Router);
   items: MenuItem[] | undefined;
  ngOnInit() {
      this.getUserInfo();
        this.items = [
            { label: 'Home', icon: 'pi pi-home red-icon', routerLink:['/admin']},
            { label: 'Employee', icon: 'pi pi-users red-icon', routerLink:['/employees'] },
            { label: 'Tables', icon: 'pi pi-list red-icon', routerLink:['/tables'] },
            { label: 'Foods', icon: 'pi pi-shop red-icon', routerLink:['/foods'] },
            { label: 'New Order', icon: 'pi pi-receipt red-icon', routerLink:['/order'] },
            { label: 'Orders', icon: 'pi pi-sort-amount-down red-icon', routerLink:['/orders'] },
        ];
    }

    onMenuClicked(){
      this.menuClicked.emit(false);
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

    onLogOut() {
    localStorage.removeItem('loginUserData');
    localStorage.removeItem('email');
    localStorage.removeItem('fullname');
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('refreshtokenexpiry');
    this.router.navigateByUrl('/login');
  }
}
