import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { addEmployeeToTableReqBody, createTableReqBody } from '../model/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableInfoService {

  tokenExpired$: Subject<boolean> = new Subject<boolean>();
  tokenReceived$: Subject<boolean> = new Subject<boolean>();
 
  constructor(private http: HttpClient) { }

  getAllTable(){
    return this.http.get("https://restaurantapi.bssoln.com/api/EmployeeTable/get");
  }

  getTables(){
    return this.http.get("https://restaurantapi.bssoln.com/api/Table/datatable");
  }

  getRequiredTables(pageNumber:number, perPageNumber:number){
    return this.http.get(`https://restaurantapi.bssoln.com/api/Table/datatable?page=${pageNumber}&per_page=${perPageNumber}`)
  }


  delelteTable(tableId:number){
    return this.http.delete(`https://restaurantapi.bssoln.com/api/Table/delete/${tableId}`)
  }

  createTable(obj:createTableReqBody){
    return this.http.post("https://restaurantapi.bssoln.com/api/Table/create",obj);
  }

  getAllEmployee(){
    return this.http.get("https://restaurantapi.bssoln.com/api/Employee/get");
  }


  delEmployeeFromTable(tableid:number){
    return this.http.delete(`https://restaurantapi.bssoln.com/api/EmployeeTable/delete/${tableid}`)
  }

  addEmployeeToTable(obj: addEmployeeToTableReqBody){
    return this.http.post("https://restaurantapi.bssoln.com/api/EmployeeTable/create",obj);
  }
}
