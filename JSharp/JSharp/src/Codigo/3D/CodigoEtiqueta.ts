import { Codigo } from "./Codigo";

export class CodigoEtiqueta extends Codigo{
    id:string
    Codigo(): string {
        return this.id+":\n";
    }
    constructor(id,linea,columna){
        super(linea,columna);
        this.id=id;
        this.numero=3;
    }
}