"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Traduccion_1 = require("../3D/Traduccion");
var Print = /** @class */ (function () {
    function Print(exp) {
        this.exp = exp;
    }
    Print.prototype.Imprimir = function (e) {
        var tipo = this.exp.GetTipo(e);
        if (tipo == null) {
            return null;
        }
        if (tipo.esCadena()) {
            var cadena = this.exp.TraducirExp(e);
            if (cadena == null) {
                return null;
            }
            var codigo = cadena.ObtenerCodigo().toString();
            codigo += "t0=" + cadena.ObtenerEtiquetas()[0].etiqueta + ";\n";
            codigo += "call marvin_201602520_printCadena;\n";
            return new Traduccion_1.Traduccion([], codigo);
        }
        else if (tipo.isBoolean()) {
            var cadena = this.exp.TraducirExp(e);
            if (cadena == null) {
                return null;
            }
            var codigo = cadena.ObtenerCodigo().toString();
            codigo += "t0=" + cadena.ObtenerEtiquetas()[0].etiqueta + ";\n";
            codigo += "call marvin_201602520_ConvertirBooleanoString;\n";
            codigo += "call marvin_201602520_printCadena;\n";
            return new Traduccion_1.Traduccion([], codigo);
        }
        else if (tipo.isDouble()) {
            var cadena = this.exp.TraducirExp(e);
            if (cadena == null) {
                return null;
            }
            var codigo = document.createTextNode('');
            codigo.appendData(cadena.ObtenerCodigo().toString());
            codigo.appendData("t0=" + cadena.ObtenerEtiquetas()[0].etiqueta + ";\n");
            codigo.appendData("call marvin_201602520_PrintDouble;\n");
            //codigo.appendData(`call marvin_201602520_printCadena;\n`);
            return new Traduccion_1.Traduccion([], codigo.textContent);
        }
        else if (tipo.isInteger()) {
            // debugger;
            var cadena = this.exp.TraducirExp(e);
            if (cadena == null) {
                return null;
            }
            var codigo = document.createTextNode('');
            codigo.appendData(cadena.ObtenerCodigo().toString());
            codigo.appendData("t0=" + cadena.ObtenerEtiquetas()[0].etiqueta + ";\n");
            codigo.appendData("call marvin_201602520_PrintEntero;\n");
            //codigo.appendData(`call marvin_201602520_CambiarNumeroAscii;\n`)
            //codigo.appendData(`call marvin_201602520_printCadena;\n`);
            return new Traduccion_1.Traduccion([], codigo.textContent);
        }
    };
    return Print;
}());
exports.Print = Print;
//# sourceMappingURL=Print.js.map