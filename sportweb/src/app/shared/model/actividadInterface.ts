export interface actividadInterface {
    idactividad?: string;
    categoria: string;
    lugar: string;
    nombreactividad: string;
    fecha: Date;
    horainicio: string;
    duracion?: number;
    observaciones?: string;
}