import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private api:ApiService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
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
