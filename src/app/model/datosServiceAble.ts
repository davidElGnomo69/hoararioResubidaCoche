import { Horario } from './horario';


export interface DatosServiceAble{
    getEstudios();
    getGrupos(estudios:string);
    getHorario(grupo:string):Horario;
    getDescription(materias:string[]);
}