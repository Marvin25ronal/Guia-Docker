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
var Asignacion = /** @class */ (function (_super) {
    __extends(Asignacion, _super);
    function Asignacion(a, v, v2, si, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.Asignando = a;
        _this.Valor1 = v;
        _this.Valor2 = v2;
        _this.signo = si;
        return _this;
    }
    Asignacion.prototype.Codigo = function () {
        //let Codigo=document.createTextNode('')
        if (this.Valor2 != null) {
            return this.Asignando + "=" + this.Valor1 + this.signo + this.Valor2 + ";\n";
        }
        return this.Asignando + "=" + this.Valor1 + ";\n";
    };
    return Asignacion;
}(Codigo_1.Codigo));
exports.Asignacion = Asignacion;
//# sourceMappingURL=Asignacion.js.map