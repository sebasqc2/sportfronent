import {Lugar} from './lugar';

export class Actividad {
    ID_ACTIVIDAD: number;
    NOMBRE_ACTIVIDAD: string;
    FECHA: Date;
    HORA: Date;
    DURACION: number;
    OBSERVACION: string;
    LUGAR : Lugar; 

    constructor(){
        this.ID_ACTIVIDAD = 0;
        this.NOMBRE_ACTIVIDAD = '';
        this.FECHA = new Date();
        this.HORA = new Date();
        this.DURACION = 0;
        this.OBSERVACION = '';
        this.LUGAR = new Lugar();
    }
}