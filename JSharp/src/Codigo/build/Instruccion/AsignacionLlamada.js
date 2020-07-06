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
var Instruccion_1 = require("./Instruccion");
var VarGlobal_1 = require("../Global/VarGlobal");
var Traduccion_1 = require("../3D/Traduccion");
var Errores_1 = require("../Reportes/Errores");
var AsignacionLlamada = /** @class */ (function (_super) {
    __extends(AsignacionLlamada, _super);
    function AsignacionLlamada(acc, valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.acc = acc;
        _this.valor = valor;
        return _this;
    }
    AsignacionLlamada.prototype.TraducirInstruccion = function (e) {
        var tipometiendo = this.acc.GetTipo(e);
        if (tipometiendo == null) {
            return null;
        }
        var acceso = this.acc.TraducirExp(e);
        if (acceso == null) {
            return null;
        }
        var codigo = document.createTextNode('');
        codigo.appendData(acceso.ObtenerCodigo().toString());
        var tipoameter = this.valor.GetTipo(e);
        if (tipoameter == null) {
            return null;
        }
        if (tipoameter.sonCompatibles(tipometiendo)) {
            var valormetiendo = this.valor.TraducirExp(e);
            if (valormetiendo == null) {
                return null;
            }
            // debugger;
            var indicemetiendo = valormetiendo.ObtenerEtiquetas()[0].indice;
            codigo.appendData(valormetiendo.ObtenerCodigo().toString());
            var indice = this.acc.puntero;
            codigo.appendData("Heap[t" + indice + "]=t" + indicemetiendo + ";\n");
            return new Traduccion_1.Traduccion([], codigo.textContent);
        }
        else {
            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "El tipo no es compatible", 3));
            return null;
        }
    };
    AsignacionLlamada.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'ASIGNACIONLLAMADA', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.acc.GenerarNodo(indice);
        var json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        cad = this.valor.GenerarNodo(indice);
        json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return AsignacionLlamada;
}(Instruccion_1.Instruccion));
exports.AsignacionLlamada = AsignacionLlamada;
//# sourceMappingURL=AsignacionLlamada.js.map