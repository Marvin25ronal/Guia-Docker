import { Codigo } from "./Codigo";

export class Llamada extends Codigo {
    id: string
    Codigo(): string {
        return `call ${this.id};\n`
    }

    constructor(id, linea, columna) {
        super(linea, columna)
        this.id = id;
        this.numero=5;
    }
}