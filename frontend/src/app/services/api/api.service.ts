import { Injectable } from '@angular/core';
import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://localhost:1802/api/"

  constructor(private http:HttpClient) { }


  loginByEmail(form:any):Observable<ResponseI>{

    let dir = this.url + "auth";

    return this.http.post<ResponseI>(dir, form);
  }

}
