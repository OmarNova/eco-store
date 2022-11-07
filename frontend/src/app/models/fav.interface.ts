


interface productFavI{
    _id:number;
    nombre: string;
    contenido: string;
    precio: number;
    moneda: string;
    sale: string;
    img: string;
    Descripcion: string;

}

export interface FavI{
    error: boolean;
    message: string;
    data?: productFavI;
}