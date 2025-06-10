import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee, getEmployeeDatatable, updateReqBody } from '../model/employee.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SpinnerComponent } from "../spinner/spinner.component";
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-employees',
  imports: [
    FormsModule,
    TableModule,
    CommonModule,
    ButtonModule,
    SpinnerComponent,AvatarModule, OverlayBadgeModule
],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  isStarClicked:boolean = false;
  userService = inject(UserService);
  router = inject(Router);
  allemployees: getEmployeeDatatable[] = [];
  updateReq: updateReqBody = new updateReqBody();
  employeeID: string = '';
  isLoading=false;
  totalRecord: number = 0;
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


 //when next page is clicked
  onNextPage(event: any) {
    console.log(event);
    console.log(event.first)
    console.log(event.rows)

    const page = Math.floor(event.first / event.rows) + 1; // calculate page number (1-based)
    const perPage = event.rows;
    this.userService
      .getRequiredEmployee(page, perPage)
      .subscribe((response: any) => {
        this.allemployees = response.data;
        console.log(this.allemployees, 'for next page');
        this.totalRecord = response.total;
      });
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
