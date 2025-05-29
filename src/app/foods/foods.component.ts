import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

import { FoodService } from '../services/food.service';
import { getFoodDatatable } from '../model/food.model';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-foods',
  imports: [
    FormsModule,
    TableModule,
    CommonModule,
    ButtonModule,
    AvatarModule,
    OverlayBadgeModule,
    SpinnerComponent
],
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css',
})
export class FoodsComponent implements OnInit {
  router = inject(Router);
  isLoading = false;
  allfood: getFoodDatatable[] = [];
  totalRecord:number=0;
  constructor(private foodService: FoodService) {}
  ngOnInit() {
    this.getAllFood();
  }

  getAllFood() {
    this.foodService.getFood().subscribe((res: any) => {
      console.log(res);
      this.isLoading=true;
      this.allfood = res.data;
    });
  }

  onNextPage(event: any) {
    console.log(event);
    const page = Math.floor(event.first / event.rows) + 1; // calculate page number (1-based)
    const perPage = event.rows;
    this.foodService
      .getRequiredFood(page, perPage)
      .subscribe((response: any) => {
        this.allfood = response.data;
        this.totalRecord = response.total;
      });
  }

  onAddFood() {
    console.log('here');
    this.router.navigateByUrl('/add-food');    
    
  }

  onEditFood(){

  }

  onDeleteFood(id:number){
    this.foodService.delFood(id).subscribe(
      (res:any)=>{
        this.getAllFood();
      }
    )

  }
}
