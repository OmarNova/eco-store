import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { LoginI } from '../../models/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    usuario : new FormControl('usuario@gmail.com',Validators.required),
    password : new FormControl('',Validators.required)
  })

  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }

  onLogin(form:any){
    this.api.loginByEmail(form).subscribe((data: any) => {
      console.log(data);
    })
    console.log(form)
  }

}
