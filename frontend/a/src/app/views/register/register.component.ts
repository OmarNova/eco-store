import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './checkpassword.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  registerForm = new FormGroup({
    email: new FormControl('',Validators.required),
    passwd: new FormControl('',Validators.required),
    Confirmpasswd: new FormControl('',Validators.required),
    apellidos: new FormControl('',Validators.required),
    nombres: new FormControl('',Validators.required),
  })

  ngOnInit(): void {
  }

  onLogin(form:any){
    console.log(form)
  }

}
