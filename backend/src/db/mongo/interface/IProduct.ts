import { Document } from "mongoose";
export default interface IProduct extends Document {
    _id: string;
    nombre: string;
    contenido: string;
    precio: number;
    moneda: string;
    sale: string;
    img: string;
    Descripcion: string;

  }
  