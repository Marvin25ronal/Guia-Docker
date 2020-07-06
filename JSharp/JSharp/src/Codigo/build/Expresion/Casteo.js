"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Traduccion_1 = require("../3D/Traduccion");
var Errores_1 = require("../Reportes/Errores");
var Etiqueta_1 = require("../3D/Etiqueta");
var Casteo = /** @class */ (function () {
    function Casteo(tipo, exp, linea, columna) {
        this.tipo = tipo;
        this.exp = exp;
        this.columna = columna;
        this.linea = linea;
    }
    Casteo.prototype.GetTipo = function (e) {
        return this.tipo;
    };
    Casteo.prototype.TraducirExp = function (e) {
        var tipoexpresion = this.exp.GetTipo(e);
        if (tipoexpresion == null) {
            return null;
        }
        if (tipoexpresion.isDouble()) {
            var expr = this.exp.TraducirExp(e);
            if (expr == null) {
                return null;
            }
            if (this.tipo.isInteger()) {
                //se tiene que truncar
                var codigo = document.createTextNode("");
                var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                var res = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                codigo.appendData(expr.ObtenerCodigo().toString());
                codigo.appendData("t" + indice + "=t" + expr.ObtenerEtiquetas()[0].indice + ";\n");
                codigo.appendData("t" + indice2 + "=t" + indice + "%1;\n");
                codigo.appendData("t" + res + "=t" + indice + "-t" + indice2 + ";\n");
                VarGlobal_1.VarGlobal.getInstance().Apilar(res);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + res, res)], codigo.textContent);
            }
            else if (this.tipo.isChar()) {
                //Hacer un nuevo arreglo con string
                var codigo = document.createTextNode("");
                var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                var th = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                var res = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                var res2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                codigo.appendData(expr.ObtenerCodigo().toString());
                codigo.appendData("t" + indice + "=t" + expr.ObtenerEtiquetas()[0].indice + ";\n");
                codigo.appendData("t" + indice2 + "=t" + indice + "%1;\n");
                codigo.appendData("t" + res + "=t" + indice + "-t" + indice2 + ";\n");
                codigo.appendData("t" + th + "=H;\n");
                codigo.appendData("Heap[t" + th + "]=t" + res + ";\n");
                codigo.appendData("H=H+1;\n");
                codigo.appendData("Heap[H]=-1;\n");
                codigo.appendData("H=H+1;\n");
                codigo.appendData("t" + res2 + "=t" + th + ";\n");
                VarGlobal_1.VarGlobal.getInstance().Apilar(res2);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + res2, res2)], codigo.textContent);
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "no se puede castear el double", 3));
                return null;
            }
        }
        else if (tipoexpresion.isChar()) {
            var expr = this.exp.TraducirExp(e);
            if (expr == null) {
                return null;
            }
            if (this.tipo.esNumero()) {
                var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                var ret = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                var codigo = document.createTextNode("");
                codigo.appendData(expr.ObtenerCodigo().toString());
                codigo.appendData("t" + indice + "=t" + expr.ObtenerEtiquetas()[0].indice + ";\n");
                codigo.appendData("t" + ret + "=Heap[t" + indice + "];\n");
                VarGlobal_1.VarGlobal.getInstance().Apilar(ret);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + ret, ret)], codigo.textContent);
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "no se puede castear el char", 3));
                return null;
            }
        }
        else if (tipoexpresion.isInteger()) {
            var expr = this.exp.TraducirExp(e);
            if (expr == null) {
                return null;
            }
            if (this.tipo.esNumero()) {
                return expr;
            }
            else if (this.tipo.isChar()) {
                var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                var res = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                var codigo = document.createTextNode('');
                codigo.appendData("t" + indice + "=t" + expr.ObtenerEtiquetas()[0].indice + ";\n");
                codigo.appendData("t" + res + "=Heap[t" + indice + "];\n");
                VarGlobal_1.VarGlobal.getInstance().Apilar(res);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + res, res)], codigo.textContent);
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "no se puede castear el entero", 3));
                return null;
            }
        }
    };
    Casteo.prototype.getLinea = function () {
        return this.linea;
    };
    Casteo.prototype.getColumna = function () {
        return this.columna;
    };
    Casteo.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        var indicetipo = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'CASTEO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        codigo.push({ data: { id: "" + indicetipo, name: "TIPO{" + this.tipo.toString() + "}", weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        enlace.push({ data: { source: "" + indice, target: "" + indicetipo, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.exp.GenerarNodo(indice);
        var json = JSON.parse(cad);
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return Casteo;
}());
exports.Casteo = Casteo;
//# sourceMappingURL=Casteo.js.map