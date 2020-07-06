"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Errores_1 = require("../Reportes/Errores");
var Traduccion_1 = require("../3D/Traduccion");
var Return = /** @class */ (function () {
    function Return(exp, linea, coluna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = coluna;
    }
    Return.prototype.TraducirExp = function (e) {
        var codigo = document.createTextNode('');
        if (this.expresion == null) {
            var etisal = e.ObtenerRetorono();
            var tiporet = e.TipoRetorno();
            if (tiporet.isVoid()) {
                codigo.appendData("goto L" + etisal.indice + ";\n");
                return new Traduccion_1.Traduccion([], codigo.textContent);
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "La funcion tiene que retornar algo y no tiene exrpesion", 3));
                return null;
            }
        }
        else {
            var tiporet = e.TipoRetorno();
            var tipoaretornar = this.expresion.GetTipo(e);
            if (tipoaretornar == null) {
                return null;
            }
            if (tiporet.isEstruct()) {
            }
            else {
                if (tipoaretornar.sonCompatibles(tiporet)) {
                    var etisal = e.ObtenerRetorono();
                    var valorexp = this.expresion.TraducirExp(e);
                    if (valorexp == null) {
                        return null;
                    }
                    codigo.appendData(valorexp.ObtenerCodigo().toString());
                    var temporal = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    codigo.appendData("t" + temporal + "=P+1;\n");
                    codigo.appendData("Stack[t" + temporal + "]=t" + valorexp.ObtenerEtiquetas()[0].indice + ";\n");
                    codigo.appendData("goto L" + etisal.indice + ";\n");
                    e.huboretorno();
                    VarGlobal_1.VarGlobal.getInstance().Apilar(temporal);
                    return new Traduccion_1.Traduccion([], codigo.textContent);
                }
                else {
                    VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "El tipo de retorno no corresponde al tipo de funcion " + tipoaretornar.toString(), 3));
                    return null;
                }
            }
        }
        return null;
    };
    Return.prototype.GetTipo = function (e) {
        if (this.expresion != null) {
            var tipo = this.expresion.GetTipo(e);
            return tipo;
        }
        return null;
    };
    Return.prototype.getLinea = function () {
        return this.linea;
    };
    Return.prototype.getColumna = function () {
        return this.columna;
    };
    Return.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'RETURN', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        if (this.expresion != null) {
            var cad = this.expresion.GenerarNodo(indice);
            var json = JSON.parse(cad);
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return Return;
}());
exports.Return = Return;
//# sourceMappingURL=Return.js.map