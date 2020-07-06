"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Traduccion_1 = require("../3D/Traduccion");
var Errores_1 = require("../Reportes/Errores");
var Entorno_1 = require("../Entorno/Entorno");
var Etiqueta_1 = require("../3D/Etiqueta");
var IncreDecre = /** @class */ (function () {
    function IncreDecre(id, incre, linea, columna) {
        this.id = id;
        this.incre = incre;
        this.linea = linea;
        this.columna = columna;
    }
    IncreDecre.prototype.GetTipo = function (e) {
        if (e.existe(this.id.val)) {
            var simbolo = e.getSimbolo(this.id.val);
            var variable = simbolo;
            if (variable.tipo.esNumero()) {
                return variable.tipo;
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "No se puede hacer incremento con este tipo de variable", 3));
                return null;
            }
        }
        return null;
    };
    IncreDecre.prototype.TraducirExp = function (e) {
        if (e.existe(this.id.val)) {
            var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
            var operacion = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
            var cad = document.createTextNode('');
            var simbolo = e.getSimbolo(this.id.val);
            var variable = simbolo;
            if (variable.ambito == Entorno_1.TipoEntorno.GLOBAL) {
                //su valor esta en el heap
                if (variable.tipo.esNumero()) {
                    cad.appendData("t" + indice + "=Heap[t" + variable.ref + "];\n");
                    if (this.incre) {
                        cad.appendData("t" + operacion + "=t" + indice + "+1;\n");
                    }
                    else {
                        cad.appendData("t" + operacion + "=t" + indice + "-1;\n");
                    }
                    cad.appendData("Heap[t" + variable.ref + "]=t" + operacion + ";\n");
                    VarGlobal_1.VarGlobal.getInstance().Apilar(operacion);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], cad.textContent);
                }
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "La variable no es de tipo numerica", 3));
                return null;
            }
            else {
                //esta en estack
                if (variable.tipo.esNumero()) {
                    var punteropmas = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
                    cad.appendData("t" + punteropmas + "=P+" + variable.ref + ";\n");
                    cad.appendData("t" + indice + "=Stack[t" + punteropmas + "];\n");
                    if (this.incre) {
                        cad.appendData("t" + operacion + "=t" + indice + "+1;\n");
                    }
                    else {
                        cad.appendData("t" + operacion + "=t" + indice + "-1;\n");
                    }
                    cad.appendData("Stack[t" + punteropmas + "]=t" + operacion + ";\n");
                    VarGlobal_1.VarGlobal.getInstance().Apilar(operacion);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], cad.textContent);
                }
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "La variable no es de tipo numerica", 3));
                return null;
            }
        }
        else {
            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "La variable no existe " + this.id.val, 3));
            return null;
        }
    };
    IncreDecre.prototype.getLinea = function () {
        return this.linea;
    };
    IncreDecre.prototype.getColumna = function () {
        return this.columna;
    };
    IncreDecre.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        var indiceincre = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        if (this.incre) {
            codigo.push({ data: { id: "" + indice, name: 'INCREMENTO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
            codigo.push({ data: { id: "" + indiceincre, name: '++', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        }
        else {
            codigo.push({ data: { id: "" + indice, name: 'DECREMENTO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
            codigo.push({ data: { id: "" + indiceincre, name: '--', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        }
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.id.GenerarNodo(indice);
        var json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        enlace.push({ data: { source: "" + padre, target: "" + indiceincre, faveColor: '#6FB1FC', strength: 90 } });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return IncreDecre;
}());
exports.IncreDecre = IncreDecre;
//# sourceMappingURL=IncreDecre.js.map