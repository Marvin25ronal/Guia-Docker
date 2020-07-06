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
var Metodo = /** @class */ (function (_super) {
    __extends(Metodo, _super);
    function Metodo(id, curpo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.cuerpo = curpo;
        _this.id = id;
        _this.numero = 1;
        return _this;
    }
    Metodo.prototype.Codigo = function () {
        var Codigo = "";
        Codigo += "proc " + this.id + " begin\n";
        for (var i = 0; i < this.cuerpo.length; i++) {
            Codigo += this.cuerpo[i].Codigo();
        }
        Codigo += "end\n";
        return Codigo;
    };
    return Metodo;
}(Codigo_1.Codigo));
exports.Metodo = Metodo;
//# sourceMappingURL=Metodo.js.map