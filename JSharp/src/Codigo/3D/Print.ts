import { Codigo } from "./Codigo";

export class Print extends Codigo {
    tipo: string
    etiqueta: string
    constructor(tipo, etiqueta, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.etiqueta = etiqueta;
    }
    Codigo(): string {
        return `print("${this.tipo}",${this.etiqueta});\n`
    }

}