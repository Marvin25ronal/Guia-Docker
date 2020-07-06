import { Simbolo } from "./Simbolo";
import { Parametros } from "../Instruccion/Parametros";
import { TipoEntorno } from "./Entorno";
import { DecFuncion } from "../Instruccion/DecFuncion";

export class Funcion extends Simbolo {
    parametros: Parametros[]
    nombre: string
    ambito: TipoEntorno
    siguiente: Funcion;
    cuerpoparatraducir: DecFuncion;
    constructor(nombre: string, parametros, tipo, cuerpo: DecFuncion, linea, columna) {
        super(tipo, linea, columna)
        this.nombre = nombre;
        this.parametros = parametros;
        this.siguiente = null;
        this.cuerpoparatraducir = cuerpo;
    }
    obtenerCadena() {
        let cad = ''
        if (this.parametros != null) {
            for (let i = 0; i < this.parametros.length; i++) {
                let aux = this.parametros[i];
                if (aux.tipo.esNumero()) {
                    cad += `NUMERO`;
                } else if (aux.tipo.isEstruct()) {

                } else {
                    cad += aux.tipo.toString();
                }
            }
            return `FUNCION_${this.tipo.toString()}_${this.nombre}_` + cad;
        }
        return `FUNCION_${this.tipo.toString()}_${this.nombre}`;
    }
    obtenerFuncion(nombre: string) {
        let aux: Funcion = this;
        while (aux != null) {
            if (aux.nombre == nombre) {
                return aux;
            }
            aux = aux.siguiente;
        }
        return null;
    }
}