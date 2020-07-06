"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TipoExp_1 = require("./TipoExp");
var VarGlobal_1 = require("../Global/VarGlobal");
var Errores_1 = require("../Reportes/Errores");
var Traduccion_1 = require("../3D/Traduccion");
var Etiqueta_1 = require("../3D/Etiqueta");
var DecArray = /** @class */ (function () {
    function DecArray(exp, tip, line, col) {
        this.expresion = exp;
        this.tipo = tip;
        this.linea = line;
        this.columna = col;
    }
    DecArray.prototype.TraducirExp = function (e) {
        var codigo = document.createTextNode('');
        //let indicet = VarGlobal.getInstance().contadorTemporales;
        if (this.tipo.isEstruct()) {
        }
        else {
            var tipoexp = this.expresion.GetTipo(e);
            if (tipoexp.isInteger()) {
                var valorexp = this.expresion.TraducirExp(e);
                if (valorexp == null) {
                    return null;
                }
                codigo.appendData(valorexp.ObtenerCodigo().toString());
                codigo.appendData("t0=t" + valorexp.ObtenerEtiquetas()[0].indice + ";\n");
                codigo.appendData("call marvin_201602520_CrearArray;\n");
                var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                codigo.appendData("t" + indice + "=t0;\n");
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo.textContent);
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "El parametro para generar el arreglo no es de tipo entero", 3));
                return null;
            }
        }
    };
    DecArray.prototype.GetTipo = function (e) {
        var tipo = new TipoExp_1.TipoExp(TipoExp_1.Tipo.ARRAY, '');
        if (this.tipo.isEstruct()) {
        }
        else {
            tipo.tipoarray = this.tipo.tipo;
        }
        return tipo;
    };
    DecArray.prototype.getLinea = function () {
        return this.linea;
    };
    DecArray.prototype.getColumna = function () {
        return this.columna;
    };
    DecArray.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'NUEVOARREGLO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var tipo = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + tipo, name: "Tipo{" + this.tipo.toString() + "}", weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + indice, target: "" + tipo, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.expresion.GenerarNodo(indice);
        var json = JSON.parse(cad);
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return DecArray;
}());
exports.DecArray = DecArray;
//# sourceMappingURL=DecArray.js.map