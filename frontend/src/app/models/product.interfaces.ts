export interface dataProducts{
    _id:number;
    nombre: string;
    contenido: string;
    precio: number;
    moneda: string;
    sale: string;
    img: string;
    Descripcion: string;

}

export interface ProductsI{
    product: dataProducts[];
    length: number;

}