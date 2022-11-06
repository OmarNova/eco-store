import { Injectable } from '@angular/core';
import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsI } from '../../models/product.interfaces';
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

  getProduct():Observable<ProductsI[]>{
    return this.http.get<ProductsI[]>(`${this.url}product/`)
  }

  getFavorito():Observable<FavI[]>{
    return this.http.get<FavI[]>(`${this.url}user/favoritos/`)
  }

  postFavorito(product: any, httpOptions: any):Observable<any>{
    let dir = this.url + 'user/favorites/';
    return this.http.post<any>(dir,product,httpOptions);
  }


  public get(url:string){
    return this.http.get(url)
  }

  

}
