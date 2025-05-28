import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ loginReqBody,loginRespBody} from '../model/user.model';
import { Observable, Subject } from 'rxjs';
import { addEmployeeReqBody, updateReqBody } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  tokenExpired$: Subject<boolean> = new Subject<boolean>();
  tokenReceived$: Subject<boolean> = new Subject<boolean>();
 
  constructor(private http: HttpClient) { }

  onLogin(obj:loginReqBody): Observable<loginRespBody>{
    return this.http.post<loginRespBody>("https://restaurantapi.bssoln.com/api/Auth/signIn",obj)
  }
  getEmployee(){
    return this.http.get("https://restaurantapi.bssoln.com/api/Employee/datatable");
  }
  
  getRequiredEmployee(pageNumber:number, perPageNumber:number){
    return this.http.get(`https://restaurantapi.bssoln.com/api/Employee/datatable?page=${pageNumber}&per_page=${perPageNumber}`)
  }

  delEmployee(employeeid:string){
    return this.http.delete(`https://restaurantapi.bssoln.com/api/Employee/delete/${employeeid}`);
  }

  updateEmlployee(obj:updateReqBody, employeeid:string){
    return this.http.put(`https://restaurantapi.bssoln.com/api/Employee/update/${employeeid}`, obj);
  }
  
  createEmployee(obj:addEmployeeReqBody){
    return this.http.post("https://restaurantapi.bssoln.com/api/Employee/create",obj);
  }

  checkingPhoneNum(num:string){
    return this.http.get(`https://restaurantapi.bssoln.com/api/Auth/phoneNumberExist/${num}`);
  }

}
