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
var Declaracion = /** @class */ (function (_super) {
    __extends(Declaracion, _super);
    function Declaracion(vari, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.variables = vari;
        return _this;
    }
    Declaracion.prototype.Codigo = function () {
        var Codigo = "var ";
        for (var i = 0; i < this.variables.length; i++) {
            Codigo += this.variables[i] + ",";
        }
        Codigo = Codigo.substring(0, Codigo.length - 1);
        Codigo += ";\n";
        return Codigo;
    };
    return Declaracion;
}(Codigo_1.Codigo));
exports.Declaracion = Declaracion;
//# sourceMappingURL=Declaracion.js.map