import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';
import { registerI } from '../../models/register.interface';
import { ApiService } from '../../services/api/api.service';
import { ResponseI } from '../../models/response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './checkpassword.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  errorStatus:boolean = false;
  errorMsj:any = "";

  constructor(private api:ApiService, private router:Router) {}
  

  registerForm = new FormGroup({
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwd: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmpasswd: new FormControl('', [Validators.required])
  },
);
 


  ngOnInit(): void {
    if(this.estaLogueado()){
      this.router.navigate(['index']);
    }
  }

  onLogout(){
    localStorage.removeItem("token");
    this.router.navigate(['/index'])
    window.location.reload();
  }

  estaLogueado(){
      return localStorage.getItem('token');
  }

  get f(){return this.registerForm.controls}

  onRegister(form:any){
    this.api.register(form).subscribe(data => {
      let dataResponse:ResponseI = data;
      if(!dataResponse.error){
        this.router.navigate(['index'])
      }else{
        this.errorStatus = true;
        this.errorMsj = dataResponse.message;
      }
    })
    console.log(form)
  }

}
