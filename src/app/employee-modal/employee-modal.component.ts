import { TableInfoService } from '../services/tablesinfo.service';
import { AllemployeeinfoService } from '../services/allemployeeinfo.service';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Component, EventEmitter, inject, Input, input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { getAllEmployees } from '../model/employee.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { addEmployeeToTableReqBody } from '../model/table.model';
import { Router } from '@angular/router';
import { SpinnerComponent } from "../spinner/spinner.component";
export interface Employee {
  employeeId: string;
  name: string;
}

@Component({
  selector: 'app-employee-modal',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    MultiSelectModule,
    SpinnerComponent
],
  templateUrl: './employee-modal.component.html',
  styleUrl: './employee-modal.component.css',
})
export class EmployeeModalComponent {
  seatNumber = input<number>();
  @Input() tableId!: number;
  tableNumber = input<string>();
  tableImage = input<string>();
  @Output() loadingNewAssignedEmployee = new EventEmitter<boolean>();

  router = inject(Router);
  visible: boolean = false;
  employees!: Employee[];
  selectedEmployee!: Employee[];
  addemployeetotable: addEmployeeToTableReqBody = new addEmployeeToTableReqBody();
  isLoading = true;

  constructor(
    private tableinfo: TableInfoService,
    private allemployeeinfo: AllemployeeinfoService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.tableinfo.getAssignedEmployee(this.tableId).subscribe((res: any) => {
      this.employees = res;
    });
  }

  showDialog() {
    this.visible = true;
  }

  onAddEmployee() {

    console.log(this.selectedEmployee);
    for (let i = 0; i < this.selectedEmployee.length; i++) {
      this.addemployeetotable.tableId = this.tableId;
      this.addemployeetotable.employeeId = this.selectedEmployee[i].employeeId;
      console.log(this.addemployeetotable);
      this.uploadEmp(this.addemployeetotable);
    }
    this.loadingNewAssignedEmployee.emit(this.isLoading);
  }

  uploadEmp(obj: addEmployeeToTableReqBody) {
    this.tableinfo.addEmployeeToTable(obj).subscribe((res: any) => {});
  }

  onCloseModal(){
    this.selectedEmployee = [];
  }
}
