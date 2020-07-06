"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Declaracion_1 = require("../Instruccion/Declaracion");
var Traduccion_1 = require("../3D/Traduccion");
var Expresion_1 = require("../Expresion/Expresion");
var Acceso_1 = require("../Expresion/Acceso");
var Return_1 = require("../Expresion/Return");
var Default = /** @class */ (function () {
    function Default(ins, line, col) {
        this.instrucciones = ins;
        this.linea = line;
        this.columna = col;
    }
    Default.prototype.TraducirInstruccion = function (e) {
        var parteVerdadera = "";
        if (this.instrucciones != null) {
            for (var i = 0; i < this.instrucciones.length; i++) {
                var aux = this.instrucciones[i];
                if (aux instanceof Declaracion_1.Declaracion) {
                    var traddec = aux.TraducirFuncionDeclarionValor(e);
                    if (traddec == null) {
                        continue;
                    }
                    parteVerdadera += traddec.ObtenerCodigo();
                }
                else if (aux instanceof Expresion_1.Expresion) {
                    var traduce = aux.TraducirExp(e);
                    if (traduce == null) {
                        continue;
                    }
                    parteVerdadera += traduce.ObtenerCodigo();
                }
                else if (aux instanceof Acceso_1.Acceso) {
                    var trad = aux.TraducirExp(e);
                    if (trad == null) {
                        continue;
                    }
                    parteVerdadera += trad.ObtenerCodigo();
                }
                else if (aux instanceof Return_1.Return) {
                    var trad = aux.TraducirExp(e);
                    if (trad == null) {
                        continue;
                    }
                    parteVerdadera += trad.ObtenerCodigo();
                }
                else if (aux) {
                    var trad = aux.TraducirInstruccion(e);
                    if (trad == null) {
                        continue;
                    }
                    parteVerdadera += trad.ObtenerCodigo();
                }
            }
        }
        return new Traduccion_1.Traduccion([], parteVerdadera);
    };
    Default.prototype.getLinea = function () {
        return this.linea;
    };
    Default.prototype.getColumna = function () {
        return this.columna;
    };
    Default.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'DEFAULT', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = '';
        var json;
        if (this.instrucciones != null) {
            var indicec = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
            codigo.push({ data: { id: "" + indicec, name: 'CUERPO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
            enlace.push({ data: { source: "" + indice, target: "" + indicec, faveColor: '#6FB1FC', strength: 90 } });
            for (var i = 0; i < this.instrucciones.length; i++) {
                cad = this.instrucciones[i].GenerarNodo(indicec);
                json = JSON.parse(cad.toString());
                codigo = codigo.concat(json.nodo);
                enlace = enlace.concat(json.enlace);
            }
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return Default;
}());
exports.Default = Default;
//# sourceMappingURL=Default.js.map