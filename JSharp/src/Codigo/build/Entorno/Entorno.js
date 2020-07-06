"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Entorno = /** @class */ (function () {
    function Entorno(padre, tipo) {
        this.padre = padre;
        this.tipo = tipo;
        this.correlativovar = 0;
        this.tabla = new Map();
        this.etiquetaSalida = null;
        this.veniaretorno = false;
        VarGlobal_1.VarGlobal.getInstance().pilaEntornos.push(this);
    }
    Entorno.prototype.insertar = function (s, n) {
        this.tabla.set(n, s);
    };
    Entorno.prototype.insertarGlobal = function (s, n) {
        var aux = this;
        while (aux.padre != null) {
            aux = aux.padre;
        }
        var exis = aux.getSimbolo(n);
        if (exis != null) {
            var funcion = exis;
            var funaxu = exis;
            while (funcion.siguiente != null) {
                funcion = funcion.siguiente;
            }
            funcion.siguiente = s;
            return;
        }
        aux.insertar(s, n);
    };
    Entorno.prototype.GetPosicionStackVar = function () {
        // console.log(this.correlativovar)
        var e = this;
        var contador = 0;
        contador = this.getSumaVar();
        while (e.tipo != TipoEntorno.FUNCION) {
            contador += e.padre.getSumaVar();
            e = e.padre;
        }
        return contador;
    };
    Entorno.prototype.getPos = function () {
        return this.correlativovar++;
    };
    Entorno.prototype.ObtenerRetorono = function () {
        var a = this;
        while (a != null) {
            if (a.tipo == TipoEntorno.FUNCION) {
                return a.etiquetaSalida;
            }
            a = a.padre;
        }
        return null;
    };
    Entorno.prototype.TipoRetorno = function () {
        var a = this;
        while (a != null) {
            if (a.tipo == TipoEntorno.FUNCION) {
                return a.tipoFuncion;
            }
            a = a.padre;
        }
        return null;
    };
    Entorno.prototype.huboretorno = function () {
        var a = this;
        while (a != null) {
            if (a.tipo == TipoEntorno.FUNCION) {
                a.veniaretorno = true;
            }
            a = a.padre;
        }
        return null;
    };
    Entorno.prototype.getSumaVar = function () {
        //-2 this return *4 que cada variable va a tener 4 posiciciones
        //valor
        //isglobal
        //ref-valor
        //tipo--->
        if (this.tipo != TipoEntorno.FUNCION) {
            return this.correlativovar * 1;
        }
        return (this.correlativovar * 1) + 2;
    };
    Entorno.prototype.getSimbolo = function (s) {
        var aux = this;
        while (aux != null) {
            var variable = aux.tabla.get(s);
            if (variable != null) {
                return variable;
            }
            aux = aux.padre;
        }
        return null;
    };
    Entorno.prototype.existeEntorno = function (nombre) {
        return this.tabla.has(nombre);
    };
    Entorno.prototype.existe = function (nombre) {
        var aux = this;
        while (aux != null) {
            if (aux.existeEntorno(nombre)) {
                return true;
            }
            aux = aux.padre;
        }
        return false;
    };
    Entorno.prototype.existeGlobal = function (nombre) {
        var aux = this;
        while (aux.padre != null) {
            if (aux.existeEntorno(nombre)) {
                return true;
            }
            aux = aux.padre;
        }
        if (aux.existeEntorno(nombre)) {
            return true;
        }
        return false;
    };
    Entorno.prototype.cicloBreakMasCercano = function () {
        var aux = this;
        while (aux != null) {
            if (aux.tipo == TipoEntorno.CICLO) {
                return aux.etiquetaSalida;
            }
            else if (aux.tipo == TipoEntorno.FUNCION) {
                return null;
            }
            else if (aux.tipo == TipoEntorno.SWITCH) {
                return aux.etiquetaSalida;
            }
            aux = aux.padre;
        }
        return null;
    };
    Entorno.prototype.cicloContinueMasCercano = function () {
        var aux = this;
        while (aux != null) {
            if (aux.tipo == TipoEntorno.CICLO) {
                return aux.etiquetaContinue;
            }
            else if (aux.tipo == TipoEntorno.FUNCION) {
                return null;
            }
            aux = aux.padre;
        }
        return null;
    };
    return Entorno;
}());
exports.Entorno = Entorno;
var TipoEntorno;
(function (TipoEntorno) {
    TipoEntorno["CICLO"] = "CICLO";
    TipoEntorno["FUNCION"] = "FUNCION";
    TipoEntorno["IF"] = "IF";
    TipoEntorno["GLOBAL"] = "GLOBAL";
    TipoEntorno["SWITCH"] = "SWITCH";
})(TipoEntorno = exports.TipoEntorno || (exports.TipoEntorno = {}));
//# sourceMappingURL=Entorno.js.map