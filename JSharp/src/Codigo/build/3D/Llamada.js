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
var Llamada = /** @class */ (function (_super) {
    __extends(Llamada, _super);
    function Llamada(id, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.id = id;
        _this.numero = 5;
        return _this;
    }
    Llamada.prototype.Codigo = function () {
        return "call " + this.id + ";\n";
    };
    return Llamada;
}(Codigo_1.Codigo));
exports.Llamada = Llamada;
//# sourceMappingURL=Llamada.js.map