
import { Component, signal} from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-layout',
      imports: [DrawerModule, ButtonModule, SplitterModule, NavbarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
 

    visible: boolean = false;

      userEmail = signal('');
  userFullName = signal('');

  ngOnInit(): void {
    this.getUserInfo();
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
}

