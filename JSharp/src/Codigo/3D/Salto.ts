import { Codigo } from "./Codigo";

export class Salto extends Codigo {
    salto: string
    constructor(salto, linea, columna) {
        super(linea, columna);
        this.salto = salto;
        this.numero = 2;
    }
    Codigo(): string {
        return `goto ${this.salto};\n`
    }

}