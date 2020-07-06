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
var Identificador_1 = require("./Identificador");
var VarGlobal_1 = require("../Global/VarGlobal");
var IdentificadorArray = /** @class */ (function (_super) {
    __extends(IdentificadorArray, _super);
    function IdentificadorArray(val, linea, columna) {
        return _super.call(this, val, linea, columna) || this;
    }
    IdentificadorArray.prototype.GenerarNodo = function (padre) {
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        var codigo = [];
        var enlace = [];
        codigo.push({ data: { id: "" + indice, name: "Id{" + this.val + "}[]", weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return IdentificadorArray;
}(Identificador_1.Identificador));
exports.IdentificadorArray = IdentificadorArray;
//# sourceMappingURL=IdentificadorArray.js.map