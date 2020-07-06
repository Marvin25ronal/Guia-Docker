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
var Traduccion_1 = require("./Traduccion");
var VarGlobal_1 = require("../Global/VarGlobal");
var TraduccionLogica = /** @class */ (function (_super) {
    __extends(TraduccionLogica, _super);
    function TraduccionLogica(verdaderas, falsas, partesuperior, codigoV, codigoF, encabezado) {
        var _this = _super.call(this, null, "") || this;
        _this.etiquetasVerdaderas = verdaderas;
        _this.etiquetasFalsas = falsas;
        _this.partesuperior = partesuperior;
        _this.codigoV = codigoV;
        _this.codigoF = codigoF;
        _this.encabezado = encabezado;
        return _this;
    }
    TraduccionLogica.prototype.ObtenerCodigo = function () {
        // console.log(this);
        var codigo = "";
        codigo += this.partesuperior;
        var salida = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
        for (var i = 0; i < this.etiquetasFalsas.length; i++) {
            codigo += this.etiquetasFalsas[i].etiqueta;
        }
        codigo += this.codigoF;
        codigo += "goto L" + salida + ";\n";
        for (var i = 0; i < this.etiquetasVerdaderas.length; i++) {
            codigo += this.etiquetasVerdaderas[i].etiqueta;
        }
        codigo += this.codigoV;
        codigo += "L" + salida + ":\n";
        return codigo;
    };
    TraduccionLogica.prototype.ObtenerEtiquetas = function () {
        if (_super.prototype.ObtenerEtiquetas.call(this) == null) {
        }
        return _super.prototype.ObtenerEtiquetas.call(this);
    };
    return TraduccionLogica;
}(Traduccion_1.Traduccion));
exports.TraduccionLogica = TraduccionLogica;
//# sourceMappingURL=TraduccionLogica.js.map