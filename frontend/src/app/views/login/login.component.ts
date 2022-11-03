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
    email : new FormControl('usuario@gmail.com',Validators.required),
    passwd : new FormControl('',Validators.required)
  })

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(form:any){
    this.api.loginByEmail(form).subscribe(data => {
      let dataResponse:ResponseI = data;
      if(dataResponse.status){
        localStorage.setItem("token",dataResponse.response.token);
        this.router.navigate(['index'])
      }
    })
    console.log(form)
  }

}
