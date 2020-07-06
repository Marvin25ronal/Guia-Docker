"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Traduccion_1 = require("../3D/Traduccion");
var Errores_1 = require("../Reportes/Errores");
var Entorno_1 = require("../Entorno/Entorno");
var Etiqueta_1 = require("../3D/Etiqueta");
var TraduccionLogica_1 = require("../3D/TraduccionLogica");
var Identificador = /** @class */ (function () {
    function Identificador(val, linea, columna) {
        this.val = val.toLowerCase();
        this.linea = linea;
        this.columna = columna;
    }
    Identificador.prototype.GetTipo = function (e) {
        if (e.existe(this.val)) {
            var signo = e.getSimbolo(this.val);
            var variable = signo;
            return variable.tipo;
        }
        else {
            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "No se encuentra la variable " + this.val, 3));
            return null;
        }
        //    throw new Error("Method not implemented.");
    };
    Identificador.prototype.GenerarNodo = function (padre) {
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        var codigo = [];
        var enlace = [];
        codigo.push({ data: { id: "" + indice, name: "Id{" + this.val + "}", weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    Identificador.prototype.TraducirExp = function (e) {
        var codigo = "";
        var variable = e.getSimbolo(this.val);
        if (variable != null) {
            var vari = variable;
            // debugger;
            if (vari.tipo.isArray()) {
                if (vari.ambito == Entorno_1.TipoEntorno.GLOBAL) {
                    var indiceT = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    codigo = "t" + indiceT + "=Heap[t" + vari.ref + "];\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(indiceT);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indiceT, indiceT)], codigo);
                }
                else if (vari.ambito = Entorno_1.TipoEntorno.FUNCION) {
                    var indiceT = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var indiceT2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    codigo += "t" + indiceT + "=P+" + vari.ref + ";\n";
                    codigo += "t" + indiceT2 + "=Stack[t" + indiceT + "];\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(indiceT2);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indiceT2, indiceT2)], codigo);
                }
            }
            if (vari.tipo.esCadena()) {
                if (vari.ambito == Entorno_1.TipoEntorno.GLOBAL) {
                    var indiceT = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    codigo = "t" + indiceT + "=Heap[t" + vari.ref + "];\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(indiceT);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indiceT, indiceT)], codigo);
                }
                else if (vari.ambito = Entorno_1.TipoEntorno.FUNCION) {
                    var indiceT = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var indiceT2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    codigo += "t" + indiceT + "=P+" + vari.ref + ";\n";
                    codigo += "t" + indiceT2 + "=Stack[t" + indiceT + "];\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(indiceT2);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indiceT2, indiceT2)], codigo);
                }
            }
            if (vari.ref < 0 || vari.ref.toString() == "-0") { //no declaradas
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "La variable a la cual se esta accediendo esta nula o no esta declarda", 3));
                return null;
            }
            if (vari.ambito == Entorno_1.TipoEntorno.GLOBAL) {
                //debugger;
                var indiceT = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                codigo = "t" + indiceT + "=Heap[t" + vari.ref + "];\n";
                if (vari.tipo.isBoolean() && this.isControle) {
                    var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var L0 = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                    var L1 = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                    var Ls = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                    codigo += "if (t" + indiceT + "==1) goto L" + L0 + ";\n";
                    codigo += "goto L" + L1 + ";\n";
                    codigo += "L" + L0 + ":\n";
                    codigo += "t" + indice + "=1;\n";
                    codigo += "goto L" + Ls + ";\n";
                    codigo += "L" + L1 + ":\n";
                    codigo += "t" + indice + "=0;\n";
                    codigo += "L" + Ls + ":\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
                }
                else if (vari.tipo.isBoolean() && this.islogical) {
                    var LV = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                    var LF = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                    codigo += "if(t" + indiceT + "==1) goto L" + LV + ";\n";
                    return new TraduccionLogica_1.TraduccionLogica([new Etiqueta_1.Etiqueta("L" + LV + ":\n", LV)], [new Etiqueta_1.Etiqueta("L" + LF + ":\n", LF)], codigo, null, null, "");
                }
                VarGlobal_1.VarGlobal.getInstance().Apilar(indiceT);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indiceT, indiceT)], codigo);
            }
            else if (vari.ambito == Entorno_1.TipoEntorno.FUNCION) {
                var indiceT = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                var indiceT2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                codigo += "t" + indiceT + "=P+" + vari.ref + ";\n";
                codigo += "t" + indiceT2 + "=Stack[t" + indiceT + "];\n";
                if (vari.tipo.isBoolean() && this.islogical) {
                    var LV = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                    var LF = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                    codigo += "if(t" + indiceT2 + "==1) goto L" + LV + ";\n";
                    return new TraduccionLogica_1.TraduccionLogica([new Etiqueta_1.Etiqueta("L" + LV + ":\n", LV)], [new Etiqueta_1.Etiqueta("L" + LF + ":\n", LF)], codigo, null, null, "");
                }
                if (vari.tipo.isBoolean() && this.isControle) {
                    var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var L0 = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                    var L1 = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                    var Ls = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                    codigo += "if (t" + indiceT2 + "==1) goto L" + L0 + ";\n";
                    codigo += "goto L" + L1 + ";\n";
                    codigo += "L" + L0 + ":\n";
                    codigo += "t" + indice + "=1;\n";
                    codigo += "goto L" + Ls + ";\n";
                    codigo += "L" + L1 + ":\n";
                    codigo += "t" + indice + "=0;\n";
                    codigo += "L" + Ls + ":\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
                }
                VarGlobal_1.VarGlobal.getInstance().Apilar(indiceT2);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indiceT2, indiceT2)], codigo);
            }
        }
        return null;
    };
    Identificador.prototype.getLinea = function () {
        return this.linea;
    };
    Identificador.prototype.getColumna = function () {
        return this.columna;
    };
    return Identificador;
}());
exports.Identificador = Identificador;
//# sourceMappingURL=Identificador.js.map