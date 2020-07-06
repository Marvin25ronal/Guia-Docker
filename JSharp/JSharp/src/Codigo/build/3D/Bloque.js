"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bloque = /** @class */ (function () {
    function Bloque(etiqueta) {
        this.etiqueta = etiqueta;
        this.lista = [];
    }
    Object.defineProperty(Bloque.prototype, "etiqueta", {
        get: function () {
            return this._etiqueta;
        },
        set: function (value) {
            this._etiqueta = value;
        },
        enumerable: true,
        configurable: true
    });
    Bloque.prototype.insertar = function (a) {
        this.lista.push(a);
    };
    return Bloque;
}());
exports.Bloque = Bloque;
//# sourceMappingURL=Bloque.js.map