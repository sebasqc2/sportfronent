export class Persona{
    public NOMBRE: string;
    public APELLIDO: string;
    public DIRECCION: string;
    public TELEFONO: string;
    public CORREO: string;
    public ESTADO: boolean;

    constructor() { 
        this.NOMBRE = '';
        this.APELLIDO = '';
        this.DIRECCION = '';
        this.TELEFONO = '';
        this.CORREO = '';
        this.ESTADO = false;
     }
}