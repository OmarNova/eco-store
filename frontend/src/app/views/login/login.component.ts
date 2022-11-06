import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { LoginI } from '../../models/login.interface';
import { Router } from '@angular/router'
import { ResponseI } from '../../models/response.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl('',Validators.required),
    passwd : new FormControl('',Validators.required)
  })


  constructor(private api:ApiService, private router:Router) { }
  errorStatus:boolean = false;
  errorMsj:any = "";


  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['index']);
    }
  }

  onLogin(form:any){
    this.api.loginByEmail(form).subscribe(data => {
      let dataResponse:ResponseI = data;
      if(!dataResponse.error){
        localStorage.setItem("token",dataResponse.message);
        this.router.navigate(['index'])
      }else{
        this.errorStatus = true;
        this.errorMsj = dataResponse.message;
      }
    })
    console.log(form)
  }

  getIdToken(){

    return localStorage.getItem('token')
  }
  

  login(){
    return localStorage.getItem('token')
  }


  onLogout(){
    localStorage.clear()
    this.router.navigate(['index'])
  }

  estaLogueado(){
      return localStorage.getItem('token');
  }

}
