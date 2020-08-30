import { Persona } from './persona';
import {Categoria} from './categoria'


export class Entrenador extends Persona{

    public ID_ENTRENADOR : number;
    public SALARIO : number;
    public FECHA_CONTRATACION : Date;
    public categorias: Array<Categoria>

    constructor() {
        super();
        this.ID_ENTRENADOR = 0;
        this.SALARIO = 0;
        this.FECHA_CONTRATACION = new Date();
        this.categorias= [];
    }
}