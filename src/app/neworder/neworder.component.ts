import { Component, OnInit, output, Output } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';
import { TableInfoService } from '../services/tablesinfo.service';
import { showAllTable } from '../model/table.model';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { FoodService } from '../services/food.service';
import { getFoodDatatable, showAllFood } from '../model/food.model';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

import { Ripple } from 'primeng/ripple';
import { CartFoodService } from '../services/cartfood.service';
import { SpinnerComponent } from '../spinner/spinner.component';
interface LazyEvent {
  first: number;
  last: number;
}

@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrl: './neworder.component.css',
  imports: [
    ScrollerModule,
    AvatarModule,
    OverlayBadgeModule,
    FormsModule,
    InputTextModule,
    IftaLabelModule,
    CardModule,
    ButtonModule,
    Toast,
    ButtonModule,
    Ripple,
    SpinnerComponent,
  ],
  providers: [MessageService],
})
export class NeworderComponent implements OnInit {
  searchFoodName!: string;
  searchedFoodList: showAllFood[] = [];
  tables: showAllTable[] = [];
  foods: showAllFood[] = [];
  isloading: boolean = false;
  lazyLoadingTable: boolean = false;
  lastFirstIndexTable: number | null = null;

  lazyLoadingFood: boolean = false;
  lastFirstIndexFood: number | null = null;
  totalFoodNum = 0;

  currentTablePage = 1;
  currentFoodPage = 1;
  dataPerPage = 10;
  totalTablepages = 0;
  showTotalTable: number = 0;
  showTotalFood: number = 0;
  totalFoodPages = 0;
  showSearchedFood: boolean = false;
  isTableSelected: boolean = false;
  startIndexFood = 0;
  foodAddedinCart: number = 0;
  foodNum = output<number>();

  initialTableLoadDone: boolean = false;
  initialFoodLoadDone: boolean = false;
  constructor(
    private tablesService: TableInfoService,
    private foodService: FoodService,
    private messageService: MessageService,
    private cartfoodService: CartFoodService
  ) {}

  showSuccess(fooditem: showAllFood) {
    let index = this.cartfoodService
      .getCart()
      .findIndex((item) => item.id === fooditem.id);
    if (index >= 0) {
      return;
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Food Added to Cart',
      });
      this.cartfoodService.setCartInfo(fooditem);
      console.log('showSuccess in new order components');
    }
  }
  ngOnInit() {
    this.getTotalFoodNum();
    this.getTables(1);
    this.getFoods(1);
    this.foodAddedinCart = this.cartfoodService.getItems();
  }

  getTotalFoodNum() {
    this.foodService.getFood().subscribe((res: any) => {
      this.totalFoodNum = res.totalRecords;
      this.isloading = true;
    });
  }

  getTables(page: number) {
    this.tablesService
      .getRequiredTables(page, this.dataPerPage)
      .subscribe((res: any) => {
        this.tables = [...this.tables, ...res.data];
        this.totalTablepages = res.totalPages;
        this.showTotalTable = this.tables.length;
        console.log('inside get tables');
        // this.lazyLoadingTable = false;
      });
  }

  getFoods(page: number) {
    this.foodService
      .getRequiredFood(page, this.dataPerPage)
      .subscribe((res: any) => {
        this.foods = [...this.foods, ...res.data];
        this.totalFoodPages = res.totalPages;
        this.showTotalFood = this.foods.length;
        this.lazyLoadingFood = false;
      });
  }

  getMoreTables() {
    console.log('inside get More  tables');
    this.currentTablePage++;
    this.lazyLoadingTable = true;
    this.getTables(this.currentTablePage);
    this.lazyLoadingTable = false;
  }

  getMoreFoods() {
    this.currentFoodPage++;
    this.lazyLoadingFood = true;
    this.getFoods(this.currentFoodPage);
    this.lazyLoadingFood = false;
  }

  onLazyLoadTable(event: LazyEvent) {
    if (
      this.lastFirstIndexTable !== null &&
      event.first <= this.lastFirstIndexTable
    ) {
      return;
    }
    this.lastFirstIndexTable = event.first;
    if (!this.initialTableLoadDone) {
      this.initialTableLoadDone = true;
      return;
    }
    if (this.currentTablePage < this.totalTablepages) {
      this.getMoreTables();
    }
  }

  onLazyLoadFood(event: LazyEvent) {
    if (this.currentFoodPage === this.totalFoodPages) {
      return;
    }
    if (
      this.lastFirstIndexFood !== null &&
      event.first <= this.lastFirstIndexFood
    ) {
      return;
    }
    this.lastFirstIndexFood = event.first;
    if (!this.initialFoodLoadDone) {
      this.initialFoodLoadDone = true;
      return;
    }
    if (this.currentFoodPage < this.totalFoodPages) {
      this.getMoreFoods();
    }
  }

  onSearch(name: string) {
    this.showSearchedFood = true;
    console.log(name);
    this.foodService
      .getSearchedFood(1, this.showTotalFood, name)
      .subscribe((res: any) => {
        console.log(res);
        this.searchedFoodList = res.data;
      });
  }

  onTableSelected(id: number) {
    this.cartfoodService.setTableID(id);
    this.isTableSelected = true;
  }
}
