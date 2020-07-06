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
var Funcion = /** @class */ (function (_super) {
    __extends(Funcion, _super);
    function Funcion(nombre, parametros, tipo, cuerpo, linea, columna) {
        var _this = _super.call(this, tipo, linea, columna) || this;
        _this.nombre = nombre;
        _this.parametros = parametros;
        _this.siguiente = null;
        _this.cuerpoparatraducir = cuerpo;
        return _this;
    }
    Funcion.prototype.obtenerCadena = function () {
        var cad = '';
        if (this.parametros != null) {
            for (var i = 0; i < this.parametros.length; i++) {
                var aux = this.parametros[i];
                if (aux.tipo.esNumero()) {
                    cad += "NUMERO";
                }
                else if (aux.tipo.isEstruct()) {
                }
                else {
                    cad += aux.tipo.toString();
                }
            }
            return "FUNCION_" + this.tipo.toString() + "_" + this.nombre + "_" + cad;
        }
        return "FUNCION_" + this.tipo.toString() + "_" + this.nombre;
    };
    Funcion.prototype.obtenerFuncion = function (nombre) {
        var aux = this;
        while (aux != null) {
            if (aux.nombre == nombre) {
                return aux;
            }
            aux = aux.siguiente;
        }
        return null;
    };
    return Funcion;
}(Simbolo_1.Simbolo));
exports.Funcion = Funcion;
//# sourceMappingURL=Funcion.js.map