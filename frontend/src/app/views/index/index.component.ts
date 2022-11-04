import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service'
import { ProductsI } from '../../models/product.interfaces';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router'


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  product: ProductsI[] = [];
  
  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.api.getProduct().subscribe( (data: ProductsI[]) => (this.product = data));
  }

  onLogout(){
    localStorage.clear()
    this.router.navigate(['login'])
  }

}
