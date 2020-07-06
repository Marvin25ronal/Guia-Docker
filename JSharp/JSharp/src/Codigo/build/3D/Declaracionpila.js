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
var Declaracionpila = /** @class */ (function (_super) {
    __extends(Declaracionpila, _super);
    function Declaracionpila(pila, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.pila = pila;
        return _this;
    }
    Declaracionpila.prototype.Codigo = function () {
        if (this.pila)
            return "var Stack[];\n";
        else
            return "var Heap[];\n";
    };
    return Declaracionpila;
}(Codigo_1.Codigo));
exports.Declaracionpila = Declaracionpila;
//# sourceMappingURL=Declaracionpila.js.map