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
var Print = /** @class */ (function (_super) {
    __extends(Print, _super);
    function Print(tipo, etiqueta, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.tipo = tipo;
        _this.etiqueta = etiqueta;
        return _this;
    }
    Print.prototype.Codigo = function () {
        return "print(\"" + this.tipo + "\"," + this.etiqueta + ");\n";
    };
    return Print;
}(Codigo_1.Codigo));
exports.Print = Print;
//# sourceMappingURL=Print.js.map