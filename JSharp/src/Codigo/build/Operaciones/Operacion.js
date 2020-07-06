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
var Expresion_1 = require("../Expresion/Expresion");
var Signo_1 = require("./Signo");
var Operacion = /** @class */ (function (_super) {
    __extends(Operacion, _super);
    function Operacion(op1, op2, op, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.op1 = op1;
        _this.op2 = op2;
        _this.op = op;
        return _this;
    }
    Operacion.prototype.TraducirExp = function (e) {
        throw new Error("Method not implemented.");
    };
    Operacion.prototype.ObtenerSignoString = function () {
        switch (this.op) {
            case Signo_1.Signo.SUMA:
                return "+";
            case Signo_1.Signo.RESTA:
                return "-";
            case Signo_1.Signo.MULTIPLICACION:
                return "*";
            case Signo_1.Signo.DIVISION:
                return "/";
            case Signo_1.Signo.MODULO:
                return "%";
            case Signo_1.Signo.POTENCIA:
                return "^";
            case Signo_1.Signo.MAYOR:
                return ">";
            case Signo_1.Signo.MAYORI:
                return ">=";
            case Signo_1.Signo.MENOR:
                return "<";
            case Signo_1.Signo.MENORI:
                return "<=";
            case Signo_1.Signo.OR:
                return "||";
            case Signo_1.Signo.AND:
                return "&&";
            case Signo_1.Signo.NOT:
                return "!";
            case Signo_1.Signo.IGUAL_IGUAL:
                return "==";
            case Signo_1.Signo.DISTINTO:
                return "!=";
            case Signo_1.Signo.TRIPLE_IGUAL:
                return "===";
        }
    };
    return Operacion;
}(Expresion_1.Expresion));
exports.Operacion = Operacion;
//# sourceMappingURL=Operacion.js.map