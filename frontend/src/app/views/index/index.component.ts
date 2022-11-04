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

    this.api.getProduct().subscribe( (data: ProductsI[]) => (this.product = data, this.dataProducts(data)));
    console.log(this.product);
  }

  dataProducts(data:ProductsI[]) : void{
    const vitrina = document.getElementById("vitrina") 
    if(vitrina){
      let i = 0;
      let row = document.createElement("div");
      row.classList.add("row");
      data.forEach((item: any)=>{

        if(i>3){
          i=0;
          vitrina.appendChild(row);
          row = document.createElement("div");
          row.classList.add("row"); 
        }
        row.appendChild(this.fillVitrina(item));
        i++;
        
      });

    }
  }

  fillVitrina (product: any): HTMLDivElement{

    let col = document.createElement("div");
    col.classList.add("col");

    let divProduct = document.createElement("div");
    divProduct.id = product._id;
    divProduct.classList.add("card", "col-12", "col-md-2", "text-center");
    divProduct.setAttribute("style","width: 15rem;");

    let imagen = document.createElement("img");
    imagen.src = product.img;
    imagen.classList.add("card-img-top");
    imagen.setAttribute("style", "width: 15rem;");

    let divBodyProduct = document.createElement("div");
    divBodyProduct.classList.add("card-body");

    let title = document.createElement("h5");
    title.innerHTML = product.nombre;
    title.classList.add("card-title");
    title.setAttribute("style", "text-align: center;");

    let contenido = document.createElement("p");
    contenido.innerHTML = product.contenido;
    contenido.classList.add("card-text");
    contenido.setAttribute("style", "text-align: center;");

    let span = document.createElement("span");
    let precio = document.createElement("p");
    precio.classList.add("precio");
    precio.setAttribute("style", "margin:0px;text-align: center; color: #5ccb5f; font-weight: bold;");
    precio.innerHTML = product.precio + " " + product.moneda;
    span.appendChild(precio);

    let comprar = document.createElement("a");
    comprar.classList.add("btn");
    comprar.classList.add("btn-primary");
    comprar.setAttribute("style", "background-color: #5ccb5f; border-color: #5ccb5f; font-weight: bold; width:100%;");
    comprar.innerHTML = "Comprar";

    divBodyProduct.appendChild(title);
    divBodyProduct.appendChild(contenido);
    divBodyProduct.appendChild(span);
    divBodyProduct.appendChild(comprar);

    col.appendChild(imagen);
    col.appendChild(divBodyProduct);

    return col;
  }


  onLogout(){
    localStorage.clear()
    this.router.navigate(['login'])
  }

}
