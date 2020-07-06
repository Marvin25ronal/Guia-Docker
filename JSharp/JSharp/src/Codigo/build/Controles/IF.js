"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControlIF = /** @class */ (function () {
    function ControlIF(condicion, instrucciones, lifs, lines, columna) {
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.Lifs = lifs;
        this.linea = lines;
        this.columna = columna;
    }
    ControlIF.prototype.TraducirInstruccion = function (e) {
        throw new Error("Method not implemented.");
    };
    ControlIF.prototype.getLinea = function () {
        return this.linea;
    };
    ControlIF.prototype.getColumna = function () {
        throw new Error("Method not implemented.");
    };
    ControlIF.prototype.GenerarNodo = function (padre) {
        throw new Error("Method not implemented.");
    };
    return ControlIF;
}());
exports.ControlIF = ControlIF;
//# sourceMappingURL=IF.js.map