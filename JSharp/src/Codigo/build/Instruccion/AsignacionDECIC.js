"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Asignacion_1 = require("./Asignacion");
var VarGlobal_1 = require("../Global/VarGlobal");
var Entorno_1 = require("../Entorno/Entorno");
var Traduccion_1 = require("../3D/Traduccion");
var Etiqueta_1 = require("../3D/Etiqueta");
var Errores_1 = require("../Reportes/Errores");
var AsignacionDECIC = /** @class */ (function (_super) {
    __extends(AsignacionDECIC, _super);
    function AsignacionDECIC(valor, incremento, linea, columna) {
        var _this = _super.call(this, valor, null, linea, columna) || this;
        _this.incremento = incremento;
        return _this;
    }
    AsignacionDECIC.prototype.TraducirInstruccion = function (e) {
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
                    if (this.incremento) {
                        cad.appendData("t" + operacion + "=t" + indice + "+1;\n");
                    }
                    else {
                        cad.appendData("t" + operacion + "=t" + indice + "-1;\n");
                    }
                    cad.appendData("Heap[t" + variable.ref + "]=t" + operacion + ";\n");
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
                    if (this.incremento) {
                        cad.appendData("t" + operacion + "=t" + indice + "+1;\n");
                    }
                    else {
                        cad.appendData("t" + operacion + "=t" + indice + "-1;\n");
                    }
                    cad.appendData("Stack[t" + punteropmas + "]=t" + operacion + ";\n");
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
    AsignacionDECIC.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'ASIGNACION', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.id.GenerarNodo(indice);
        var json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        var masmas = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + masmas, name: '++', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + indice, target: "" + masmas, faveColor: '#6FB1FC', strength: 90 } });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return AsignacionDECIC;
}(Asignacion_1.Asignacion));
exports.AsignacionDECIC = AsignacionDECIC;
//# sourceMappingURL=AsignacionDECIC.js.map