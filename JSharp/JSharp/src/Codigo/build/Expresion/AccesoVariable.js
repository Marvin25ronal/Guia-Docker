"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Errores_1 = require("../Reportes/Errores");
var AccesoVariable = /** @class */ (function () {
    function AccesoVariable(id) {
        this.id = id;
    }
    AccesoVariable.prototype.TraducirExp = function (e) {
        return this.id.TraducirExp(e);
    };
    AccesoVariable.prototype.GetTipo = function (e) {
        if (e.existe(this.id.val)) {
            var signo = e.getSimbolo(this.id.val);
            var variable = signo;
            return variable.tipo;
        }
        else {
            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "No se encuentra la variable " + this.id.val, 3));
            return null;
        }
    };
    AccesoVariable.prototype.getLinea = function () {
        return this.linea;
    };
    AccesoVariable.prototype.getColumna = function () {
        return this.columna;
    };
    AccesoVariable.prototype.GenerarNodo = function (padre) {
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        var codigo = [];
        var enlace = [];
        codigo.push({ data: { id: "" + indice, name: "AccesoVariable{" + this.id.val + "}", weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return AccesoVariable;
}());
exports.AccesoVariable = AccesoVariable;
//# sourceMappingURL=AccesoVariable.js.map