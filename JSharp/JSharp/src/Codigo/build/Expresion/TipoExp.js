"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TipoExp = /** @class */ (function () {
    function TipoExp(t, id) {
        this.tipo = t;
        this.estructname = id;
    }
    TipoExp.prototype.getTipo = function () {
        return this.tipo;
    };
    TipoExp.prototype.toString = function () {
        return this.tipo;
    };
    TipoExp.prototype.esCadena = function () {
        return this.tipo == Tipo.STRING || this.tipo == Tipo.CHAR;
    };
    TipoExp.prototype.isString = function () {
        return this.tipo == Tipo.STRING;
    };
    TipoExp.prototype.isChar = function () {
        return this.tipo == Tipo.CHAR;
    };
    TipoExp.prototype.isBoolean = function () {
        return this.tipo == Tipo.BOOLEAN;
    };
    TipoExp.prototype.esNumero = function () {
        return this.tipo == Tipo.INTEGER || this.tipo == Tipo.DOUBLE;
    };
    TipoExp.prototype.isInteger = function () {
        return this.tipo == Tipo.INTEGER;
    };
    TipoExp.prototype.isDouble = function () {
        return this.tipo == Tipo.DOUBLE;
    };
    TipoExp.prototype.isEstruct = function () {
        return this.tipo == Tipo.STRUCT;
    };
    TipoExp.prototype.isVar = function () {
        return this.tipo == Tipo.VAR;
    };
    TipoExp.prototype.isGlobal = function () {
        return this.tipo == Tipo.GLOBAL;
    };
    TipoExp.prototype.isConst = function () {
        return this.tipo == Tipo.CONST;
    };
    TipoExp.prototype.isVoid = function () {
        return this.tipo == Tipo.VOID;
    };
    TipoExp.prototype.isArray = function () {
        return this.tipo == Tipo.ARRAY;
    };
    TipoExp.prototype.sonCompatibles = function (Objetivo) {
        if (this.isArray() && Objetivo.isArray()) {
            var tipo1 = new TipoExp(this.tipoarray, this.estructname);
            var tipo2 = new TipoExp(Objetivo.tipoarray, Objetivo.estructname);
            return tipo1.sonCompatibles(tipo2);
        }
        if (Objetivo.tipo == this.tipo) {
            return true;
        }
        if (this.isChar()) {
            console.log('este');
            if (Objetivo.esNumero()) {
                return true;
            }
            else if (Objetivo.isChar()) {
                return true;
            }
        }
        else if (this.isInteger()) {
            if (Objetivo.isInteger() || Objetivo.isDouble()) {
                return true;
            }
        }
        return false;
    };
    return TipoExp;
}());
exports.TipoExp = TipoExp;
var Tipo;
(function (Tipo) {
    Tipo["INTEGER"] = "INTEGER";
    Tipo["DOUBLE"] = "DOUBLE";
    Tipo["BOOLEAN"] = "BOOLEAN";
    Tipo["CHAR"] = "CHAR";
    Tipo["STRING"] = "STRING";
    Tipo["VAR"] = "VAR";
    Tipo["CONST"] = "CONST";
    Tipo["STRUCT"] = "STRUCT";
    Tipo["GLOBAL"] = "GLOBAL";
    Tipo["NORMAL"] = "NORMAL";
    Tipo["VOID"] = "VOID";
    Tipo["ARRAY"] = "ARRAY";
})(Tipo = exports.Tipo || (exports.Tipo = {}));
//# sourceMappingURL=TipoExp.js.map