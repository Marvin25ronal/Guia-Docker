"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Errores_1 = require("../Reportes/Errores");
var Traduccion_1 = require("../3D/Traduccion");
var Continue = /** @class */ (function () {
    function Continue() {
    }
    Continue.prototype.TraducirInstruccion = function (e) {
        var entornocontinue = e.cicloContinueMasCercano();
        if (entornocontinue == null) {
            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "El continue no esta en un entorno de algun tipo de ciclo o Switch", 3));
            return null;
        }
        var codigo = "goto L" + entornocontinue.indice + ";\n";
        return new Traduccion_1.Traduccion([], codigo);
    };
    Continue.prototype.getLinea = function () {
        return this.linea;
    };
    Continue.prototype.getColumna = function () {
        return this.columna;
    };
    Continue.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'CONTINUE', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return Continue;
}());
exports.Continue = Continue;
//# sourceMappingURL=Continue.js.map