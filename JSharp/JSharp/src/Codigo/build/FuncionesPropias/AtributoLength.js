"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Etiqueta_1 = require("../3D/Etiqueta");
var Traduccion_1 = require("../3D/Traduccion");
var VarGlobal_1 = require("../Global/VarGlobal");
var AtributoLength = /** @class */ (function () {
    function AtributoLength(eti) {
        this.etiquetaanterior = eti;
    }
    AtributoLength.prototype.Length = function (e) {
        var codigo = document.createTextNode('');
        var indicet = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
        var indeH = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
        codigo.appendData("t" + indeH + "=t" + this.etiquetaanterior.indice + ";\n");
        codigo.appendData("t" + indicet + "=Heap[t" + indeH + "];\n");
        return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indicet, indicet)], codigo.textContent);
    };
    return AtributoLength;
}());
exports.AtributoLength = AtributoLength;
//# sourceMappingURL=AtributoLength.js.map