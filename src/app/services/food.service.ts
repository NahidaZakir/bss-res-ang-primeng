import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addFoodReqBody } from '../model/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getFood() {
    return this.http.get('https://restaurantapi.bssoln.com/api/Food/datatable');
  }

  getRequiredFood(pageNumber: number, perPageNumber: number) {
    return this.http.get(
      `https://restaurantapi.bssoln.com/api/Food/datatable?page=${pageNumber}&per_page=${perPageNumber}`
    );
  }

  delFood(id: number) {
    return this.http.delete(
      `https://restaurantapi.bssoln.com/api/Food/delete/${id}`
    );
  }

  createFood(obj:addFoodReqBody){
    return this.http.post("https://restaurantapi.bssoln.com/api/Food/create", obj);
  }

  getSearchedFood(pageNum: number, perPageNum: number,food:string){
  return this.http.get(
      `https://restaurantapi.bssoln.com/api/Food/datatable?sort=&page=${pageNum}&per_page=${perPageNum}&search=${food}`
    );
  }
}
