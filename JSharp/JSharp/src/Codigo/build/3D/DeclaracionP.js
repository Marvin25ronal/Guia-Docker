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
var DeclaracionP = /** @class */ (function (_super) {
    __extends(DeclaracionP, _super);
    function DeclaracionP(p, valor) {
        var _this = _super.call(this, 0, 0) || this;
        _this.p = p;
        _this.valor = valor;
        return _this;
    }
    DeclaracionP.prototype.Codigo = function () {
        return "var " + this.p + "=" + this.valor[0] + ";\n";
    };
    return DeclaracionP;
}(Codigo_1.Codigo));
exports.DeclaracionP = DeclaracionP;
//# sourceMappingURL=DeclaracionP.js.map