export class MateriaHoras{

    private _materia:string[];


	constructor(materias : string[]) {
        this._materia = materias;
	}


    /**
     * Getter materia
     * @return {string[]}
     */
	public get materia(): string[] {
		return this._materia;
	}

    /**
     * Setter materia
     * @param {string[]} value
     */
	public set materia(value: string[]) {
		this._materia = value;
	}
	
    
}