"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Traduccion = /** @class */ (function () {
    function Traduccion(et, codigo) {
        this.Etiquetas = et;
        this.codigo = codigo;
    }
    Traduccion.prototype.ObtenerEtiquetas = function () {
        return this.Etiquetas;
    };
    Traduccion.prototype.ObtenerCodigo = function () {
        return this.codigo;
    };
    Traduccion.prototype.setEtiquetaSalida = function (Salida) {
        this.etiquetaSalida = Salida;
    };
    return Traduccion;
}());
exports.Traduccion = Traduccion;
//# sourceMappingURL=Traduccion.js.map