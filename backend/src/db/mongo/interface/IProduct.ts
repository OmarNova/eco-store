import { Document } from "mongoose";
export default interface IProduct extends Document {
<<<<<<< Updated upstream
    id:number;
=======
    id: number;
>>>>>>> Stashed changes
    nombre: string;
    contenido: string;
    precio: number;
    moneda: string;
    sale: string;
    img: string;
    Descripcion: string;

  }
  