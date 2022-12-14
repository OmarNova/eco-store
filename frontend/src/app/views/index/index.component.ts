import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../services/api/api.service'
import { ProductsI, dataProducts } from '../../models/product.interfaces';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {

  private favoritos: any = undefined;
  private numeroPaginas: number;
  constructor(private api:ApiService, private router:Router, private route: ActivatedRoute) { 
    this.numeroPaginas = 0;
  }
  ngOnInit(): void {
    let pagina = undefined;
    this.borrarHTML();
    this.route.queryParams.subscribe((params:any) => {
      if(params['page']){
        pagina = parseInt(params['page']); 
      }
    });

    const range = document.getElementById('rangePrice') as HTMLInputElement;
    const text = document.getElementById('textPrice') as HTMLInputElement;
    this.api.getPriceMax().subscribe( (data: any) => (range.max = data.precioMax, range.value = data.precioMax, text.value = data.precioMax, text.max = data.precioMax));

    this.api.getProduct(pagina).subscribe( (data: ProductsI) => {
      this.fillDataProducts(data.product);
      this.fillPaginacion(data.length);
      this.setNumeropaginas(data.length);
    });

  
  }


  setNumeropaginas(pag: number){
    this.numeroPaginas = pag/12;
  }

  fillDataProducts(datos:any){
    const token = this.estaLogueado();
    if(token){
      const httpOptions = {
        headers: new HttpHeaders({
          'authorization': token
        })
      }
      this.api.getFavorito(httpOptions).subscribe((data:any) => {
        if(!data.error){
          this.favoritos = data.data;
        }
       this.dataProducts(datos);
      })
    }else{
      this.dataProducts(datos);
    }
  }

  dataProducts(data:any) : void{
    
    const vitrina = document.getElementById("vitrina") 
    if(vitrina){
      let i = 0;
      let row = document.createElement("div");
      row.classList.add("row", "product-list");
      data.forEach((item: any)=>{
        if(i>3){
          i=0;
          vitrina.appendChild(row);
          row = document.createElement("div");
          row.classList.add("row", "product-list");
        }
        row.appendChild(this.fillCardProduct(item));
        i++;
        
      });
      vitrina.appendChild(row);

    }
  }

  fillCardProduct (product: any): HTMLDivElement{
    let col = document.createElement("div");
    col.classList.add("col-sm-6", "col-md-4", "product-item");
    col.setAttribute("style","width: 280px;");
    col.setAttribute("id",`${product._id}`);
    col.addEventListener("mouseover",event=>{
      event.preventDefault();
      this.resaltarProducto(product._id);
    })

    col.addEventListener("mouseout",event=>{
      event.preventDefault();
      this.outProducto(product._id);
    })

    let product_container = document.createElement("div");
    product_container.classList.add("product-container");

    product_container.appendChild(this.fillIconFavorite(product._id));
    product_container.appendChild(this.fillImage(product.img,product._id));
    product_container.appendChild(this.fillTitle(product.nombre, product._id));
    product_container.appendChild(this.fillPrecioContenido(product.contenido,product.precio,product.moneda));
    product_container.appendChild(this.fillButtonCesta(product._id));

    col.appendChild(product_container);
    return col;

  }

  fillButtonCesta (id: string): HTMLDivElement {

    let row =  document.createElement("div");
    row.classList.add("row");
    row.setAttribute("id",`btn-${id}`)
    row.setAttribute("style","display: none;")

    let col =  document.createElement("div");
    col.classList.add("col", "d-flex", "justify-content-center");
    col.setAttribute("style","text-align: center;");

    let boton = document.createElement("button");
    boton.classList.add("boton", "d-flex", "justify-content-center", "align-items-center");
    boton.setAttribute("type","button");

    boton.addEventListener("click",event=>{
      event.preventDefault();
      this.saveProduct(id);
    })

    let icon = document.createElement("svg");
    icon.classList.add("bi", "bi-bag-plus", "btnhover");
    icon.setAttribute("style","font-size: 15px;");
    icon.setAttribute("width","1em");
    icon.setAttribute("height","1em");
    icon.setAttribute("fill","currentColor");
    icon.setAttribute("viewBox","0 0 16 16");


    icon.innerHTML = "A??adir a la cesta";
    boton.appendChild(icon);
    
    col.appendChild(boton);
    row.appendChild(col);

    return row;
  }

  fillPrecioContenido (contenido: string, precio: string, moneda: string): HTMLDivElement {
    let row =  document.createElement("div");
    let colContenido =  document.createElement("div");
    let contenidoh6 = document.createElement("h6");
    contenidoh6.classList.add("text-muted", "mb-2");
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

  fillTitle (title: string, id: string): HTMLDivElement {
    let row =  document.createElement("div");
    row.classList.add("row");
    let col =  document.createElement("div");
    col.classList.add("col-8", "col-xxl-12");
    col.setAttribute("style","height: 130px");

    let h5 = document.createElement("h5")
    h5.setAttribute("style","text-align: center;font-family: Roboto, sans-serif;font-weight: bold;padding-bottom: 0px;padding-top: 0px;margin-top: 0px;")
    h5.addEventListener("click",event=>{
      event.preventDefault();
      this.showModalProduct(id);
    })
    h5.innerHTML = title;

    col.appendChild(h5);
    row.appendChild(col);

    return row;
  }

  fillImage (src: string, id: string): HTMLDivElement {
    let row =  document.createElement("div");
    let col =  document.createElement("div");
    col.classList.add("col-md-12");
    col.setAttribute("style","height: 299px;");
    let img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("width", "206");
    img.setAttribute("height", "226");
    img.setAttribute("style", "height: 295px;width: 206px;");
    img.addEventListener("click",event=>{
      event.preventDefault();
      this.showModalProduct(id);
    })

    col.appendChild(img);
    row.appendChild(col);

    return row;
  }

  fillIconFavorite (id: string): HTMLDivElement {
    let row =  document.createElement("div");
    let col = document.createElement("div");
    col.classList.add("col");
    col.setAttribute("style","text-align: right;");
    let a = document.createElement("a");
    a.classList.add("btnhover");
    a.setAttribute("id",`fav-${id}`);

    const token = this.estaLogueado();
    if(token){
      if(this.favoritos){
        if(this.estaFavoritos(id,this.favoritos)){
          a.setAttribute("style","color:red;");
          a.addEventListener("click",event=>{
            event.preventDefault();
            this.deleteFavorito(id);
          });
        }else{
          a.setAttribute("style","color: var(--bs-black);");
          a.addEventListener("click",event=>{
            event.preventDefault();
            this.favorito(id);
          });
        }
      }else{
        a.setAttribute("style","color: var(--bs-black);");
          a.addEventListener("click",event=>{
            event.preventDefault();
            this.favorito(id);
          });
      }
    }else{
      a.setAttribute("style","color: var(--bs-black);");
      a.addEventListener("click",event=>{
        event.preventDefault();
        this.favorito(id);
      });
    }

    let icon = document.createElement("svg");
    icon.classList.add("bi", "bi-heart-fill", "btnhover");
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

  fillPaginacion(numPage: number): void{
      const pagina = document.getElementById("paginacion");
      if(pagina){

        let flechaInicio = document.createElement("li");
        flechaInicio.classList.add("page-item", "btnhover");
        flechaInicio.setAttribute("style","color: #009929;");
  
        let linkInicio = document.createElement("a");
        linkInicio.classList.add("page-link", "btnhover");
        linkInicio.innerHTML = "??";
        linkInicio.addEventListener("click",event=>{
          event.preventDefault();
          this.paginaAnterior();
        });
  
        flechaInicio.appendChild(linkInicio);

        pagina.appendChild(flechaInicio);

        for (let index = 1; index < (numPage/12)+1; index++) {
        
          let paginaLi = document.createElement("li");
          paginaLi.classList.add("page-item");

          let paginaLink = document.createElement("a");
          paginaLink.classList.add("page-link");
          paginaLink.setAttribute("id","test");
          paginaLink.innerHTML = index.toString();

          paginaLink.addEventListener("click",event=>{
            event.preventDefault();
            this.pagination(index);
          });

          paginaLi.appendChild(paginaLink);
          pagina.appendChild(paginaLi);
        }

        let flechaFinal= document.createElement("li");
        flechaFinal.classList.add("page-item");
        flechaFinal.setAttribute("style","color: #009929;");
  
        let linkFInal= document.createElement("a");
        linkFInal.classList.add("page-link");
        linkFInal.innerHTML = "??";

        linkFInal.addEventListener("click",event=>{
          event.preventDefault();
          this.paginaSiguiente();
        });
  
        flechaFinal.appendChild(linkFInal);

        pagina.appendChild(flechaFinal);

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


  estaFavoritos(id: string, data:any): boolean{
    for (let index = 0; index < data.length; index++) {
      if(id === data[index]._id){
        return true;
      }
    }
    return false;
  }

  favorito(idProduct: string){
    const token = this.estaLogueado();
    if(token){
      const httpOptions = {
        headers: new HttpHeaders({
          'authorization': token
        })
      }
      const iconFav = document.getElementById(`fav-${idProduct}`) as HTMLElement;
      iconFav.setAttribute("style","color: red");
      iconFav.removeEventListener("click", event=>{
        event.preventDefault();
        this.favorito(idProduct);
      });
      iconFav.addEventListener("click",event=>{
        event.preventDefault();
        this.deleteFavorito(idProduct);
      });

      const iconFavModal = document.getElementById(`fav-modal-${idProduct}`);
      if(iconFavModal){
        iconFavModal.setAttribute("style","color: red");
        iconFavModal.removeEventListener("click", event=>{
        event.preventDefault();
        this.favorito(idProduct);
      });
      iconFavModal.addEventListener("click",event=>{
        event.preventDefault();
        this.deleteFavorito(idProduct);
      });
      }


      this.api.postFavorito({idProduct: idProduct},httpOptions).subscribe();
      
    }
  }

  deleteFavorito(idProduct: string){
    const token = this.estaLogueado();
    if(token){
      const httpOptions = {
        headers: new HttpHeaders({
          'authorization': token
        })
      }
      const iconFav = document.getElementById(`fav-${idProduct}`) as HTMLElement;

      iconFav.removeEventListener("click",event=>{
        event.preventDefault();
        this.deleteFavorito(idProduct);
      });
      iconFav.addEventListener("click", event=>{
        event.preventDefault();
        this.favorito(idProduct);
      });

      const iconFavModal = document.getElementById(`fav-modal-${idProduct}`);
      if (iconFavModal) {
        iconFavModal.setAttribute("style","text-align: center;font-size: 32px;padding-top: 0px;margin-top: 10px;color: var(--bs-black);");
        iconFavModal.removeEventListener("click",event=>{
          event.preventDefault();
          this.deleteFavorito(idProduct);
        });
        iconFavModal.addEventListener("click", event=>{
          event.preventDefault();
          this.favorito(idProduct);
        });
      }

      iconFav.setAttribute("style","color: var(--bs-black);");
      this.api.deleteFavorito(idProduct,httpOptions).subscribe();
      
    }
  }


  paginaAnterior(){
    let pagina = 0;
    this.route.queryParams.subscribe((params:any) => {
      if(params['page']){
        pagina = parseInt(params['page']) - 1; 
      }
    });
    if(!(pagina<1)){
      this.pagination(pagina);
    }
  }

  paginaSiguiente(){
    let pagina = 0;
    this.route.queryParams.subscribe((params:any) => {
      if(params['page']){
        pagina = parseInt(params['page']) + 1; 
      }
    });
    if(!(pagina>this.numeroPaginas)){
      this.pagination(pagina);
    }
  }


  borrarHTML(){
    const vitrina = document.getElementById("vitrina") as HTMLElement;
    while (vitrina.firstChild) {
      vitrina.removeChild(vitrina.firstChild);
    }

    const pagina = document.getElementById("paginacion") as HTMLElement;
    while (pagina.firstChild) {
      pagina.removeChild(pagina.firstChild);
    }
  }
  
  pagination(page: number){
    this.borrarHTML();
    let precio: any = undefined;

    this.route.queryParams.subscribe((params:any) => {
      if(params['price']){
        precio = parseInt(params['price']);
      }
    });
    let searchbar = document.getElementById('searchInput') as HTMLInputElement;
    this.api.getProduct(page,searchbar.value,precio).subscribe( (data: ProductsI) => {
      this.dataProducts(data.product);
      this.fillPaginacion(data.length); 
      this.setNumeropaginas(data.length);
    });

    if(precio){
      this.router.navigate(['/index'], { queryParams: { price: precio ,page: page} } );
    }else{
      this.router.navigate(['/index'], { queryParams: { page: page} } );
    }
  }

  filterPrice(){
    const range = document.getElementById('rangePrice') as HTMLInputElement;
    const text = document.getElementById('textPrice') as HTMLInputElement;
    text.value = range.value;
    if(parseInt(range.value) <= 5){
      range.value = '5';
      text.value = range.value;
    }
  }

  filtrarPrecio(){
    const range = document.getElementById('rangePrice') as HTMLInputElement;
    const searchbar = document.getElementById('searchInput') as HTMLInputElement;

    let pagina = undefined;
    this.borrarHTML();
    this.route.queryParams.subscribe((params:any) => {
      if(params['page']){
        pagina = params['page'] 
      }
    });

    if(pagina){
      this.router.navigate(['/index'], { queryParams: { price: range.value, page: pagina} } );
    }else{
      this.router.navigate(['/index'], { queryParams: { price: range.value} } );
    }

    this.api.getProduct(pagina,searchbar.value,parseInt(range.value)).subscribe( (data: ProductsI) => (this.dataProducts(data.product),this.fillPaginacion(data.length), this.setNumeropaginas(data.length)));

  }

  search(){
    let searchbar = document.getElementById('searchInput') as HTMLInputElement;
    let precio: any = undefined;

    this.route.queryParams.subscribe((params:any) => {
      if(params['price']){
        precio = parseInt(params['price']);
      }
    });

    if (searchbar) {
      this.borrarHTML();
      this.api.getProduct(undefined,searchbar.value,precio).subscribe( (data: ProductsI) => (this.dataProducts(data.product),this.fillPaginacion(data.length), this.setNumeropaginas(data.length)));

    }
  }

  resaltarProducto(id: string){
    const btn = document.getElementById(`btn-${id}`) as HTMLElement;
    btn.setAttribute("style","display: inline");
  }

  outProducto(id: string){
    const btn = document.getElementById(`btn-${id}`) as HTMLElement;
    btn.setAttribute("style","display: none");
  }

  showModalProduct(id: string){
    const modal = document.getElementById("modal-product") as HTMLElement;
    const myModal = new Modal(modal);
    this.api.getProductById(id).subscribe( (data: any) => {
      this.fillModalProduct(data,id);
      myModal.show();
    });
  }

  fillModalProduct(data: any, id: string){
    
    const modal = document.getElementById("modal-product-body") as HTMLElement;
    while (modal.firstChild) {
      modal.removeChild(modal.firstChild);
    }

    const colImg = document.createElement("div");
    colImg.classList.add("col-md-6");
    const img = document.createElement("img");
    img.setAttribute("style","width:100%;height:100%;")
    img.setAttribute("src",data.img);
    colImg.appendChild(img);

    const colProduct = document.createElement("div");
    colProduct.classList.add("col-md-6");

    const rowHeader = document.createElement("div");
    rowHeader.classList.add("row");
    rowHeader.setAttribute("style","margin-bottom: 10px;");

    const colTitle = document.createElement("div");
    colTitle.classList.add("col-xxl-10");
   
    const title = document.createElement("h5");
    title.setAttribute("style"," font-family: Roboto, sans-serif;");
    title.classList.add("modal-title", "fw-bold");
    title.innerHTML = data.nombre;

    colTitle.appendChild(title);

    const colIcon = document.createElement("div");
    colIcon.classList.add("col");
    colIcon.setAttribute("style","text-align: center;");

    const icon = document.createElement("svg");
    icon.classList.add("bi", "bi-heart-fill", "btnhover");
    icon.setAttribute("id",`fav-modal-${id}`);
    const color = document.getElementById(`fav-${id}`)?.style.color;
    if(color=="red"){
      icon.addEventListener("click",event=>{
          event.preventDefault();
          this.deleteFavorito(id);
      });
    }else{
      icon.addEventListener("click",event=>{
        event.preventDefault();
        this.favorito(id);
    });
    }
    icon.setAttribute("style",`text-align: center;font-size: 32px;padding-top: 0px;margin-top: 10px;color:${color}`);
    icon.setAttribute("width","1em");
    icon.setAttribute("height","1em");
    icon.setAttribute("fill","currentColor");
    icon.setAttribute("viewBox","0 0 16 16");

    colIcon.appendChild(icon);

    rowHeader.appendChild(colTitle);
    rowHeader.appendChild(colIcon);

    const rowContenido = document.createElement("div");
    rowContenido.classList.add("row");

    const colContenido = document.createElement("div");
    colContenido.classList.add("col");

    const textContenido = document.createElement("h4");
    textContenido.setAttribute("style","font-weight: bold;color: #50565c;font-size: 20px;");
    textContenido.innerHTML = data.contenido;

    colContenido.appendChild(textContenido);
    rowContenido.appendChild(colContenido);

    const rowPrecio = document.createElement("div");
    rowPrecio.classList.add("row");

    const colPrecio = document.createElement("div");
    colPrecio.classList.add("col");

    const textPrecio = document.createElement("h4");
    textPrecio.classList.add("fw-bold");
    textPrecio.setAttribute("style","color: #009929;font-weight: bold;");
    textPrecio.innerHTML = data.precio + " " + data.moneda;

    colPrecio.appendChild(textPrecio);
    rowPrecio.appendChild(colPrecio);

    const rowSale = document.createElement("div");
    rowSale.classList.add("row");

    const colSale = document.createElement("div");
    colSale.classList.add("col");

    const textSale = document.createElement("p");
    textSale.innerHTML = "Sale a: " + data.sale;

    colSale.appendChild(textSale);
    rowSale.appendChild(colSale);

    const rowDescripcion = document.createElement("div");
    rowDescripcion.classList.add("row");

    const colDescripcion = document.createElement("div");
    colDescripcion.classList.add("col");

    const textDescripcion = document.createElement("p");
    textDescripcion.innerHTML = data.Descripcion;

    colDescripcion.appendChild(textDescripcion);
    rowDescripcion.appendChild(colDescripcion);

    const rowFooter = document.createElement("div");
    rowFooter.classList.add("row");

    const colInputNumber = document.createElement("div");
    colInputNumber.classList.add("col-xxl-4");
    colInputNumber.setAttribute("style","text-align: center;")

    const inputNumber = document.createElement("input");
    inputNumber.setAttribute("type","number");
    inputNumber.setAttribute("min","0");
    inputNumber.setAttribute("style","text-align: center;width: 40%;height: 100%;color: #009929;");

    colInputNumber.appendChild(inputNumber);
    
    const colBoton = document.createElement("div");
    colBoton.classList.add("col");
    colBoton.setAttribute("style","text-align: center;")

    const boton = document.createElement("buttton");
    boton.classList.add("boton");
    boton.setAttribute("type","button");
    boton.setAttribute("style","width: 70%;background: #009929");

    boton.addEventListener("click",event=>{
      event.preventDefault();
      this.saveProduct(id);
    })

    const iconCesta = document.createElement("i");
    iconCesta.classList.add("bi", "bi-bag-plus");

    boton.innerHTML = "A??adir a la cesta";

    boton.appendChild(iconCesta);
    colBoton.appendChild(boton);

    rowFooter.appendChild(colInputNumber);
    rowFooter.appendChild(colBoton);

    colProduct.appendChild(rowHeader);
    colProduct.appendChild(rowContenido);
    colProduct.appendChild(rowPrecio);
    colProduct.appendChild(rowSale);
    colProduct.appendChild(rowDescripcion);
    colProduct.appendChild(rowFooter);

    modal.appendChild(colImg);
    modal.appendChild(colProduct);
    
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
      total[0].textContent = this.totalProductos().subtotal + " " + "???";
      total[1].textContent = this.totalProductos().total+ " " + "???";
      //???
      
    }
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
    total[0].textContent = this.totalProductos().subtotal + "???";
    total[1].textContent = this.totalProductos().total + "???";
    const titulo = document.getElementById("modal-tittle-carrito") as HTMLElement;
    titulo.textContent = `MI CARRITO (${JSON.parse(localStorage.getItem("producto") as string).length})`;

  }

  saveProduct(id: string){
    const carrito = localStorage.getItem("producto");
    
    this.api.getProductById(id).subscribe((data:any)=>{
      if(carrito){
        let cesta = JSON.parse(carrito);
        const existe = this.existeProductCarrito(cesta,id);
        if(existe.cantidad){
          cesta[existe.index].cantidad = existe.cantidad +1;
          localStorage.setItem("producto", JSON.stringify(cesta));
        }else{
          cesta.push({data: data, cantidad: 1});
          localStorage.setItem("producto", JSON.stringify(cesta));
        }
      }else{
        localStorage.setItem("producto", JSON.stringify([{data: data, cantidad: 1}]));
      }

      const compra = JSON.parse(localStorage.getItem("producto") as string);
      const index = this.existeProductCarrito(compra,id);
      this.fillModalCarrito(compra[index.index]);

    });
  }


}
