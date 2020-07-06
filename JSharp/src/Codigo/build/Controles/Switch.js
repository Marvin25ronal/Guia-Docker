"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Case_1 = require("./Case");
var Entorno_1 = require("../Entorno/Entorno");
var Traduccion_1 = require("../3D/Traduccion");
var Etiqueta_1 = require("../3D/Etiqueta");
var Switch = /** @class */ (function () {
    function Switch(cond, listacase, linea, columna) {
        this.condicion = cond;
        this.listacase = listacase;
        this.linea = linea;
        this.columna = columna;
    }
    Switch.prototype.TraducirInstruccion = function (e) {
        var nuevoE = new Entorno_1.Entorno(e, Entorno_1.TipoEntorno.SWITCH);
        var indisalida = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
        var etisalida = new Etiqueta_1.Etiqueta("L" + indisalida + ":\n", indisalida);
        nuevoE.etiquetaSalida = etisalida;
        var tipocon = this.condicion.GetTipo(nuevoE);
        if (tipocon == null) {
            return null;
        }
        var condi = this.condicion.TraducirExp(nuevoE);
        if (condi == null) {
            return null;
        }
        var codigo = document.createTextNode("");
        codigo.appendData(condi.ObtenerCodigo().toString());
        if (this.listacase != null) {
            var eti = null;
            for (var i = 0; i < this.listacase.length; i++) {
                if (this.listacase[i] instanceof Case_1.Case) {
                    var objcase = this.listacase[i];
                    objcase.siguientecase = eti;
                    objcase.tiposuperior = tipocon;
                    objcase.etiquetasuperior = condi.ObtenerEtiquetas()[0];
                    var res = objcase.TraducirInstruccion(nuevoE);
                    eti = objcase.siguientecase;
                    if (res == null) {
                        return null;
                    }
                    codigo.appendData(res.ObtenerCodigo().toString());
                }
                else {
                    var objelse = this.listacase[i];
                    codigo.appendData("L" + eti.indice + ":\n");
                    var res = objelse.TraducirInstruccion(nuevoE);
                    if (res == null) {
                        return null;
                    }
                    eti = null;
                    codigo.appendData(res.ObtenerCodigo().toString());
                }
            }
            if (eti != null) {
                codigo.appendData("L" + eti.indice + ":\n");
            }
        }
        codigo.appendData("L" + indisalida + ":\n");
        return new Traduccion_1.Traduccion([], codigo.textContent);
    };
    Switch.prototype.getLinea = function () {
        return this.linea;
    };
    Switch.prototype.getColumna = function () {
        return this.columna;
    };
    Switch.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'CONTROL_SWITCH', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.condicion.GenerarNodo(indice);
        var json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        if (this.listacase != null) {
            var indicec = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
            codigo.push({ data: { id: "" + indicec, name: 'CUERPO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
            enlace.push({ data: { source: "" + indice, target: "" + indicec, faveColor: '#6FB1FC', strength: 90 } });
            for (var i = 0; i < this.listacase.length; i++) {
                cad = this.listacase[i].GenerarNodo(indicec);
                json = JSON.parse(cad.toString());
                codigo = codigo.concat(json.nodo);
                enlace = enlace.concat(json.enlace);
            }
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return Switch;
}());
exports.Switch = Switch;
//# sourceMappingURL=Switch.js.map