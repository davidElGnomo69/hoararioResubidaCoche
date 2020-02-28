import { MateriaHoras } from './materiaHoras';
export class Horario{
    private _grupo:string ; 

    private _cuadrante:MateriaHoras[][];


	constructor(grupo:string, cuadrante:MateriaHoras[][] ) {
        this.grupo=grupo;
 
        this.cuadrante=cuadrante;
	}
	


    /**
     * Getter grupo
     * @return {string }
     */
	public get grupo(): string  {
		return this._grupo;
	}

   

    /**
     * Getter cuadrante
     * @return {MateriaHoras[][]}
     */
	public get cuadrante(): MateriaHoras[][] {
		return this._cuadrante;
	}

    /**
     * Setter grupo
     * @param {string } value
     */
	public set grupo(value: string ) {
		this._grupo = value;
	}

   

    /**
     * Setter cuadrante
     * @param {MateriaHoras[][]} value
     */
	public set cuadrante(value: MateriaHoras[][]) {
		this._cuadrante = value;
	}
   

}