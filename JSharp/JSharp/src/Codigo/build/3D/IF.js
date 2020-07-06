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
var Codigo_1 = require("./Codigo");
var IF = /** @class */ (function (_super) {
    __extends(IF, _super);
    function IF(salto, v1, v2, s, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.Salto = salto;
        _this.Valor1 = v1;
        _this.Valor2 = v2;
        _this.signo = s;
        _this.numero = 4;
        return _this;
    }
    IF.prototype.Codigo = function () {
        return "if (" + this.Valor1 + this.signo + this.Valor2 + ") goto " + this.Salto + ";\n";
    };
    return IF;
}(Codigo_1.Codigo));
exports.IF = IF;
//# sourceMappingURL=IF.js.map