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
var AsignacionArray = /** @class */ (function (_super) {
    __extends(AsignacionArray, _super);
    function AsignacionArray(valor, indice, exp, linea, columna) {
        var _this = _super.call(this, valor, exp, linea, columna) || this;
        _this.indice = indice;
        return _this;
    }
    AsignacionArray.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'ASIGNACION', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.id.GenerarNodo(indice);
        var json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        var indicearr = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indicearr, name: 'INDICE', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + indice, target: "" + indicearr, faveColor: '#6FB1FC', strength: 90 } });
        cad = this.indice.GenerarNodo(indicearr);
        json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        cad = this.exp.GenerarNodo(indice);
        json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return AsignacionArray;
}(Asignacion_1.Asignacion));
exports.AsignacionArray = AsignacionArray;
//# sourceMappingURL=AsignacionArray.js.map