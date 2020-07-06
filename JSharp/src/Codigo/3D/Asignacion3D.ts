import { Codigo } from "./Codigo";

export class Asignacion3D extends Codigo {
    Asignando: string;
    Valor1:string 
    Valor2:string
    signo: string
    stack: boolean
    heap: boolean
    constructor( a, v, v2, si, linea, columna) {
        super(linea, columna);
        this.numero=0;
        this.Asignando = a;
        this.Valor1 = v;
        this.Valor2 = v2;
        this.signo = si;

    }
    Codigo(): string {
        //let Codigo=document.createTextNode('')
        if (this.Valor2 != null) {
            return `${this.Asignando}=${this.Valor1}${this.signo}${this.Valor2};\n`;
        }
       
        return `${this.Asignando}=${this.Valor1};\n`
    }
}