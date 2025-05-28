import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getAllEmployees } from '../model/employee.model';
import { TableInfoService } from './tablesinfo.service';

@Injectable({
  providedIn: 'root',
})
export class AllemployeeinfoService implements OnInit {
  private allEmployeesSubject = new BehaviorSubject<getAllEmployees[]>([]);
  allEmployeesObservable$ = this.allEmployeesSubject.asObservable();
  constructor(private tableService: TableInfoService) {}

  ngOnInit() {}
  
  setAllEmployees(value: getAllEmployees[]) {
    this.allEmployeesSubject.next(value);
  }

  getAllEmployees(): any {
    return this.allEmployeesSubject.getValue();
  }

  apiCall() {
    this.tableService.getAllEmployee().subscribe((res: any) => {});
  }
}
