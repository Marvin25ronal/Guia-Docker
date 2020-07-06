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
var CodigoEtiqueta = /** @class */ (function (_super) {
    __extends(CodigoEtiqueta, _super);
    function CodigoEtiqueta(id, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.id = id;
        _this.numero = 3;
        return _this;
    }
    CodigoEtiqueta.prototype.Codigo = function () {
        return this.id + ":\n";
    };
    return CodigoEtiqueta;
}(Codigo_1.Codigo));
exports.CodigoEtiqueta = CodigoEtiqueta;
//# sourceMappingURL=CodigoEtiqueta.js.map