import { Codigo } from "./Codigo";

export class Declaracionpila extends Codigo {
    pila: boolean
    constructor(pila, linea, columna) {
        super(linea, columna);
        this.pila = pila;
    }
    Codigo(): string {
        if (this.pila)
            return `var Stack[];\n`
        else
            return `var Heap[];\n`
    }

}