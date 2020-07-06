"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TipoExp_1 = require("../Expresion/TipoExp");
var VarGlobal_1 = require("../Global/VarGlobal");
var Errores_1 = require("../Reportes/Errores");
var AtributoLength_1 = require("./AtributoLength");
var AtributosPropios = /** @class */ (function () {
    function AtributosPropios(acc, ant, tipo) {
        this.acceso = acc;
        this.etiquetaanterior = ant;
        this.tipoanterior = tipo;
    }
    AtributosPropios.prototype.Generar = function (e) {
        //let codigo=``
        var linea = this.acceso.getLinea();
        var columna = this.acceso.getColumna();
        if (this.acceso.id.val.toLowerCase() == "length") {
            if (this.tipoanterior.isArray()) {
                var atributo = new AtributoLength_1.AtributoLength(this.etiquetaanterior);
                var traduc = atributo.Length(e);
                this.tiposintetizado = new TipoExp_1.TipoExp(TipoExp_1.Tipo.INTEGER, null);
                return traduc;
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "El atributo length solo esta disponible para ARRAY no de tipo " + this.tipoanterior.tipo.toString(), 3));
                return null;
            }
        }
    };
    return AtributosPropios;
}());
exports.AtributosPropios = AtributosPropios;
//# sourceMappingURL=AtributosPropios.js.map