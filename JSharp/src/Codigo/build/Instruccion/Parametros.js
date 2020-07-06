"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Parametros = /** @class */ (function () {
    function Parametros(tipo, id) {
        this.tipo = tipo;
        this.id = id;
    }
    Parametros.prototype.ConstruirNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: "PARAMETRO", weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.id.GenerarNodo(indice);
        var json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        codigo.push({ data: { id: "" + indice2, name: "Tipo{" + this.tipo.toString() + "}", weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + indice, target: "" + indice2, faveColor: '#6FB1FC', strength: 90 } });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return Parametros;
}());
exports.Parametros = Parametros;
//# sourceMappingURL=Parametros.js.map