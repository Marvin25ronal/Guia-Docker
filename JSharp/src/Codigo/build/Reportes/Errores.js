"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TipoE;
(function (TipoE) {
    TipoE["SEMANTICO"] = "SEMANTICO";
    TipoE["LEXICO"] = "LEXICO";
    TipoE["SINTACTICO"] = "SINTACTICO";
})(TipoE || (TipoE = {}));
var Errores = /** @class */ (function () {
    function Errores(l, c, mensaje, d) {
        this.columna = c;
        this.linea = l;
        this.mensaje = mensaje;
        if (d == 1) {
            this.tipo = TipoE.LEXICO;
        }
        else if (d == 2) {
            this.tipo = TipoE.SINTACTICO;
        }
        else {
            this.tipo = TipoE.SEMANTICO;
        }
    }
    Object.defineProperty(Errores.prototype, "linea", {
        get: function () {
            return this._linea;
        },
        set: function (value) {
            this._linea = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Errores.prototype, "mensaje", {
        get: function () {
            return this._mensaje;
        },
        set: function (value) {
            this._mensaje = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Errores.prototype, "tipo", {
        get: function () {
            return this._tipo;
        },
        set: function (value) {
            this._tipo = value;
        },
        enumerable: true,
        configurable: true
    });
    Errores.prototype.getTipo = function () {
        return this.tipo.toString();
    };
    return Errores;
}());
exports.Errores = Errores;
//# sourceMappingURL=Errores.js.map