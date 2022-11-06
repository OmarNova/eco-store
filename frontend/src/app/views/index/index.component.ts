import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service'
import { ProductsI } from '../../models/product.interfaces';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { HttpHeaders } from '@angular/common/http';
//import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  p: number = 1;
  product: ProductsI[] = [];
  constructor(private api:ApiService, private router:Router) { 
    
  }

  ngOnInit(): void {
    this.api.getProduct().subscribe( (data: ProductsI[]) => (this.product = data, this.dataProducts(data)));
  }

  dataProducts(data:ProductsI[]) : void{
    const vitrina = document.getElementById("vitrina") 
    if(vitrina){
      let i = 0;
      let row = document.createElement("div");
      row.classList.add("row");
      row.classList.add("product-list");
      data.forEach((item: any)=>{

        if(i>3){
          i=0;
          vitrina.appendChild(row);
          row = document.createElement("div");
          row.classList.add("row"); 
          row.classList.add("product-list");
        }
        row.appendChild(this.fillCardProduct(item));
        i++;
        
      });

    }
  }

  fillCardProduct (product: any): HTMLDivElement{
    let col = document.createElement("div");
    col.classList.add("col-sm-6");
    col.classList.add("col-md-4");
    col.classList.add("product-item");
    col.setAttribute("style","width: 280px;");

    let product_container = document.createElement("div");
    product_container.classList.add("product-container");

    product_container.appendChild(this.fillIconFavorite());
    product_container.appendChild(this.fillImage(product.img));
    product_container.appendChild(this.fillTitle(product.nombre));
    product_container.appendChild(this.fillPrecioContenido(product.contenido,product.precio,product.moneda));

    col.appendChild(product_container);
    return col;

  }

  fillPrecioContenido (contenido: string, precio: string, moneda: string): HTMLDivElement {
    let row =  document.createElement("div");
    let colContenido =  document.createElement("div");
    let contenidoh6 = document.createElement("h6");
    contenidoh6.classList.add("text-muted");
    contenidoh6.classList.add("mb-2");
    contenidoh6.setAttribute("style","text-align: center;font-size: 20px;");
    contenidoh6.innerHTML = contenido;

    let col_12 = document.createElement("div");
    col_12.classList.add("col-12");

    let rowPrecio =  document.createElement("div");
    rowPrecio.classList.add("row");

    let colPrecio =  document.createElement("div");
    colPrecio.classList.add("col");
    colPrecio.setAttribute("style","text-align: center;");

    let precioParrafo = document.createElement("p");
    precioParrafo.innerHTML = precio + " " + moneda;
    precioParrafo.classList.add("product-price");
    precioParrafo.setAttribute("style","text-align: center;color: #009929;font-weight: bold;font-size: 20px;");

    colPrecio.appendChild(precioParrafo);
    rowPrecio.appendChild(colPrecio);
    col_12.appendChild(rowPrecio);

    colContenido.appendChild(contenidoh6);
    
    row.appendChild(colContenido);
    row.appendChild(col_12);
    return row;
  }

  fillTitle (title: string): HTMLDivElement {
    let row =  document.createElement("div");
    let col =  document.createElement("div");
    col.classList.add("col-8");
    col.classList.add("col-xxl-12");
    col.setAttribute("style","height: 80px");

    let h5 = document.createElement("h5")
    h5.setAttribute("style","text-align: center;font-family: Roboto, sans-serif;font-weight: bold;padding-bottom: 0px;padding-top: 0px;margin-top: 0px;")
    h5.innerHTML = title;

    col.appendChild(h5);
    row.appendChild(col);

    return row;
  }

  fillImage (src: string): HTMLDivElement {
    let row =  document.createElement("div");
    let col =  document.createElement("div");
    col.classList.add("col-md-12");
    col.setAttribute("style","height: 299px;");
    let img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("width", "206");
    img.setAttribute("height", "226");
    img.setAttribute("style", "height: 295px;width: 206px;");

    col.appendChild(img);
    row.appendChild(col);

    return row;
  }

  fillIconFavorite (): HTMLDivElement {
    let row =  document.createElement("div");
    let col = document.createElement("div");
    col.classList.add("col");
    col.setAttribute("style","text-align: right;");
    let a = document.createElement("a");
    a.setAttribute("style","color: var(--bs-black);");
    let icon = document.createElement("svg");
    icon.classList.add("bi");
    icon.classList.add("bi-heart-fill");
    icon.setAttribute("style","font-size: 20px;");
    icon.setAttribute("width","1em");
    icon.setAttribute("height","1em");
    icon.setAttribute("fill","currentColor");
    icon.setAttribute("viewBox","0 0 16 16");
    a.appendChild(icon);
    col.appendChild(a);
    row.appendChild(col);
    return row;
  }


  onLogout(){
    localStorage.clear()
    this.router.navigate(['index'])
  }

  estaLogueado(){
      return localStorage.getItem('token');
  }

  favorito(idProduct: string){
    const token = this.estaLogueado();
    if(token){
      const httpOptions = {
        headers: new HttpHeaders({
          'authorization': token
        })
      }

      this.api.postFavorito({idProduct: idProduct},httpOptions).subscribe();
      
    }

    
    
  }
  

}
