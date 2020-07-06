"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Expresion_1 = require("../Expresion/Expresion");
var VarGlobal_1 = require("../Global/VarGlobal");
var Etiqueta_1 = require("../3D/Etiqueta");
var Errores_1 = require("../Reportes/Errores");
var Traduccion_1 = require("../3D/Traduccion");
var Declaracion_1 = require("../Instruccion/Declaracion");
var Acceso_1 = require("../Expresion/Acceso");
var Return_1 = require("../Expresion/Return");
var Case = /** @class */ (function () {
    function Case(cond, ins, linea, columna) {
        this.condicion = cond;
        this.instrucciones = ins;
        this.linea = linea;
        this.columna = columna;
    }
    Case.prototype.TraducirInstruccion = function (e) {
        var tipoexp = this.condicion.GetTipo(e);
        if (tipoexp == null) {
            return null;
        }
        var valorexpo = this.condicion.TraducirExp(e);
        if (valorexpo == null) {
            return null;
        }
        if (this.tiposuperior.tipo == tipoexp.tipo) {
            if (this.tiposuperior.esCadena()) {
            }
            else if (this.tiposuperior.isEstruct()) {
            }
            else {
                var codigo = document.createTextNode('');
                codigo.appendData(valorexpo.ObtenerCodigo().toString());
                var indicev = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                var indiceF = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                codigo.appendData("if(t" + this.etiquetasuperior.indice + "==t" + valorexpo.ObtenerEtiquetas()[0].indice + ") goto L" + indicev + ";\n");
                codigo.appendData("goto L" + indiceF + ";\n");
                codigo.appendData("L" + indicev + ":\n");
                if (this.siguientecase != null) {
                    codigo.appendData("L" + this.siguientecase.indice + ":\n");
                }
                if (this.instrucciones != null) {
                    for (var i = 0; i < this.instrucciones.length; i++) {
                        var aux = this.instrucciones[i];
                        if (aux instanceof Declaracion_1.Declaracion) {
                            var traddec = aux.DeclararFuncion(e);
                            if (traddec == null) {
                                continue;
                            }
                            codigo.appendData(traddec.ObtenerCodigo().toString());
                        }
                        else if (aux instanceof Expresion_1.Expresion) {
                            var traduce = aux.TraducirExp(e);
                            if (traduce == null) {
                                continue;
                            }
                            codigo.appendData(traduce.ObtenerCodigo().toString());
                        }
                        else if (aux instanceof Acceso_1.Acceso) {
                            var trad = aux.TraducirExp(e);
                            if (trad == null) {
                                continue;
                            }
                            //parteVerdadera += trad.ObtenerCodigo();
                            codigo.appendData(trad.ObtenerCodigo().toString());
                        }
                        else if (aux instanceof Return_1.Return) {
                            var trad = aux.TraducirExp(e);
                            if (trad == null) {
                                continue;
                            }
                            codigo.appendData(trad.ObtenerCodigo().toString());
                        }
                        else if (aux) {
                            var trad = aux.TraducirInstruccion(e);
                            if (trad == null) {
                                continue;
                            }
                            //parteVerdadera += trad.ObtenerCodigo();
                            codigo.appendData(trad.ObtenerCodigo().toString());
                        }
                    }
                }
                var indinextcase = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                codigo.appendData("goto L" + indinextcase + ";\n");
                codigo.appendData("L" + indiceF + ":\n");
                var eti = new Etiqueta_1.Etiqueta("L" + indinextcase + ":\n", indinextcase);
                this.siguientecase = eti;
                return new Traduccion_1.Traduccion([], codigo.textContent);
            }
        }
        else {
            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "Los tipos no son compatibles con el case y el switch", 3));
            return null;
        }
    };
    Case.prototype.getLinea = function () {
        return this.linea;
    };
    Case.prototype.getColumna = function () {
        return this.columna;
    };
    Case.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'CASE', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.condicion.GenerarNodo(indice);
        var json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
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
    return Case;
}());
exports.Case = Case;
//# sourceMappingURL=Case.js.map