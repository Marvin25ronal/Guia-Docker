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
var Salto = /** @class */ (function (_super) {
    __extends(Salto, _super);
    function Salto(salto, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.salto = salto;
        _this.numero = 2;
        return _this;
    }
    Salto.prototype.Codigo = function () {
        return "goto " + this.salto + ";\n";
    };
    return Salto;
}(Codigo_1.Codigo));
exports.Salto = Salto;
//# sourceMappingURL=Salto.js.map