import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {

  constructor(private api:ApiService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fillCesta();
  }
  getIdToken(){

    return localStorage.getItem('token')
  }
  

  login(){
    return localStorage.getItem('token')
  }


  onLogout(){
    localStorage.removeItem("token");
    this.router.navigate(['index'])
  }

  estaLogueado(){
      return localStorage.getItem('token');
  }

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

  deleteProduct(id: string){
    const carrito = document.getElementById("carrito-product") as HTMLElement;
    const producto = document.getElementById(`cesta-product-${id}`) as HTMLElement;
    carrito.removeChild(producto);

    const carrito_productos = document.getElementById("carrito-productos") as HTMLElement;
    const carrito_producto = document.getElementById(`carrito-product-${id}`) as HTMLElement;
    carrito_productos.removeChild(carrito_producto);

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

    const totales = document.getElementsByClassName("total");
    totales[0].textContent = total[0].textContent
    totales[1].textContent = total[1].textContent
    const articulos = document.getElementById("numero-articulos") as HTMLElement;
    articulos.textContent = `${JSON.parse(localStorage.getItem("producto") as string).length} Artículos`;

  }

  fillCesta(){
    const cesta = document.getElementById("carrito-productos");
    const productos = localStorage.getItem("producto");
    const numero_articulos = document.getElementById("numero-articulos") as HTMLElement;

    if(cesta){
      if (productos) {
        const data_productos = JSON.parse(productos as string);
        numero_articulos.innerHTML = `${data_productos.length} Artículos`

        data_productos.forEach((e:any)=>{
          const rowProducto = document.createElement("div");
          rowProducto.classList.add("row");
          rowProducto.setAttribute("id",`carrito-product-${e.data._id}`);

          const colImg = document.createElement("div");
          colImg.classList.add("col");

          const img = document.createElement("img");
          img.setAttribute("style","width: 95%;height: 100%;");
          img.setAttribute("src", `${e.data.img}`);

          colImg.appendChild(img);

          const colTituloContenido = document.createElement("div");
          colTituloContenido.classList.add("col");

          const rowTitulo = document.createElement("div");
          rowTitulo.classList.add("row");

          const colTitulo = document.createElement("div");
          colTitulo.classList.add("col");

          const titulo = document.createElement("h6")
          titulo.setAttribute("style","font-weight: bold;");
          const tituloStrong = document.createElement("strong");
          tituloStrong.innerHTML = e.data.nombre;

          titulo.appendChild(tituloStrong);
          colTitulo.appendChild(titulo);
          rowTitulo.appendChild(colTitulo);

          const rowContenido = document.createElement("div");
          rowContenido.classList.add("row");

          const colContenido = document.createElement("div");
          colContenido.classList.add("col");

          const contenido = document.createElement("p")
          contenido.setAttribute("style","font-size: 16px;color: var(--bs-secondary);font-weight: bold;");
          contenido.innerHTML = `Talla: ${e.data.contenido}`;

          colContenido.appendChild(contenido);
          rowContenido.appendChild(colContenido);

          colTituloContenido.appendChild(rowTitulo);
          colTituloContenido.appendChild(rowContenido);

          const colCantidad = document.createElement("div");
          colCantidad.classList.add("col", "d-flex", "justify-content-center", "align-items-center");

          const cantidad = document.createElement("p");
          cantidad.setAttribute("style","color: var(--bs-secondary);font-size: 18px;");
          cantidad.innerHTML = "Cantidad";

          colCantidad.appendChild(cantidad);

          const colInputCantidad  = document.createElement("col");
          colInputCantidad.classList.add("col", "d-flex", "justify-content-center", "align-items-center");

          const InputCantidad = document.createElement("input");
          InputCantidad.value = e.cantidad;
          InputCantidad.setAttribute("type","number");
          InputCantidad.setAttribute("min","0");
          InputCantidad.setAttribute("style","width: 61%;height: 18%;text-align: center;");

          colInputCantidad.appendChild(InputCantidad);

          const colPrecio  = document.createElement("col");
          colPrecio.classList.add("col", "d-flex", "justify-content-center", "align-items-center");

          const precio = document.createElement("p");
          precio.setAttribute("style","color: var(--bs-black);font-size: 18px;font-weight: bold;");
          precio.innerHTML = e.data.precio + " " + e.data.moneda;
          
          colPrecio.appendChild(precio);

          const colEliminar  = document.createElement("col");
          colEliminar.classList.add("col", "d-flex", "justify-content-center", "align-items-center");

          const icon = document.createElement("svg");
          icon.classList.add("bi", "bi-trash-fill", "btnhover");
          icon.setAttribute("style","font-size: 30px");
          icon.setAttribute("width","1em");
          icon.setAttribute("height","1em");
          icon.setAttribute("fill","currentColor");
          icon.setAttribute("viewBox","0 0 16 16");
          icon.addEventListener("click",event=>{
            event.preventDefault();
            this.deleteProduct(e.data._id);
          });

          colEliminar.appendChild(icon);

          rowProducto.appendChild(colImg);
          rowProducto.appendChild(colTituloContenido);
          rowProducto.appendChild(colCantidad);
          rowProducto.appendChild(colInputCantidad);
          rowProducto.appendChild(colPrecio);
          rowProducto.appendChild(colEliminar);

          cesta.appendChild(rowProducto);

        });
        
      }else{

        numero_articulos.innerHTML = `0 Artículos`

        let h2 = document.createElement("h3");
        let row = document.createElement("div");
        row.classList.add("row");
        let col = document.createElement("div");
        col.classList.add("col");
        h2.innerHTML = "No hay productos";
        h2.setAttribute("style","margin-left: 40px;font-weight: bold;")
        col.appendChild(h2);
        row.appendChild(col);
        cesta.appendChild(row);
      }
      const totales = this.totalProductos();
      const divTotales = document.getElementsByClassName("total");
      divTotales[0].textContent = totales.subtotal + " " + "€";
      divTotales[1].textContent = totales.total + " " + "€";

    }

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

}
