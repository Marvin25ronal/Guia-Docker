"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
    }
    Simbolo.prototype.getTipoPrimario = function () {
        return this.tipo.tipo;
    };
    Simbolo.prototype.getTipoSecundario = function () {
        return this.tipo.estructname;
    };
    return Simbolo;
}());
exports.Simbolo = Simbolo;
//# sourceMappingURL=Simbolo.js.map