import {Categoria} from './categoria';
export class Deporte{
    public ID_DEPORTE: number;
    public NOMBRE: string;
    public CATEGORIAS: Array<Categoria>;

    constructor(){
        this.ID_DEPORTE = 0;
        this.NOMBRE = '';
        this.CATEGORIAS = [];
    }
}
