import { Document } from "mongoose";
export default interface IProduct extends Document {
    id: number;
    nombre: string;
    contenido: string;
    precio: number;
    moneda: string;
    sale: string;
    img: string;
    Descripcion: string;

  }
  