"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TipoExp_1 = require("../Expresion/TipoExp");
var VarGlobal_1 = require("../Global/VarGlobal");
var Entorno_1 = require("../Entorno/Entorno");
var Errores_1 = require("../Reportes/Errores");
var Funcion_1 = require("../Entorno/Funcion");
var Traduccion_1 = require("../3D/Traduccion");
var Etiqueta_1 = require("../3D/Etiqueta");
var Declaracion_1 = require("./Declaracion");
var Expresion_1 = require("../Expresion/Expresion");
var Acceso_1 = require("../Expresion/Acceso");
var Variable_1 = require("../Entorno/Variable");
var Return_1 = require("../Expresion/Return");
var DecFuncion = /** @class */ (function () {
    function DecFuncion(tipo, identificador, lista, ins, isarray, linea, columna) {
        this.tipo = tipo;
        this.id = identificador;
        this.listaParametros = lista;
        this.instrucciones = ins;
        this.linea = linea;
        this.columna = columna;
        this.isarray = isarray;
    }
    DecFuncion.prototype.CrearFuncion = function (e) {
        //console.log('eeee')
        var llave = this.GenerarLlave();
        //console.log(llave)
        if (e.existeGlobal("FUNCION_" + llave)) {
            console.log('e');
            var simbolo = e.getSimbolo("FUNCION_" + llave);
            var funcion = simbolo;
            var nombre = this.GenerarNombre(e);
            if (this.ExisteFuncion(funcion, nombre)) {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "Funcion ya declarada " + llave, 3));
                return false;
            }
            var aux = this;
            var nueva = new Funcion_1.Funcion(nombre, this.listaParametros, this.tipo, aux, this.linea, this.columna);
            this.InsertarFuncion(funcion, nueva);
            return true;
        }
        else {
            if (this.ParametrosNoCorrectos()) {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "Funcion con parametros incorrectos ", 3));
                return false;
            }
            var nombre = this.GenerarNombre(e);
            var aux = this;
            var nueva = new Funcion_1.Funcion(nombre, this.listaParametros, this.tipo, aux, this.linea, this.columna);
            e.insertarGlobal(nueva, "FUNCION_" + llave);
            return true;
        }
    };
    DecFuncion.prototype.InsertarFuncion = function (fun, nueva) {
        var a = fun;
        console.log(a);
        while (a.siguiente != null) {
            a = a.siguiente;
        }
        a.siguiente = nueva;
    };
    DecFuncion.prototype.ExisteFuncion = function (fun, nombre) {
        var a = fun;
        while (a != null) {
            if (a.nombre == nombre) {
                return true;
            }
            a = a.siguiente;
        }
        return false;
    };
    DecFuncion.prototype.TraducirInstruccion = function (e) {
        var nuevoE = new Entorno_1.Entorno(e, Entorno_1.TipoEntorno.FUNCION);
        nuevoE.tipoFuncion = this.tipo;
        //debugger;
        if (this.listaParametros != null) {
            for (var i = 0; i < this.listaParametros.length; i++) {
                var aux = this.listaParametros[i];
                var id = aux.id.val;
                var tipo = aux.tipo;
                var vari = new Variable_1.Variable(id, TipoExp_1.Tipo.NORMAL, Entorno_1.TipoEntorno.FUNCION, tipo, this.linea, this.columna);
                vari.setRef(nuevoE.GetPosicionStackVar());
                nuevoE.insertar(vari, id);
                nuevoE.correlativovar++;
            }
        }
        return this.TraducirFuncion(nuevoE);
    };
    DecFuncion.prototype.TraducirFuncion = function (e) {
        var codigo = "";
        var indicesalida = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
        e.etiquetaSalida = new Etiqueta_1.Etiqueta("L" + indicesalida + ":\n", indicesalida);
        codigo += "proc " + this.GenerarNombre(e) + " begin\n";
        if (this.instrucciones != null) {
            for (var i = 0; i < this.instrucciones.length; i++) {
                var aux = this.instrucciones[i];
                if (aux instanceof Declaracion_1.Declaracion) {
                    var traddec = aux.DeclararFuncion(e);
                    if (traddec == null) {
                        continue;
                    }
                    codigo += traddec.ObtenerCodigo();
                }
                else if (aux instanceof Expresion_1.Expresion) {
                    var traduce = aux.TraducirExp(e);
                    if (traduce == null) {
                        continue;
                    }
                    codigo += traduce.ObtenerCodigo();
                }
                else if (aux instanceof Acceso_1.Acceso) {
                    var trad = aux.TraducirExp(e);
                    if (trad == null) {
                        continue;
                    }
                    codigo += trad.ObtenerCodigo();
                }
                else if (aux instanceof Return_1.Return) {
                    var renuevo = new Entorno_1.Entorno(e, Entorno_1.TipoEntorno.IF);
                    var trad = aux.TraducirExp(renuevo);
                    if (trad == null) {
                        continue;
                    }
                    codigo += trad.ObtenerCodigo();
                }
                else if (aux) {
                    var trad = aux.TraducirInstruccion(e);
                    if (trad == null) {
                        continue;
                    }
                    codigo += trad.ObtenerCodigo();
                }
            }
        }
        codigo += "" + e.etiquetaSalida.etiqueta;
        codigo += "end\n";
        return new Traduccion_1.Traduccion(null, codigo);
    };
    DecFuncion.prototype.ParametrosNoCorrectos = function () {
        var nombres = [];
        if (this.listaParametros != null) {
            for (var i = 0; i < this.listaParametros.length; i++) {
                var aux = this.listaParametros[i];
                if (aux.tipo.isEstruct()) {
                    //cuando son struct
                }
                else {
                    var par = this.listaParametros[i];
                    if (nombres.includes(par.id.val)) {
                        return true;
                    }
                    nombres.push(par.id.val);
                }
            }
        }
        return false;
    };
    DecFuncion.prototype.getLinea = function () {
        return this.linea;
    };
    DecFuncion.prototype.getColumna = function () {
        return this.columna;
    };
    DecFuncion.prototype.GenerarLlave = function () {
        var llave = '';
        if (this.tipo.tipo == TipoExp_1.Tipo.STRUCT) {
            //cuando sean struck
        }
        else {
            llave += "" + this.id.val;
        }
        return llave;
    };
    DecFuncion.prototype.GenerarLlave2 = function () {
        var llave = '';
        if (this.tipo.tipo == TipoExp_1.Tipo.STRUCT) {
            //cuando sean struck
        }
        else {
            llave += this.tipo.toString().toLowerCase() + ("_" + this.id.val);
        }
        return llave;
    };
    DecFuncion.prototype.GenerarNombre = function (e) {
        var cad = '';
        if (this.listaParametros != null) {
            for (var i = 0; i < this.listaParametros.length; i++) {
                var aux = this.listaParametros[i];
                if (aux.tipo.esNumero()) {
                    cad += "NUMERO";
                }
                else if (aux.tipo.isEstruct()) {
                }
                else {
                    cad += aux.tipo.toString();
                }
            }
            return "FUNCION_" + this.tipo.toString() + "_" + this.id.val + "_" + cad;
        }
        return "FUNCION_" + this.tipo.toString() + "_" + this.id.val;
    };
    DecFuncion.prototype.GenerarNodo = function (padre) {
        var indiceDec = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        var indiceTipo = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        var indiceparametros = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        var codigo = [];
        var enlace = [];
        codigo.push({ data: { id: "" + indiceDec, name: 'DECLARACIONFUNCION', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        codigo.push({ data: { id: "" + indiceTipo, name: "TIPO{" + this.tipo.toString() + "}", weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indiceDec, faveColor: '#6FB1FC', strength: 90 } });
        enlace.push({ data: { source: "" + indiceDec, target: "" + indiceTipo, faveColor: '#6FB1FC', strength: 90 } });
        var json4 = this.id.GenerarNodo(indiceDec);
        var json = JSON.parse(json4);
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        codigo.push({ data: { id: "" + indiceparametros, name: "Parametros", weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + indiceDec, target: "" + indiceparametros, faveColor: '#6FB1FC', strength: 90 } });
        if (this.listaParametros != null) {
            for (var i = 0; i < this.listaParametros.length; i++) {
                var cad = this.listaParametros[i].ConstruirNodo(indiceparametros);
                var json_1 = JSON.parse(cad.toString());
                codigo = codigo.concat(json_1.nodo);
                enlace = enlace.concat(json_1.enlace);
            }
        }
        //console.log(this.instrucciones);
        var indiceCuerpo = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indiceCuerpo, name: "CUERPO", weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + indiceDec, target: "" + indiceCuerpo, faveColor: '#6FB1FC', strength: 90 } });
        if (this.instrucciones != null) {
            for (var i = 0; i < this.instrucciones.length; i++) {
                var cad = this.instrucciones[i].GenerarNodo(indiceCuerpo);
                var json_2 = JSON.parse(cad.toString());
                codigo = codigo.concat(json_2.nodo);
                enlace = enlace.concat(json_2.enlace);
            }
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return DecFuncion;
}());
exports.DecFuncion = DecFuncion;
//# sourceMappingURL=DecFuncion.js.map