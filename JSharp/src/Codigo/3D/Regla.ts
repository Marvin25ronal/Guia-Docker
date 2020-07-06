export class Regla {
    regla: number
    linea: number
    columna: number
    eliminado:string
    constructor(regla, linea, columna,eliminado) {
        this.regla = regla;
        this.linea = linea;
        this.columna = columna;
        this.eliminado=eliminado;
    }
}