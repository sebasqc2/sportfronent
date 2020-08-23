import { Persona } from "./persona";
import { Pago } from "./pago";

export class Alumno2 extends Persona{
    public ID_ALUMNO: number;
    public FECHA_NACIMIENTO: Date;
    public FECHA_INGRESO: Date;
    public mensualidades: Array<Pago>;
    public MESPAGO: string;


      constructor() {
          super();
          this.ID_ALUMNO=0;
          this.FECHA_NACIMIENTO = new Date();
          this.FECHA_INGRESO = new Date();
          this.mensualidades = [];
          this.MESPAGO = "";
       }
    }
