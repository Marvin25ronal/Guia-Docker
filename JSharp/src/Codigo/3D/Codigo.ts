export abstract class Codigo {
    linea;
    columna;
    numero;
    abstract Codigo(): string;
    constructor(linea, col0) {
        this.linea = linea;
        this.columna = col0;
    }
}