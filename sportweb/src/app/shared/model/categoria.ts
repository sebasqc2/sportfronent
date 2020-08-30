import {Actividad} from './actividad';
import {Alumno} from './alumno';

export class Categoria {
    
    public ID_CATEGORIA : number;
    public NOMBRE_CATEGORIA : string;
    public alumnos : Array<Alumno>
    public ACTIVIDADES : Array<Actividad>;
    public deporte: string;

    constructor(){
        this.ID_CATEGORIA = 0;
        this.NOMBRE_CATEGORIA = '';
        this.alumnos = [];
        this.ACTIVIDADES = [];
        this.deporte ='';
    }
}