import { Simbolo } from './Simbolo'
import { Funcion } from './Funcion';
import { Etiqueta } from '../3D/Etiqueta';
import { TipoExp } from '../Expresion/TipoExp';
import { VarGlobal } from '../Global/VarGlobal';
export class Entorno {
    padre: Entorno;
    tabla: Map<string, Simbolo>;
    tipo: TipoEntorno
    correlativovar: number
    etiquetaSalida: Etiqueta;
    etiquetaContinue: Etiqueta;
    tipoFuncion: TipoExp;
    veniaretorno: boolean
    constructor(padre, tipo: TipoEntorno) {
        this.padre = padre;
        this.tipo = tipo;
        this.correlativovar = 0;
        this.tabla = new Map();
        this.etiquetaSalida = null;
        this.veniaretorno = false;
        VarGlobal.getInstance().pilaEntornos.push(this);

    }
    insertar(s: Simbolo, n: string) {
        this.tabla.set(n, s);
    }
    insertarGlobal(s: Simbolo, n: string) {
        var aux: Entorno = this;
        while (aux.padre != null) {
            aux = aux.padre
        }
        let exis = aux.getSimbolo(n);
        if (exis != null) {
            let funcion = exis as Funcion;
            let funaxu = exis;
            while (funcion.siguiente != null) {
                funcion = funcion.siguiente;
            }
            funcion.siguiente = s as Funcion;
            return;
        }
        aux.insertar(s, n);
    }
    GetPosicionStackVar() {
        // console.log(this.correlativovar)
        let e: Entorno = this;
        let contador = 0;
        contador = this.getSumaVar();
        while (e.tipo != TipoEntorno.FUNCION) {
            contador += e.padre.getSumaVar();
            e = e.padre;
        }
        return contador;
    }
    getPos() {
        return this.correlativovar++;
    }
    ObtenerRetorono() {
        let a: Entorno = this;
        while (a != null) {
            if (a.tipo == TipoEntorno.FUNCION) {
                return a.etiquetaSalida;
            }
            a = a.padre;
        }
        return null;
    }
    TipoRetorno() {
        let a: Entorno = this;
        while (a != null) {
            if (a.tipo == TipoEntorno.FUNCION) {
                return a.tipoFuncion;
            }
            a = a.padre;
        }
        return null;
    }
    huboretorno() {
        let a: Entorno = this;
        while (a != null) {
            if (a.tipo == TipoEntorno.FUNCION) {
                a.veniaretorno = true;
            }
            a = a.padre;
        }
        return null;
    }
    getSumaVar() {
        //-2 this return *4 que cada variable va a tener 4 posiciciones
        //valor
        //isglobal
        //ref-valor
        //tipo--->

        if (this.tipo != TipoEntorno.FUNCION) { return this.correlativovar * 1 }
        return (this.correlativovar * 1) + 2;
    }
    getSimbolo(s: string) {
        let aux: Entorno = this;
        while (aux != null) {
            let variable = aux.tabla.get(s);
            if (variable != null) {
                return variable;
            }
            aux = aux.padre;
        }
        return null;
    }
    existeEntorno(nombre: string): boolean {
        return this.tabla.has(nombre);
    }
    existe(nombre: string) {
        let aux: Entorno = this;
        while (aux != null) {
            if (aux.existeEntorno(nombre)) {
                return true;
            }
            aux = aux.padre;
        }
        return false;
    }
    existeGlobal(nombre: string) {
        var aux: Entorno = this;
        while (aux.padre != null) {
            if (aux.existeEntorno(nombre)) {
                return true;
            }
            aux = aux.padre
        }
        if (aux.existeEntorno(nombre)) {
            return true;
        }
        return false;
    }
    cicloBreakMasCercano() {
        let aux: Entorno = this;
        while (aux != null) {
            if (aux.tipo == TipoEntorno.CICLO) {
                return aux.etiquetaSalida;
            } else if (aux.tipo == TipoEntorno.FUNCION) {
                return null;
            } else if (aux.tipo == TipoEntorno.SWITCH) {
                return aux.etiquetaSalida;
            }
            aux = aux.padre;
        }
        return null;
    }
    cicloContinueMasCercano() {
        let aux: Entorno = this;
        while (aux != null) {
            if (aux.tipo == TipoEntorno.CICLO) {
                return aux.etiquetaContinue;
            } else if (aux.tipo == TipoEntorno.FUNCION) {
                return null;
            }
            aux = aux.padre;
        }
        return null;
    }
}
export enum TipoEntorno {
    CICLO = "CICLO",
    FUNCION = "FUNCION",
    IF = "IF",
    GLOBAL = "GLOBAL",
    SWITCH = "SWITCH",
}