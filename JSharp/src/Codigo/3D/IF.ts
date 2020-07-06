import { Codigo } from "./Codigo";

export class IF extends Codigo{
    Codigo(): string {
        return `if (${this.Valor1}${this.signo}${this.Valor2}) goto ${this.Salto};\n`
    }
    Salto:string
    Valor1:string
    Valor2:string
    signo
    constructor(salto,v1,v2,s,linea,columna){
        super(linea,columna)
        this.Salto=salto;
        this.Valor1=v1;
        this.Valor2=v2;
        this.signo=s;
        this.numero=4
    }
}