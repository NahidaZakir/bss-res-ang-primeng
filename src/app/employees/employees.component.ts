import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee, updateReqBody } from '../model/employee.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: 'app-employees',
  imports: [
    FormsModule,
    TableModule,
    CommonModule,
    ButtonModule,
    SpinnerComponent
],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  userService = inject(UserService);
  router = inject(Router);
  allemployees: Employee[] = [];
  updateReq: updateReqBody = new updateReqBody();
  employeeID: string = '';
  isLoading=false;
  ngOnInit() {
      this.getEmployees();
      
  }

  getEmployees() {
    this.userService.getEmployee().subscribe(
      (res: any) => {
        this.isLoading=true;
        console.log('succesful in getting employee');
        console.log(res.data);
        this.allemployees = res.data;
        console.log('this is employee array', this.allemployees);
      },
      (error) => {}
    );
  }

  onDelete(employeeid: string) {
    this.userService.delEmployee(employeeid).subscribe(
      (res: any) => {
        console.log('this is deleted');
        this.getEmployees();
      },
      (error) => {}
    );
  }
  onModalUpdate() {
    console.log(this.updateReq);
    if (this.updateReq.designation !== '') {
      this.userService
        .updateEmlployee(this.updateReq, this.employeeID)
        .subscribe(
          (res: any) => {
            console.log('Updated employee Infor');
          },
          (error) => {}
        );
    }
  }

  onUpdate(employeeid: string) {
    this.employeeID = employeeid;
  }

  onAddEmployee() {
    this.router.navigateByUrl('/add-employee');
  }
}
