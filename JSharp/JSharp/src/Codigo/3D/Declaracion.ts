import { Codigo } from "./Codigo";

export class Declaracion extends Codigo {
    variables: []
    constructor(vari, linea, columna) {
        super(linea, columna)
        this.variables = vari;
    }
    Codigo(): string {
        let Codigo = "var "
        for (let i = 0; i < this.variables.length; i++) {
            Codigo += this.variables[i]+",";
        }
        Codigo=Codigo.substring(0,Codigo.length-1);
        Codigo+=";\n"
        return Codigo;
    }

}