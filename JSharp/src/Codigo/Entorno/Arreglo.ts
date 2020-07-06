import { Simbolo } from "./Simbolo";
import { TipoExp, Tipo } from "../Expresion/TipoExp";
import { TipoEntorno } from "./Entorno";
import { Etiqueta } from "../3D/Etiqueta";

export class Arreglo extends Simbolo {
    modificador: Tipo
    ref: number
    nombre: string
    ambito: TipoEntorno
    getTipoPrimario(): import("../Expresion/TipoExp").Tipo {
        return this.tipo.tipo;
    }
    getTipoSecundario(): string {
        throw new Error("Method not implemented.");
    }
    TipoArreglo() {
        return this.tipo.tipoarray;
    }
    TipoArregloEstructura() {
        return this.tipo.estructname;
    }
    constructor(nombre: string, modificador: Tipo, ambito: TipoEntorno, tipo,  linea, columna) {
        super(tipo, linea, columna);
        this.nombre = nombre;
        this.modificador = modificador;
        this.ambito = ambito;
    }     
}