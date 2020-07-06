import { Codigo } from "./Codigo";

export class Metodo extends Codigo {
    id: string
    cuerpo: Codigo[]
    Codigo(): string {
        let Codigo="";
        Codigo+=`proc ${this.id} begin\n`
        for(let i=0;i<this.cuerpo.length;i++){
            Codigo+=this.cuerpo[i].Codigo();
        }
        Codigo+=`end\n`
        return Codigo;
    }
    constructor(id, curpo, linea, columna) {
        super(linea, columna);
        this.cuerpo = curpo;
        this.id = id;
        this.numero=1;
    }

}