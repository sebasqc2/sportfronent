import { Persona } from "./persona";
import { Acudiente } from "./acudiente";
import { Valoraciones } from "./valoraciones";

export class Alumno extends Persona{
    public ID_ALUMNO: number;
    public FECHA_NACIMIENTO: Date;
    public FECHA_INGRESO:Date;
    public acudiente: Acudiente;
    public valoraciones: Array<Valoraciones>; 
    
      constructor() { 
          super();
          this.ID_ALUMNO=0;
          this.FECHA_NACIMIENTO = new Date();
          this.FECHA_INGRESO = new Date();
          this.acudiente = new Acudiente();
          this.valoraciones = [];
       }
    }
    