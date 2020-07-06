import { Simbolo } from "./Simbolo";
import { TipoExp, Tipo } from "../Expresion/TipoExp";
import { TipoEntorno } from "./Entorno";

export class Variable extends Simbolo {
    modificador: Tipo
    ref: number;
    ambito: TipoEntorno
    nombre: string
    constructor(nombre: string, modificador: Tipo, ambito: TipoEntorno, tipo: TipoExp, linea, columna) {
        super(tipo, linea, columna);
        this.modificador = modificador;
        this.ambito = ambito;
        this.nombre = nombre;
    }
    setRef(n: number) {
        this.ref = n;
    }
}