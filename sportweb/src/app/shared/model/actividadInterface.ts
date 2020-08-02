export interface actividadInterface {
    idactividad?: string;
    curso: string;
    lugar: string;
    nombreactividad: string;
    fecha: Date;
    horainicio: string;
    duracion?: number;
    observaciones?: string;
}