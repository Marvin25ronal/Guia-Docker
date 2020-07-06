"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Traduccion_1 = require("../3D/Traduccion");
var TipoExp_1 = require("./TipoExp");
var VarGlobal_1 = require("../Global/VarGlobal");
var Operacion_1 = require("../Operaciones/Operacion");
var Signo_1 = require("../Operaciones/Signo");
var Etiqueta_1 = require("../3D/Etiqueta");
var TraduccionLogica_1 = require("../3D/TraduccionLogica");
var Errores_1 = require("../Reportes/Errores");
var Relacionales = /** @class */ (function (_super) {
    __extends(Relacionales, _super);
    function Relacionales(op1, op2, op, lin, col) {
        return _super.call(this, op1, op2, op, lin, col) || this;
    }
    Relacionales.prototype.GetTipo = function (e) {
        return new TipoExp_1.TipoExp(TipoExp_1.Tipo.BOOLEAN, null);
    };
    Relacionales.prototype.TraducirExp = function (e) {
        var tipoA = this.op1.GetTipo(e);
        var tipoB = this.op2.GetTipo(e);
        if (tipoA == null || tipoB == null) {
            return null;
        }
        var traducA = this.op1.TraducirExp(e);
        var traducB = this.op2.TraducirExp(e);
        if (traducA == null || traducB == null) {
            return null;
        }
        if (this.op == Signo_1.Signo.IGUAL_IGUAL) {
            return this.traducirIgual(tipoA, tipoB, traducA, traducB, "==");
        }
        else if (this.op == Signo_1.Signo.DISTINTO) {
            return this.traducirIgual(tipoA, tipoB, traducA, traducB, "<>");
        }
        else if (this.op == Signo_1.Signo.MAYOR) {
            return this.traducirMayor(tipoA, tipoB, traducA, traducB, ">");
        }
        else if (this.op == Signo_1.Signo.MENOR) {
            return this.traducirMayor(tipoA, tipoB, traducA, traducB, "<");
        }
        else if (this.op == Signo_1.Signo.MAYORI) {
            return this.traducirMayor(tipoA, tipoB, traducA, traducB, ">=");
        }
        else if (this.op == Signo_1.Signo.MENORI) {
            return this.traducirMayor(tipoA, tipoB, traducA, traducB, "<=");
        }
        return null;
    };
    Relacionales.prototype.traducirMayor = function (tipoA, tipob, traducA, traducB, signo) {
        if (this.islogical == false) {
            var codigo = "";
            codigo += traducA.ObtenerCodigo();
            codigo += traducB.ObtenerCodigo();
            var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
            var etiV = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
            var etiSa = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
            if (tipoA.esNumero()) {
                if (tipob.esNumero()) {
                    codigo += "if(" + traducA.ObtenerEtiquetas()[0].etiqueta + signo + traducB.ObtenerEtiquetas()[0].etiqueta + ") goto L" + etiV + ";\n";
                    codigo += "t" + indice + "=0;\ngoto L" + etiSa + ";\n";
                    codigo += "L" + etiV + ":\nt" + indice + "=1;\nL" + etiSa + ":\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
                }
                else if (tipob.isChar()) {
                    var aux2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var aux3 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    codigo += "t" + indice + "=" + traducB.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    codigo += "t" + aux2 + "=Heap[t" + indice + "];\n";
                    codigo += "if(" + traducA.ObtenerEtiquetas()[0].etiqueta + signo + "t" + aux2 + ") goto L" + etiV + ";\n";
                    codigo += "t" + aux3 + "=0;\ngoto L" + etiSa + ";\n";
                    codigo += "L" + etiV + ":\nt" + aux3 + "=1;\nL" + etiSa + ":\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(aux3);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + aux3, aux3)], codigo);
                }
            }
            else if (tipoA.isChar()) {
                if (tipob.esNumero()) {
                    var aux2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var aux3 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    codigo += "t" + indice + "=" + traducA.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    codigo += "t" + aux2 + "=Heap[t" + indice + "];\n";
                    codigo += "if(t" + aux2 + signo + traducB.ObtenerEtiquetas()[0].etiqueta + ") goto L" + etiV + ";\n";
                    codigo += "t" + aux3 + "=0;\ngoto L" + etiSa + ";\n";
                    codigo += "L" + etiV + ":\nt" + aux3 + "=1;\nL" + etiSa + ":\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(aux3);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + aux3, aux3)], codigo);
                }
                else if (tipob.isChar()) {
                    var aux2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var aux4 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var aux3 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    codigo += "t" + indice + "=" + traducA.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    codigo += "t" + aux2 + "=Heap[t" + indice + "];\n";
                    codigo += "t" + indice2 + "=" + traducB.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    codigo += "t" + aux4 + "=Heap[t" + indice2 + "];\n";
                    codigo += "if(t" + aux4 + signo + "t" + aux2 + ") goto L" + etiV + ";\n";
                    codigo += "t" + aux3 + "=0;\ngoto L" + etiSa + ";\n";
                    codigo += "L" + etiV + ":\nt" + aux3 + "=1;\nL" + etiSa + ":\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(aux3);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + aux3, aux3)], codigo);
                }
            }
        }
        else {
            var cabeza = '';
            cabeza += traducA.ObtenerCodigo();
            cabeza += traducB.ObtenerCodigo();
            var partesuper = '';
            var etiquetaV = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
            var etiquetaF = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
            if (tipoA.esNumero()) {
                if (tipob.esNumero()) {
                    partesuper = "if(" + traducA.ObtenerEtiquetas()[0].etiqueta + signo + traducB.ObtenerEtiquetas()[0].etiqueta + ")goto L" + etiquetaV + ";\n";
                    return new TraduccionLogica_1.TraduccionLogica([new Etiqueta_1.Etiqueta("L" + etiquetaV + ":\n", etiquetaV)], [new Etiqueta_1.Etiqueta("L" + etiquetaF + ":\n", etiquetaF)], partesuper, null, null, cabeza);
                }
                else if (tipob.isChar()) {
                    var aux2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    cabeza += "t" + indice + "=" + traducB.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    cabeza += "t" + aux2 + "=Heap[t" + indice + "];\n";
                    partesuper += "if(" + traducA.ObtenerEtiquetas()[0].etiqueta + signo + "t" + aux2 + ") goto L" + etiquetaV + ";\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica_1.TraduccionLogica([new Etiqueta_1.Etiqueta("L" + etiquetaV + ":\n", etiquetaV)], [new Etiqueta_1.Etiqueta("L" + etiquetaF + ":\n", etiquetaF)], partesuper, null, null, cabeza);
                }
            }
            else if (tipoA.isChar()) {
                if (tipob.isChar()) {
                    var aux2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var aux4 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    cabeza += "t" + indice + "=" + traducA.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    cabeza += "t" + aux2 + "=Heap[t" + indice + "];\n";
                    cabeza += "t" + indice2 + "=" + traducB.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    cabeza += "t" + aux4 + "=Heap[t" + indice2 + "];\n";
                    partesuper += "if(t" + aux4 + signo + "t" + aux2 + ") goto L" + etiquetaV + ";\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica_1.TraduccionLogica([new Etiqueta_1.Etiqueta("L" + etiquetaV + ":\n", etiquetaV)], [new Etiqueta_1.Etiqueta("L" + etiquetaF + ":\n", etiquetaF)], partesuper, null, null, cabeza);
                }
                else if (tipob.esNumero()) {
                    var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var aux2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var aux3 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    cabeza += "t" + indice + "=" + traducA.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    cabeza += "t" + aux2 + "=Heap[t" + indice + "];\n";
                    partesuper += "if(t" + aux2 + signo + traducB.ObtenerEtiquetas()[0].etiqueta + ") goto L" + etiquetaV + ";\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica_1.TraduccionLogica([new Etiqueta_1.Etiqueta("L" + etiquetaV + ":\n", etiquetaV)], [new Etiqueta_1.Etiqueta("L" + etiquetaF + ":\n", etiquetaF)], partesuper, null, null, cabeza);
                }
            }
        }
        VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "No se puede operar esas expresiones en " + signo + " ", 3));
        return null;
    };
    Relacionales.prototype.traducirIgual = function (tipoA, tipob, traducA, traducB, signo) {
        if (this.islogical == false) {
            var codigo = "";
            codigo += traducA.ObtenerCodigo();
            codigo += traducB.ObtenerCodigo();
            var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
            var etiV = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
            var etiSa = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
            if (tipoA.esNumero()) {
                if (tipob.esNumero()) {
                    codigo += "if(" + traducA.ObtenerEtiquetas()[0].etiqueta + signo + traducB.ObtenerEtiquetas()[0].etiqueta + ") goto L" + etiV + ";\n";
                    codigo += "t" + indice + "=0;\ngoto L" + etiSa + ";\n";
                    codigo += "L" + etiV + ":\nt" + indice + "=1;\nL" + etiSa + ":\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
                }
                else if (tipob.isChar()) {
                    var aux2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var aux3 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    codigo += "t" + indice + "=" + traducB.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    codigo += "t" + aux2 + "=Heap[t" + indice + "];\n";
                    codigo += "if(" + traducA.ObtenerEtiquetas()[0].etiqueta + signo + "t" + aux2 + ") goto L" + etiV + ";\n";
                    codigo += "t" + aux3 + "=0;\ngoto L" + etiSa + ";\n";
                    codigo += "L" + etiV + ":\nt" + aux3 + "=1;\nL" + etiSa + ":\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(aux3);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + aux3, aux3)], codigo);
                }
            }
            else if (tipoA.isBoolean()) {
                if (tipob.isBoolean()) {
                    codigo += "if(" + traducA.ObtenerEtiquetas()[0].etiqueta + signo + traducB.ObtenerEtiquetas()[0].etiqueta + ") goto L" + etiV + ";\n";
                    codigo += "t" + indice + "=0;\ngoto L" + etiSa + ";\n";
                    codigo += "L" + etiV + ":\nt" + indice + "=1;\nL" + etiSa + ":\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
                }
            }
            else if (tipoA.isChar()) {
                if (tipob.esNumero()) {
                    var aux2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var aux3 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    codigo += "t" + indice + "=" + traducA.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    codigo += "t" + aux2 + "=Heap[t" + indice + "];\n";
                    codigo += "if(t" + aux2 + signo + traducB.ObtenerEtiquetas()[0].etiqueta + ") goto L" + etiV + ";\n";
                    codigo += "t" + aux3 + "=0;\ngoto L" + etiSa + ";\n";
                    codigo += "L" + etiV + ":\nt" + aux3 + "=1;\nL" + etiSa + ":\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(aux3);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + aux3, aux3)], codigo);
                }
                else if (tipob.isChar()) {
                    var aux2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var aux4 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var aux3 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    codigo += "t" + indice + "=" + traducA.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    codigo += "t" + aux2 + "=Heap[t" + indice + "];\n";
                    codigo += "t" + indice2 + "=" + traducB.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    codigo += "t" + aux4 + "=Heap[t" + indice2 + "];\n";
                    codigo += "if(t" + aux4 + signo + "t" + aux2 + ") goto L" + etiV + ";\n";
                    codigo += "t" + aux3 + "=0;\ngoto L" + etiSa + ";\n";
                    codigo += "L" + etiV + ":\nt" + aux3 + "=1;\nL" + etiSa + ":\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(aux3);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + aux3, aux3)], codigo);
                }
            }
            else if (tipoA.isString()) {
                if (tipob.isString()) {
                    //let aux2 = VarGlobal.getInstance().contadorTemporales;
                    var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    //let aux4 = VarGlobal.getInstance().contadorTemporales;
                    var aux3 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    codigo += "t" + indice + "=" + traducA.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    codigo += "t" + indice2 + "=" + traducB.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    codigo += "t1=t" + indice + ";\n";
                    codigo += "t2=t" + indice2 + ";\n";
                    codigo += "call marvin_201602520_ToStringEquals;\n";
                    codigo += "t" + aux3 + "=t0;\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(aux3);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    if (signo == "<>") {
                        var L1 = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                        var L2 = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                        codigo += "if(t" + aux3 + "==1)goto L" + L1 + ";\n";
                        codigo += "t" + aux3 + "=1;\ngoto L" + L2 + ";\n";
                        codigo += "L" + L1 + ":\nt" + aux3 + "=0;\nL" + L2 + ":\n";
                    }
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + aux3, aux3)], codigo);
                }
            }
        }
        else {
            //mandan a pedir un traduccionlogica
            var cabeza = '';
            cabeza += traducA.ObtenerCodigo();
            cabeza += traducB.ObtenerCodigo();
            var partesuper = '';
            var etiquetaV = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
            var etiquetaF = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
            if (tipoA.esNumero()) {
                if (tipob.esNumero()) {
                    partesuper = "if(" + traducA.ObtenerEtiquetas()[0].etiqueta + signo + traducB.ObtenerEtiquetas()[0].etiqueta + ")goto L" + etiquetaV + ";\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica_1.TraduccionLogica([new Etiqueta_1.Etiqueta("L" + etiquetaV + ":\n", etiquetaV)], [new Etiqueta_1.Etiqueta("L" + etiquetaF + ":\n", etiquetaF)], partesuper, null, null, cabeza);
                }
                else if (tipob.isChar()) {
                    var aux2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    cabeza += "t" + indice + "=" + traducB.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    cabeza += "t" + aux2 + "=Heap[t" + indice + "];\n";
                    partesuper += "if(" + traducA.ObtenerEtiquetas()[0].etiqueta + signo + "t" + aux2 + ") goto L" + etiquetaV + ";\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica_1.TraduccionLogica([new Etiqueta_1.Etiqueta("L" + etiquetaV + ":\n", etiquetaV)], [new Etiqueta_1.Etiqueta("L" + etiquetaF + ":\n", etiquetaF)], partesuper, null, null, cabeza);
                }
            }
            else if (tipoA.isBoolean()) {
                if (tipob.isBoolean()) {
                    partesuper += "if(" + traducA.ObtenerEtiquetas()[0].etiqueta + signo + traducB.ObtenerEtiquetas()[0].etiqueta + ") goto L" + etiquetaV + ";\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica_1.TraduccionLogica([new Etiqueta_1.Etiqueta("L" + etiquetaV + ":\n", etiquetaV)], [new Etiqueta_1.Etiqueta("L" + etiquetaF + ":\n", etiquetaF)], partesuper, null, null, cabeza);
                }
            }
            else if (tipoA.isChar()) {
                if (tipob.isChar()) {
                    var aux2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var aux4 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    cabeza += "t" + indice + "=" + traducA.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    cabeza += "t" + aux2 + "=Heap[t" + indice + "];\n";
                    cabeza += "t" + indice2 + "=" + traducB.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    cabeza += "t" + aux4 + "=Heap[t" + indice2 + "];\n";
                    partesuper += "if(t" + aux4 + signo + "t" + aux2 + ") goto L" + etiquetaV + ";\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica_1.TraduccionLogica([new Etiqueta_1.Etiqueta("L" + etiquetaV + ":\n", etiquetaV)], [new Etiqueta_1.Etiqueta("L" + etiquetaF + ":\n", etiquetaF)], partesuper, null, null, cabeza);
                }
                else if (tipob.esNumero()) {
                    var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var aux2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var aux3 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    cabeza += "t" + indice + "=" + traducA.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    cabeza += "t" + aux2 + "=Heap[t" + indice + "];\n";
                    partesuper += "if(t" + aux2 + signo + traducB.ObtenerEtiquetas()[0].etiqueta + ") goto L" + etiquetaV + ";\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica_1.TraduccionLogica([new Etiqueta_1.Etiqueta("L" + etiquetaV + ":\n", etiquetaV)], [new Etiqueta_1.Etiqueta("L" + etiquetaF + ":\n", etiquetaF)], partesuper, null, null, cabeza);
                }
            }
            else if (tipoA.isString()) {
                if (tipob.isString()) {
                    //let aux2 = VarGlobal.getInstance().contadorTemporales;
                    var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    //let aux4 = VarGlobal.getInstance().contadorTemporales;
                    var aux3 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    cabeza += "t" + indice + "=" + traducA.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    cabeza += "t" + indice2 + "=" + traducB.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    cabeza += "t1=t" + indice + ";\n";
                    cabeza += "t2=t" + indice2 + ";\n";
                    cabeza += "call marvin_201602520_ToStringEquals;\n";
                    cabeza += "t" + aux3 + "=t0;\n";
                    partesuper += "if(t" + aux3 + signo + "1)goto L" + etiquetaV + ";\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica_1.TraduccionLogica([new Etiqueta_1.Etiqueta("L" + etiquetaV + ":\n", etiquetaV)], [new Etiqueta_1.Etiqueta("L" + etiquetaF + ":\n", etiquetaF)], partesuper, null, null, cabeza);
                }
            }
        }
        VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "No se puede operar esas expresiones en " + signo + " ", 3));
        return null;
    };
    Relacionales.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        var indicesigno = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'EXP', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.op1.GenerarNodo(indice);
        var json = JSON.parse(cad);
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        codigo.push({ data: { id: "" + indicesigno, name: "" + this.ObtenerSignoString(), weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + indice, target: "" + indicesigno, faveColor: '#6FB1FC', strength: 90 } });
        cad = this.op2.GenerarNodo(indice);
        json = JSON.parse(cad);
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return Relacionales;
}(Operacion_1.Operacion));
exports.Relacionales = Relacionales;
//# sourceMappingURL=Relacionales.js.map