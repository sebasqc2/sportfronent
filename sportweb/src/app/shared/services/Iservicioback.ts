import {actividadInterface} from '../model/actividadInterface';
import {cursosInterface} from '../model/cursosInterface';
import { categoriasInterface } from '../model/categoriasInterface';

export interface Iservicioback {
    
    /**
     * obtiene todos los cursos disponibles  en la escuela
     * obtenerCursos
     */
    obtenerCursos(url: string);

    /**
     * Agrega una actividad a la lista de actividades de la escuela
     */
    agregarActividad(url: string,actividad: actividadInterface); 

    /**
     * obtenerCategorias
     */
     obtenerCategorias(url: string);
}