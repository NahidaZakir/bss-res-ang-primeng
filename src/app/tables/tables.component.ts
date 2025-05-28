import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SpinnerComponent } from '../spinner/spinner.component';
import { TableInfoService } from '../services/tablesinfo.service';
import { AllTable, showAllTable } from '../model/table.model';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { OrdersComponent } from '../orders/orders.component';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { AllemployeeinfoService } from '../services/allemployeeinfo.service';
import { getAllEmployees } from '../model/employee.model';
@Component({
  selector: 'app-tables',
  imports: [
    FormsModule,
    TableModule,
    CommonModule,
    ButtonModule,
    SpinnerComponent,
    ButtonModule,
    InputTextModule,
    EmployeeModalComponent,
  ],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent {
  tableService = inject(TableInfoService);
  router = inject(Router);
  allTables: AllTable[] = [];
  showAllTables: showAllTable[] = [];
  employeeID: string = '';
  totalRecords: number = 0;
  loading: boolean = true;
  isloading: boolean = false;
  currentEmployee!: getAllEmployees[];
  constructor(private allemployeeinfo: AllemployeeinfoService) {}
  ngOnInit() {
    this.getTable();
    this.getEmployeeAll();
  }

  getTable() {
    this.isloading = true;
    this.tableService.getTables().subscribe(
      (res: any) => {
        this.showAllTables = res.data;
        this.totalRecords = res.totalRecords;
        console.log(this.showAllTables, 'show all tables');
        this.isloading = false;
      },
      (error) => {}
    );
  }

  onDeleteTable(tableId: number) {
    this.tableService.delelteTable(tableId).subscribe((res: any) => {
      this.getTable();
    });
  }
  //when next page is clicked
  onNextPage(event: any) {
    console.log(event);
    const page = Math.floor(event.first / event.rows) + 1; // calculate page number (1-based)
    const perPage = event.rows;
    this.tableService
      .getRequiredTables(page, perPage)
      .subscribe((response: any) => {
        this.showAllTables = response.data;
        console.log(this.showAllTables, 'for next page');
        this.totalRecords = response.total;
      });
  }

  onAddTable() {
    this.router.navigateByUrl('/add-table');
  }

  getEmployeeAll() {
    this.tableService.getAllEmployee().subscribe((res: any) => {
      this.allemployeeinfo.setAllEmployees(res);
    });
  }
  onDeleteEmployeeAssign(tableId: number) {
    this.tableService.delEmployeeFromTable(tableId).subscribe((res: any) => {
      alert('deleted');
      this.getTable();
      this.getEmployeeAll();
    });
  }
}
