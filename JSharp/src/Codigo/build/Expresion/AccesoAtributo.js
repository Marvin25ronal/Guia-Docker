"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var AccesoAtributo = /** @class */ (function () {
    function AccesoAtributo(id, linea, columna) {
        this.id = id;
        this.linea = linea;
        this.columna = columna;
    }
    AccesoAtributo.prototype.GetTipo = function (e) {
        throw new Error("Method not implemented.");
    };
    AccesoAtributo.prototype.TraducirExp = function (e) {
        throw new Error("Method not implemented.");
    };
    AccesoAtributo.prototype.getLinea = function () {
        return this.linea;
    };
    AccesoAtributo.prototype.getColumna = function () {
        return this.columna;
    };
    AccesoAtributo.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'ACCESOATRIBUTO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.id.GenerarNodo(indice);
        var json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return AccesoAtributo;
}());
exports.AccesoAtributo = AccesoAtributo;
//# sourceMappingURL=AccesoAtributo.js.map