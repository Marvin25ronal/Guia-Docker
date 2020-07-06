"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Errores_1 = require("../Reportes/Errores");
var Traduccion_1 = require("../3D/Traduccion");
var Break = /** @class */ (function () {
    function Break(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    Break.prototype.TraducirInstruccion = function (e) {
        var entornobreak = e.cicloBreakMasCercano();
        if (entornobreak == null) {
            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "El break no esta en un entorno de algun tipo de ciclo o Switch", 3));
            return null;
        }
        var codigo = "goto L" + entornobreak.indice + ";\n";
        return new Traduccion_1.Traduccion([], codigo);
    };
    Break.prototype.getLinea = function () {
        return this.linea;
    };
    Break.prototype.getColumna = function () {
        return this.columna;
    };
    Break.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'BREAK', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return Break;
}());
exports.Break = Break;
//# sourceMappingURL=Break.js.map