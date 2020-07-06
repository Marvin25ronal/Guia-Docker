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
var Operacion_1 = require("./Operacion");
var Signo_1 = require("./Signo");
var VarGlobal_1 = require("../Global/VarGlobal");
var Traduccion_1 = require("../3D/Traduccion");
var TipoExp_1 = require("../Expresion/TipoExp");
var Errores_1 = require("../Reportes/Errores");
var Etiqueta_1 = require("../3D/Etiqueta");
var TraduccionLogica_1 = require("../3D/TraduccionLogica");
var Aritmetica = /** @class */ (function (_super) {
    __extends(Aritmetica, _super);
    function Aritmetica(op1, op2, s, linea, columna) {
        return _super.call(this, op1, op2, s, linea, columna) || this;
    }
    Aritmetica.prototype.GetTipo = function (e) {
        return this.maxTipo(e);
    };
    Aritmetica.prototype.GenerarNodo = function (padre) {
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
    Aritmetica.prototype.TraducirExp = function (e) {
        var codigo = "";
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
        var tipomax = this.maxTipo(e);
        if (tipomax == null) {
            return null;
        }
        if (tipomax.esCadena()) {
            //regla de cadenas
            if (this.op == Signo_1.Signo.SUMA) {
                //evaluar que tipo es cada uno
                if (tipoA.esCadena()) {
                    codigo += traducA.ObtenerCodigo();
                    codigo += traducB.ObtenerCodigo();
                    var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var etiquetaA = traducA.ObtenerEtiquetas();
                    var etiquetaB = traducB.ObtenerEtiquetas();
                    if (tipoB.esCadena()) {
                        codigo += "t1=t" + etiquetaA[0].indice + ";\n";
                        codigo += "t2=t" + etiquetaB[0].indice + ";\n";
                        codigo += "call marvin_201602520_SumarCadena;\n";
                        codigo += "t" + indice + "=t0;\n";
                        VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                        return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
                    }
                    else if (tipoB.isBoolean()) {
                        var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                        codigo += "t0=t" + etiquetaB[0].indice + ";\n";
                        codigo += "call marvin_201602520_ConvertirBooleanoString;\n";
                        codigo += "t" + indice + "=t0;\n";
                        //parte en donde se suman
                        codigo += "t1=t" + etiquetaA[0].indice + ";\n";
                        codigo += "t2=t" + indice + ";\n";
                        codigo += "call marvin_201602520_SumarCadena;\n";
                        codigo += "t" + indice2 + "=t0;\n";
                        VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(indice2);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                        return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice2, indice2)], codigo);
                    }
                    else if (tipoB.isInteger()) {
                        codigo += "t0=t" + etiquetaB[0].indice + ";\n";
                        codigo += "call marvin_201602520_ConvertirIntegertoString;\n";
                        codigo += "t" + indice + "=t0;\n";
                        codigo += "call marvin_201602520_CambiarNumeroAscii;\n";
                        codigo += "t" + indice + "=t0;\n";
                        var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                        codigo += "t1=t" + etiquetaA[0].indice + ";\n";
                        codigo += "t2=t" + indice + ";\n";
                        codigo += "call marvin_201602520_SumarCadena;\n";
                        codigo += "t" + indice2 + "=t0;\n";
                        VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(indice2);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                        return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice2, indice2)], codigo);
                    }
                    else if (tipoB.isDouble()) {
                        codigo += "t0=t" + etiquetaB[0].indice + ";\n";
                        codigo += "call marvin_201602520_DoubleToString;\n";
                        codigo += "t" + indice + "=t0;\n";
                        var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                        codigo += "t1=t" + etiquetaA[0].indice + ";\n";
                        codigo += "t2=t" + indice + ";\n";
                        codigo += "call marvin_201602520_SumarCadena;\n";
                        codigo += "t" + indice2 + "=t0;\n";
                        VarGlobal_1.VarGlobal.getInstance().Apilar(indice2);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                        return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice2, indice2)], codigo);
                    }
                }
                else if (tipoB.esCadena()) {
                    codigo += traducA.ObtenerCodigo();
                    codigo += traducB.ObtenerCodigo();
                    var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var etiquetaA = traducA.ObtenerEtiquetas();
                    var etiquetaB = traducB.ObtenerEtiquetas();
                    if (tipoA.esCadena()) {
                        codigo += "t1=t" + etiquetaA[0].indice + ";\n";
                        codigo += "t2=t" + etiquetaB[0].indice + ";\n";
                        codigo += "call marvin_201602520_SumarCadena;\n";
                        codigo += "t" + indice + "=t0;\n";
                        VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                        return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
                    }
                    else if (tipoA.isBoolean()) {
                        var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                        codigo += "t0=t" + etiquetaA[0].indice + ";\n";
                        codigo += "call marvin_201602520_ConvertirBooleanoString;\n";
                        codigo += "t" + indice + "=t0;\n";
                        //parte en donde se suman
                        codigo += "t2=t" + etiquetaB[0].indice + ";\n";
                        codigo += "t1=t" + indice + ";\n";
                        codigo += "call marvin_201602520_SumarCadena;\n";
                        codigo += "t" + indice2 + "=t0;\n";
                        VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(indice2);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                        return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice2, indice2)], codigo);
                    }
                    else if (tipoA.isInteger()) {
                        codigo += "t0=t" + etiquetaA[0].indice + ";\n";
                        codigo += "call marvin_201602520_ConvertirIntegertoString;\n";
                        codigo += "t" + indice + "=t0;\n";
                        codigo += "call marvin_201602520_CambiarNumeroAscii;\n";
                        codigo += "t" + indice + "=t0;\n";
                        var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                        codigo += "t2=t" + etiquetaB[0].indice + ";\n";
                        codigo += "t1=t" + indice + ";\n";
                        codigo += "call marvin_201602520_SumarCadena;\n";
                        codigo += "t" + indice2 + "=t0;\n";
                        VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(indice2);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                        VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                        return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice2, indice2)], codigo);
                    }
                }
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "Las cadenas no se pueden operar con esos operadores", 3));
                return null;
            }
        }
        else {
            //console.log('yea')
            codigo += traducA.ObtenerCodigo();
            codigo += traducB.ObtenerCodigo();
            var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
            var etiquetaA = traducA.ObtenerEtiquetas();
            var etiquetaB = traducB.ObtenerEtiquetas();
            if (this.op1.GetTipo(e).isChar()) {
                //quiere decir que es char y lo tenemos que sacar del heap
                var taux = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                codigo += "t" + taux + "=" + etiquetaA[0].etiqueta + ";\n";
                codigo += etiquetaA[0].etiqueta + "=Heap[t" + taux + "];\n";
            }
            if (this.op2.GetTipo(e).isChar()) {
                var taux = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                codigo += "t" + taux + "=" + etiquetaB[0].etiqueta + ";\n";
                codigo += etiquetaB[0].etiqueta + "=Heap[t" + taux + "];\n";
            }
            if (this.op == Signo_1.Signo.SUMA) {
                codigo += "t" + indice + "=" + etiquetaA[0].etiqueta + "+" + etiquetaB[0].etiqueta + ";\n";
                VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
            }
            else if (this.op == Signo_1.Signo.RESTA) {
                VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                codigo += "t" + indice + "=" + etiquetaA[0].etiqueta + "-" + etiquetaB[0].etiqueta + ";\n";
                VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
            }
            else if (this.op == Signo_1.Signo.MULTIPLICACION) {
                codigo += "t" + indice + "=" + etiquetaA[0].etiqueta + "*" + etiquetaB[0].etiqueta + ";\n";
                VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
            }
            else if (this.op == Signo_1.Signo.DIVISION) {
                var Lno = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                var lSalida = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                codigo += "if (" + etiquetaB[0].etiqueta + "<>0) goto L" + Lno + ";\nE=1;\ngoto L" + lSalida + ";\nL" + Lno + ":\n";
                codigo += "t" + indice + "=" + etiquetaA[0].etiqueta + "/" + etiquetaB[0].etiqueta + ";\n";
                codigo += "L" + lSalida + ":\n";
                VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
            }
            else if (this.op == Signo_1.Signo.MODULO) {
                codigo += "t" + indice + "=" + etiquetaA[0].etiqueta + "%" + etiquetaB[0].etiqueta + ";\n";
                VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
            }
            else if (this.op == Signo_1.Signo.POTENCIA) {
                //esta pisado la potencia   
                if (tipoA.isBoolean() && tipoB.isBoolean()) {
                    this.op1.islogical = true;
                    this.op2.islogical = true;
                    var a = this.op1.TraducirExp(e);
                    var b = this.op2.TraducirExp(e);
                    return this.TraducirXOR(a, b);
                }
                var indice_1 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                codigo += "t1=" + etiquetaA[0].etiqueta + ";\n";
                codigo += "t2=" + etiquetaB[0].etiqueta + ";\n";
                codigo += "call marvin_201602520_Potencia;\n";
                codigo += "t" + indice_1 + "=t0;\n";
                VarGlobal_1.VarGlobal.getInstance().Apilar(indice_1);
                VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                VarGlobal_1.VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice_1, indice_1)], codigo);
            }
        }
        return null;
    };
    Aritmetica.prototype.maxTipo = function (e) {
        switch (this.op) {
            case Signo_1.Signo.SUMA:
                return this.ReglasSuma(e);
            case Signo_1.Signo.RESTA:
                return this.ReglasResta(e);
            case Signo_1.Signo.MULTIPLICACION:
                return this.ReglasResta(e);
            case Signo_1.Signo.DIVISION:
                return this.ReglasResta(e);
            case Signo_1.Signo.MODULO:
                return this.ReglasPotencia(e);
            case Signo_1.Signo.POTENCIA:
                return this.ReglasPotencia(e);
        }
        return null;
    };
    Aritmetica.prototype.ReglasPotencia = function (e) {
        var tipoA = this.op1.GetTipo(e);
        var tipoB = this.op2.GetTipo(e);
        if (tipoA == null || tipoB == null) {
            return null;
        }
        if (tipoA.isInteger() && tipoB.isInteger()) {
            console.log('EEEEe');
            return new TipoExp_1.TipoExp(TipoExp_1.Tipo.INTEGER, null);
        }
        else if (tipoA.isBoolean() && tipoB.isBoolean()) {
            return new TipoExp_1.TipoExp(TipoExp_1.Tipo.BOOLEAN, null);
        }
        var nuevo = new Errores_1.Errores(this.linea, this.columna, "No se pueden hacer esa operacion con " + this.op + " ese tipo de objetos", 3);
        VarGlobal_1.VarGlobal.getInstance().agregarError(nuevo);
        return null;
    };
    Aritmetica.prototype.TraducirXOR = function (tradA, tradB) {
        var A = tradA;
        var B = tradB;
        if (this.islogical == false) {
            var codigo = "";
            codigo += A.encabezado;
            codigo += B.encabezado;
            codigo += A.partesuperior;
            codigo += "goto L" + A.etiquetasFalsas[0].indice + ";\n";
            codigo += A.etiquetasFalsas[0].etiqueta;
            codigo += B.partesuperior;
            codigo += "goto L" + B.etiquetasFalsas[0].indice + ";\n";
            codigo += A.etiquetasVerdaderas[0].etiqueta;
            var indiceb = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
            var cadaux = B.partesuperior.replace("L" + B.etiquetasVerdaderas[0].indice, "L" + indiceb);
            codigo += cadaux;
            var indicebF = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
            codigo += "goto L" + indicebF + ";\n";
            codigo += B.etiquetasVerdaderas[0].etiqueta;
            codigo += "L" + indicebF + ":\n";
            var inidt = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
            codigo += "t" + inidt + "=1;\n";
            var salida = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
            codigo += "goto L" + salida + ";\n";
            codigo += "L" + indiceb + ":\n";
            codigo += B.etiquetasFalsas[0].etiqueta;
            codigo += "t" + inidt + "=0;\n";
            codigo += "L" + salida + ":\n";
            VarGlobal_1.VarGlobal.getInstance().Apilar(inidt);
            return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + inidt, inidt)], codigo);
        }
        else {
            var encabezado = "";
            var codigo = "";
            var etiquetanueva = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
            encabezado += A.encabezado;
            encabezado += B.encabezado;
            codigo += A.partesuperior;
            debugger;
            codigo += "goto L" + A.etiquetasFalsas[0].indice + ";\n";
            for (var i = 0; i < A.etiquetasFalsas.length; i++) {
                codigo += A.etiquetasFalsas[i].etiqueta;
            }
            //codigo+=A.etiquetasFalsas[0].etiqueta
            codigo += B.partesuperior;
            codigo += "goto L" + B.etiquetasFalsas[0].indice + ";\n";
            for (var i = 0; i < A.etiquetasVerdaderas.length; i++) {
                codigo += A.etiquetasVerdaderas[i].etiqueta;
            }
            codigo += B.partesuperior.replace('L' + B.etiquetasVerdaderas[0].indice, "L" + etiquetanueva);
            var Nueva = new Etiqueta_1.Etiqueta("L" + etiquetanueva + ":\n", etiquetanueva);
            var etiverda = [];
            for (var i = 0; i < B.etiquetasVerdaderas.length; i++) {
                //codigo+=B.etiquetasVerdaderas[i].etiqueta
                etiverda.push(B.etiquetasVerdaderas[i]);
            }
            var etifalsa = [];
            etifalsa.push(Nueva);
            etifalsa = etifalsa.concat(B.etiquetasFalsas);
            return new TraduccionLogica_1.TraduccionLogica(etiverda, etifalsa, codigo, null, null, encabezado);
        }
    };
    Aritmetica.prototype.ReglasSuma = function (e) {
        var tipoa = this.op1.GetTipo(e);
        var tipob = this.op2.GetTipo(e);
        if (tipoa == null || tipob == null) {
            return null;
        }
        if (tipoa.isEstruct() || tipob.isEstruct()) {
            //Es un error
            var nuevo_1 = new Errores_1.Errores(this.linea, this.columna, "No se pueden sumar ese tipo de objetos", 3);
            VarGlobal_1.VarGlobal.getInstance().agregarError(nuevo_1);
            return null;
        }
        else if (tipoa.isString() || tipob.isString()) {
            return new TipoExp_1.TipoExp(TipoExp_1.Tipo.STRING, null);
        }
        else if (tipoa.isInteger()) {
            if (tipob.isInteger()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.INTEGER, null);
            }
            else if (tipob.isDouble()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.DOUBLE, null);
            }
            else if (tipob.isChar()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.INTEGER, null);
            }
        }
        else if (tipoa.isDouble()) {
            if (tipob.esNumero()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.DOUBLE, null);
            }
            else if (tipob.isChar()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.DOUBLE, null);
            }
        }
        else if (tipoa.isChar()) {
            if (tipob.isChar()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.STRING, null);
            }
            else if (tipob.isDouble()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.DOUBLE, null);
            }
            else if (tipob.isInteger()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.INTEGER, null);
            }
        }
        else if (tipoa.isBoolean()) {
            if (tipob.isBoolean()) {
                if (this.op == Signo_1.Signo.POTENCIA) {
                    return new TipoExp_1.TipoExp(TipoExp_1.Tipo.BOOLEAN, null);
                }
            }
        }
        var nuevo = new Errores_1.Errores(this.linea, this.columna, "No se pueden hacer esa operacion con " + this.op + " ese tipo de objetos", 3);
        VarGlobal_1.VarGlobal.getInstance().agregarError(nuevo);
        return null;
    };
    Aritmetica.prototype.ReglasResta = function (e) {
        var tipoA = this.op1.GetTipo(e);
        var tipoB = this.op2.GetTipo(e);
        if (tipoA == null || tipoB == null) {
            return null;
        }
        if (tipoA.isInteger()) {
            if (tipoB.isInteger()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.INTEGER, null);
            }
            else if (tipoB.isDouble()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.DOUBLE, null);
            }
            else if (tipoB.isChar()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.INTEGER, null);
            }
        }
        else if (tipoA.isDouble()) {
            if (tipoB.isChar()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.DOUBLE, null);
            }
            else if (tipoB.esNumero()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.DOUBLE, null);
            }
        }
        else if (tipoA.isChar()) {
            if (tipoB.isInteger()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.INTEGER, null);
            }
            else if (tipoB.isDouble()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.DOUBLE, null);
            }
            else if (tipoB.isChar()) {
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.INTEGER, null);
            }
        }
        var nuevo = new Errores_1.Errores(this.linea, this.columna, "No se pueden hacer esa operacion con " + this.op + " ese tipo de objetos", 3);
        VarGlobal_1.VarGlobal.getInstance().agregarError(nuevo);
        return null;
    };
    return Aritmetica;
}(Operacion_1.Operacion));
exports.Aritmetica = Aritmetica;
//# sourceMappingURL=Aritmetica.js.map