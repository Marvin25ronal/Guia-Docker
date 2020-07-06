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
var Simbolo_1 = require("./Simbolo");
var Variable = /** @class */ (function (_super) {
    __extends(Variable, _super);
    function Variable(nombre, modificador, ambito, tipo, linea, columna) {
        var _this = _super.call(this, tipo, linea, columna) || this;
        _this.modificador = modificador;
        _this.ambito = ambito;
        _this.nombre = nombre;
        return _this;
    }
    Variable.prototype.setRef = function (n) {
        this.ref = n;
    };
    return Variable;
}(Simbolo_1.Simbolo));
exports.Variable = Variable;
//# sourceMappingURL=Variable.js.map