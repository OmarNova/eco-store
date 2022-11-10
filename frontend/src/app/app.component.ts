import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router:Router, private api:ApiService) { 
  }

  ngOnInit(): void {
    this.ir_carrito();
    const carrito = localStorage.getItem("producto");

    const btn_comprar = document.getElementById("comprar-pedido") as HTMLElement;
    btn_comprar.addEventListener("click",e=>{
      e.preventDefault();
      this.comprar();
    });

    if(carrito){
    const cesta = JSON.parse(carrito as string);
    cesta.forEach((e:any)=>{
      this.fillModalCarrito(e);
    })
  
    }
  }
  title = 'frontend';
  
  totalProductos(): {total: number, subtotal: number} {
    const data = localStorage.getItem("producto");
    if(data){
      const cesta = JSON.parse(data as string);
      let subtotal = 0;
      let total = 0;
      for (let index = 0; index < cesta.length; index++) {
        subtotal += cesta[index].data.precio;
        total += cesta[index].data.precio * cesta[index].cantidad;
      }
      return {total, subtotal};
    }
    return {total: 0, subtotal:0};

  }

  fillModalCarrito(product: any){
    const data = localStorage.getItem("producto");
    const modal_carrito = document.getElementById("carrito-product") as HTMLElement;

    if(data){
      const producto = document.getElementById(`cesta-product-${product.data._id}`);
      if(producto){
        let cantidad_prod = document.getElementById(`cantidad-product-${product.data._id}`) as HTMLInputElement;
        cantidad_prod.value = `${product.cantidad}`;
      }else{
        const carrito = JSON.parse(data);
      const title = document.getElementById("modal-tittle-carrito") as HTMLElement;
      title.innerHTML = `MI CARRITO(${carrito.length})`;

      const rowProduct = document.createElement("div")
      rowProduct.classList.add("row");
      rowProduct.setAttribute("style","border-style: none;border-color: var(--bs-purple);border-bottom: 1px solid var(--bs-gray-500) ;");

      const colImg = document.createElement("div");
      colImg.classList.add("col-xxl-3");

      const imgProduct = document.createElement("img");
      imgProduct.setAttribute("style","width: 100%;height: 90%;");
      imgProduct.setAttribute("width","100");
      imgProduct.setAttribute("height","80");
      imgProduct.setAttribute("src",`${product.data.img}`);

      colImg.appendChild(imgProduct);

      const colProduct = document.createElement("div");
      colProduct.classList.add("col");

      const rowProductHeader = document.createElement("div");
      rowProductHeader.classList.add("row");

      const colTile = document.createElement("div");
      colTile.classList.add("col-xxl-9");

      const tituloProduct = document.createElement("h6");
      const strong = document.createElement("strong");
      strong.innerHTML = product.data.nombre;
      tituloProduct.appendChild(strong);

      colTile.appendChild(tituloProduct);

      const colIconEliminar = document.createElement("div");
      colIconEliminar.classList.add("col");
      colIconEliminar.setAttribute("style","text-align: right;")
        
      const linkEliminar = document.createElement("a");
      linkEliminar.addEventListener("click",e=>{
        e.preventDefault();
        this.deleteProduct(product.data._id);
      });

      const icono = document.createElement("svg");

      icono.classList.add("bi", "bi-x");
      icono.setAttribute("style","font-size: 39px;color: var(--bs-secondary);");
      icono.setAttribute("width","1em");
      icono.setAttribute("height","1em");
      icono.setAttribute("fill","currentColor");
      icono.setAttribute("viewBox","0 0 16 16");

      linkEliminar.appendChild(icono);
      colIconEliminar.appendChild(linkEliminar);

      rowProductHeader.appendChild(colTile);
      rowProductHeader.appendChild(colIconEliminar);

      const rowContenido = document.createElement("div");
      rowContenido.classList.add("row");

      const colContenido = document.createElement("div");
      colContenido.classList.add("col");

      const contenido = document.createElement("p");
      contenido.setAttribute("style","color: var(--bs-gray-700);font-weight: bold;");
      contenido.innerHTML = `${product.data.contenido}`;

      colContenido.appendChild(contenido);
      rowContenido.appendChild(colContenido);

      const rowFooter = document.createElement("div");
      rowFooter.classList.add("row");

      const colCantidad = document.createElement("div");
      colCantidad.classList.add("col");

      const textCantidad = document.createElement("p");
      textCantidad.setAttribute("style","color: var(--bs-gray-700);font-weight: bold;");
      textCantidad.innerHTML = "Cantidad:";

      colCantidad.appendChild(textCantidad);

      const colInputCantidad = document.createElement("div");
      colInputCantidad.classList.add("col");

      const inputCantidad = document.createElement("input");
      inputCantidad.classList.add("col");
      inputCantidad.setAttribute("style","width: 100%;");
      inputCantidad.setAttribute("type","number");
      inputCantidad.setAttribute("min","0");
      inputCantidad.setAttribute("value",`${product.cantidad}`);
      inputCantidad.setAttribute("id",`cantidad-product-${product.data._id}`);

      colInputCantidad.appendChild(inputCantidad);

      const colPrecio = document.createElement("div");
      colPrecio.classList.add("col");

      const precio = document.createElement("p");
      precio.setAttribute("style","color: var(--bs-gray-700);font-weight: bold;");
      precio.innerHTML = product.data.precio + " " + product.data.moneda;

      colPrecio.appendChild(precio);

      rowFooter.appendChild(colCantidad);
      rowFooter.appendChild(colInputCantidad);
      rowFooter.appendChild(colPrecio);

      colProduct.appendChild(rowProductHeader);
      colProduct.appendChild(rowContenido);
      colProduct.appendChild(rowFooter);

      rowProduct.appendChild(colImg);
      rowProduct.appendChild(colProduct);

      rowProduct.setAttribute("id",`cesta-product-${product.data._id}`);

      modal_carrito.appendChild(rowProduct);
      }
      const total = document.getElementsByClassName("totales");
      total[0].textContent = this.totalProductos().subtotal + "€";
      total[1].textContent = this.totalProductos().total + "€";
      
    }
  }

  estaLogueado(){
    return localStorage.getItem('token');
  }

  comprar() {
    const cesta = localStorage.getItem("producto");
    const token = localStorage.getItem("token");
    if(token){
      if(cesta){
        const carrito = JSON.parse(cesta);
        if(carrito.length != 0){
          const httpOptions = {
            headers: new HttpHeaders({
              'authorization': token
            })
          }
          const total = this.totalProductos();
          this.api.postCompra({carrito,total: total.total},httpOptions).subscribe();
          localStorage.removeItem("producto");
          this.borrarCesta();
          this.router.navigate(['index']);
        }
      }
    }else{
      this.router.navigate(['login']);
    }
   
  }

  borrarCesta(){
    const cesta = document.getElementById("carrito-product") as HTMLElement;
    while (cesta.firstChild) {
      cesta.removeChild(cesta.firstChild);
    }
    const total = document.getElementsByClassName("totales");
    total[0].innerHTML = "0 €";
    total[1].innerHTML = "0 €";
  }


  ir_carrito(){
    const ir_carrito = document.getElementById("ir-al-carrito") as HTMLElement;
    ir_carrito.addEventListener("click",(e:any)=>{
      this.router.navigate(['/cart'])
    });
  }

  existeProductCarrito(data: any, id: string) {
    for (let index = 0; index < data.length; index++) {
      if (data[index].data._id === id) {
          return {index: index, cantidad: data[index].cantidad}
      }
    }
    return {index: -1, cantidad: 0};
  }

  deleteProduct(id: string){
    const carrito = document.getElementById("carrito-product") as HTMLElement;
    const producto = document.getElementById(`cesta-product-${id}`) as HTMLElement;
    carrito.removeChild(producto);

    const data_carrito = JSON.parse(localStorage.getItem("producto") as string);
    for (let index = 0; index < data_carrito.length; index++) {
      if(data_carrito[index].data._id == id){
        data_carrito.splice(index,1);
        break;
      }
    }
    localStorage.setItem("producto",JSON.stringify(data_carrito));
    const total = document.getElementsByClassName("totales");
    total[0].textContent = this.totalProductos().subtotal + "€";
    total[1].textContent = this.totalProductos().total + "€";
    const titulo = document.getElementById("modal-tittle-carrito") as HTMLElement;
    titulo.textContent = `MI CARRITO (${JSON.parse(localStorage.getItem("producto") as string).length})`;

  }

}