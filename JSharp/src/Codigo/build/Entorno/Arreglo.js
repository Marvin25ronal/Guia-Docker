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
var Arreglo = /** @class */ (function (_super) {
    __extends(Arreglo, _super);
    function Arreglo(nombre, modificador, ambito, tipo, linea, columna) {
        var _this = _super.call(this, tipo, linea, columna) || this;
        _this.nombre = nombre;
        _this.modificador = modificador;
        _this.ambito = ambito;
        return _this;
    }
    Arreglo.prototype.getTipoPrimario = function () {
        return this.tipo.tipo;
    };
    Arreglo.prototype.getTipoSecundario = function () {
        throw new Error("Method not implemented.");
    };
    Arreglo.prototype.TipoArreglo = function () {
        return this.tipo.tipoarray;
    };
    Arreglo.prototype.TipoArregloEstructura = function () {
        return this.tipo.estructname;
    };
    return Arreglo;
}(Simbolo_1.Simbolo));
exports.Arreglo = Arreglo;
//# sourceMappingURL=Arreglo.js.map