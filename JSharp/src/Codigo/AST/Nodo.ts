export abstract class Nodo {
    linea: number;
    columna: number;
    constructor(linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
    }
    getLinea(): number {
        return this.linea;
    }
    getColumna(): number {
        return this.columna;
    }
    public abstract GenerarNodo(padre:number);
    
}