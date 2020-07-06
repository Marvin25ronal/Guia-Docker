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
var Aritmetica_1 = require("./Aritmetica");
var Resta = /** @class */ (function (_super) {
    __extends(Resta, _super);
    function Resta(op1, op2, s, linea, columna) {
        return _super.call(this, op1, op2, s, linea, columna) || this;
    }
    Resta.prototype.GenerarNodo = function () {
        throw new Error("Method not implemented.");
    };
    return Resta;
}(Aritmetica_1.Aritmetica));
exports.Resta = Resta;
//# sourceMappingURL=Resta.js.map