import { Injectable } from '@angular/core';
import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsI, dataProducts } from '../../models/product.interfaces';
import { registerI } from '../../models/register.interface';
import { FavI } from '../../models/fav.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlAPI = 'http://localhost:1802/api/'

  url:string = "http://localhost:1802/api/"

  constructor(private http:HttpClient) { }


  loginByEmail(form:any):Observable<ResponseI>{

    let dir = this.url + "user/login";

    return this.http.post<ResponseI>(dir, form);
  }

  register(form:any):Observable<ResponseI>{
    let dir = this.url + 'user/register';
    return this.http.post<ResponseI>(dir, form);
  }

  getProduct(page?: number,search?: string, price?: number):Observable<ProductsI>{

    if(search && price && page){
      return this.http.get<ProductsI>(`${this.url}product?search=${search}&price=${price}&page=${page}`);
    }
    if(search && page){
      return this.http.get<ProductsI>(`${this.url}product?search=${search}&page=${page}`);
    }

    if(price && page){
      return this.http.get<ProductsI>(`${this.url}product?price=${price}&page=${page}`);
    }

    if(price && search){
      return this.http.get<ProductsI>(`${this.url}product?search=${search}&price=${price}`);
    }

    if(price){
      return this.http.get<ProductsI>(`${this.url}product?price=${price}`);
    }

    if(search){
      return this.http.get<ProductsI>(`${this.url}product?search=${search}`);
    }

    if(page){
      return this.http.get<ProductsI>(`${this.url}product?page=${page}`);
    }

    return this.http.get<ProductsI>(`${this.url}product/`)
  }

  getProductById(id: string): Observable<dataProducts>{
    return this.http.get<dataProducts>(`${this.url}product/${id}`);
  }

  getFavorito(httpOptions: any):any{
    return this.http.get<FavI>(`${this.url}user/favorites/`,httpOptions);
  }

  postFavorito(product: any, httpOptions: any):Observable<any>{
    let dir = this.url + 'user/favorites/';
    return this.http.post<any>(dir,product,httpOptions);
  }

  deleteFavorito(product: string, httpOptions: any):Observable<any>{
    let dir = this.url + `user/favorites/${product}`;
    return this.http.delete<any>(dir,httpOptions);
  }

  getPriceMax():Observable<ProductsI>{
    return this.http.get<ProductsI>(`${this.url}productPrice/`)
  }

  



}
