"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Errores_1 = require("../Reportes/Errores");
var TipoExp_1 = require("./TipoExp");
var Traduccion_1 = require("../3D/Traduccion");
var Etiqueta_1 = require("../3D/Etiqueta");
var AccesoArray = /** @class */ (function () {
    function AccesoArray(id, exp, linea, columna) {
        this.columna = columna;
        this.linea = linea;
        this.indice = exp;
        this.id = id;
    }
    AccesoArray.prototype.TraducirExp = function (e) {
        var simbolo = this.id.TraducirExp(e);
        if (simbolo == null) {
            return null;
        }
        //el indice en donde esta la pos de heap
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
        var tam = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
        var tpos = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
        var tretorno = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
        var L0 = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
        var L1 = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
        var Lsalida = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
        var arreglo = e.getSimbolo(this.id.val);
        var simboloarray = arreglo;
        if (simboloarray.tipo.tipoarray == TipoExp_1.Tipo.STRING || simboloarray.tipo.tipoarray == TipoExp_1.Tipo.CHAR) {
            var codigo = document.createTextNode('');
            // debugger;
            codigo.appendData(simbolo.ObtenerCodigo().toString());
            codigo.appendData("t" + indice + "=t" + simbolo.ObtenerEtiquetas()[0].indice + ";\n");
            codigo.appendData("t" + tam + "=Heap[t" + indice + "];\n");
            codigo.appendData("t" + indice + "=t" + indice + "+1;\n");
            var tippoexp = this.indice.GetTipo(e);
            if (tippoexp == null) {
                return null;
            }
            var expresion = this.indice.TraducirExp(e);
            if (expresion == null) {
                return null;
            }
            codigo.appendData(expresion.ObtenerCodigo().toString());
            if (tippoexp.isInteger()) {
                codigo.appendData("t" + tpos + "=t" + indice + "+t" + expresion.ObtenerEtiquetas()[0].indice + ";\n");
                codigo.appendData("if(t" + expresion.ObtenerEtiquetas()[0].indice + "<t" + tam + ") goto L" + L0 + ";\n");
                codigo.appendData("goto L" + L1 + ";\n");
                codigo.appendData("L" + L0 + ":\n");
                codigo.appendData("if (t" + tpos + "<0) goto L" + L1 + ";\n");
                codigo.appendData("t" + tretorno + "=Heap[t" + tpos + "];\n");
                this.apuntador = tpos;
                //tenemos la posicon en donde se encuentra la cadena
                //let indicecadena = VarGlobal.getInstance().contadorTemporales;
                //codigo.appendData(`t${indicecadena}=Heap[t${tretorno}];\n`)
                codigo.appendData("goto L" + Lsalida + ";\n");
                codigo.appendData("L" + L1 + ":\n");
                codigo.appendData("E=2;\n");
                codigo.appendData("L" + Lsalida + ":\n");
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + tretorno, tretorno)], codigo.textContent);
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "El indice tiene que ser de tipo numerico", 3));
                return null;
            }
        }
        else {
            var codigo = document.createTextNode('');
            codigo.appendData(simbolo.ObtenerCodigo().toString());
            codigo.appendData("t" + indice + "=t" + simbolo.ObtenerEtiquetas()[0].indice + ";\n");
            codigo.appendData("t" + tam + "=Heap[t" + indice + "];\n"); //el tam
            codigo.appendData("t" + indice + "=t" + indice + "+1;\n");
            var tippoexp = this.indice.GetTipo(e);
            if (tippoexp == null) {
                return null;
            }
            var expresion = this.indice.TraducirExp(e);
            if (expresion == null) {
                return null;
            }
            codigo.appendData(expresion.ObtenerCodigo().toString());
            if (tippoexp.isInteger()) {
                codigo.appendData("t" + tpos + "=t" + indice + "+t" + expresion.ObtenerEtiquetas()[0].indice + ";\n");
                codigo.appendData("if(t" + expresion.ObtenerEtiquetas()[0].indice + "<t" + tam + ") goto L" + L0 + ";\n");
                codigo.appendData("goto L" + L1 + ";\n");
                codigo.appendData("L" + L0 + ":\n");
                codigo.appendData("if (t" + tpos + "<0) goto L" + L1 + ";\n");
                codigo.appendData("t" + tretorno + "=Heap[t" + tpos + "];\n");
                this.apuntador = tpos;
                codigo.appendData("goto L" + Lsalida + ";\n");
                codigo.appendData("L" + L1 + ":\n");
                codigo.appendData("E=2;\n");
                codigo.appendData("L" + Lsalida + ":\n");
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + tretorno, tretorno)], codigo.textContent);
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "El indice tiene que ser de tipo numerico", 3));
                return null;
            }
        }
    };
    AccesoArray.prototype.GetTipo = function (e) {
        if (e.existe(this.id.val)) {
            var simbolo = e.getSimbolo(this.id.val);
            var arreglo = simbolo;
            return new TipoExp_1.TipoExp(arreglo.tipo.tipoarray, arreglo.tipo.estructname);
        }
        else {
            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "Variable no encontrada como arreglo", 3));
            return null;
        }
    };
    AccesoArray.prototype.getLinea = function () {
        return this.linea;
    };
    AccesoArray.prototype.getColumna = function () {
        return this.columna;
    };
    AccesoArray.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'ACCESOARRAY', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.id.GenerarNodo(indice);
        var json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        cad = this.indice.GenerarNodo(indice);
        json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return AccesoArray;
}());
exports.AccesoArray = AccesoArray;
//# sourceMappingURL=AccesoArray.js.map