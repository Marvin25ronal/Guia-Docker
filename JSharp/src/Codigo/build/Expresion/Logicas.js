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
var Signo_1 = require("../Operaciones/Signo");
var Traduccion_1 = require("../3D/Traduccion");
var Operacion_1 = require("../Operaciones/Operacion");
var VarGlobal_1 = require("../Global/VarGlobal");
var TipoExp_1 = require("./TipoExp");
var Errores_1 = require("../Reportes/Errores");
var TraduccionLogica_1 = require("../3D/TraduccionLogica");
var Etiqueta_1 = require("../3D/Etiqueta");
var Logica = /** @class */ (function (_super) {
    __extends(Logica, _super);
    function Logica(exp1, exp2, signo, linea, columna) {
        return _super.call(this, exp1, exp2, signo, linea, columna) || this;
    }
    Logica.prototype.GetTipo = function (e) {
        return new TipoExp_1.TipoExp(TipoExp_1.Tipo.BOOLEAN, null);
    };
    Logica.prototype.TraducirExp = function (e) {
        var tipoA = this.op1.GetTipo(e);
        var tipoB = this.op2.GetTipo(e);
        if (tipoA == null || tipoB == null) {
            return null;
        }
        if (tipoA.isBoolean() && tipoB.isBoolean()) {
            this.op1.islogical = true;
            this.op2.islogical = true;
            //debugger;
            var tradA = this.op1.TraducirExp(e);
            var tradB = this.op2.TraducirExp(e);
            if (tradA == null || tradB == null) {
                return null;
            }
            if (this.op == Signo_1.Signo.OR) {
                return this.TraducirOR(tradA, tradB);
            }
            else if (this.op == Signo_1.Signo.AND) {
                return this.TraducirAND(tradA, tradB);
            }
            else if (this.op == Signo_1.Signo.POTENCIA) {
                return this.TraducirXOR(tradA, tradB);
            }
        }
        else {
            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "No sepude hacer ese tipo de operacion logica", 3));
            return null;
        }
    };
    Logica.prototype.TraducirXOR = function (tradA, tradB) {
        var A = tradA;
        var B = tradB;
        debugger;
        if (this.islogical == false) {
            var codigo = "";
            codigo += A.encabezado;
            codigo += B.encabezado;
            codigo += A.partesuperior;
            codigo += "goto L" + A.etiquetasFalsas[0].indice + ";\n";
            codigo += A.etiquetasFalsas[0].indice;
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
    Logica.prototype.TraducirAND = function (tradA, tradB) {
        var A = tradA;
        var B = tradB;
        if (this.islogical == false) {
            var codigo = "";
            codigo += A.encabezado;
            codigo += B.encabezado;
            codigo += A.partesuperior;
            codigo += "goto L" + A.etiquetasFalsas[0].indice + ";\n";
            codigo += A.etiquetasVerdaderas[0].etiqueta;
            codigo += B.partesuperior;
            codigo += "goto L" + B.etiquetasFalsas[0].indice + ";\n";
            codigo += B.etiquetasVerdaderas[0].etiqueta;
            var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
            var salida = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
            codigo += "t" + indice + "=1;\n";
            codigo += "goto L" + salida + ";\n";
            for (var i = 0; i < A.etiquetasFalsas.length; i++) {
                codigo += A.etiquetasFalsas[i].etiqueta;
            }
            for (var i = 0; i < B.etiquetasFalsas.length; i++) {
                codigo += B.etiquetasFalsas[i].etiqueta;
            }
            codigo += "t" + indice + "=0;\n";
            codigo += "L" + salida + ":\n";
            VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
            return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
        }
        else {
            var encabezado = "";
            var codigo = "";
            encabezado += A.encabezado;
            encabezado += B.encabezado;
            codigo += A.partesuperior;
            codigo += "goto L" + A.etiquetasFalsas[0].indice + ";\n";
            codigo += A.etiquetasVerdaderas[0].etiqueta;
            codigo += B.partesuperior;
            //codigo += `goto L${B.etiquetasFalsas[0].indice};\n`;
            var etiquetasver = [];
            etiquetasver = B.etiquetasVerdaderas;
            var etiquetasfal = [];
            etiquetasfal = B.etiquetasFalsas.concat(A.etiquetasFalsas);
            return new TraduccionLogica_1.TraduccionLogica(etiquetasver, etiquetasfal, codigo, null, null, encabezado);
        }
    };
    Logica.prototype.TraducirOR = function (tradA, tradB) {
        var A = tradA;
        var B = tradB;
        //console.log(this.islogical);
        if (this.islogical == false) {
            //se traduce normal
            var codigo = "";
            codigo += A.encabezado;
            codigo += B.encabezado;
            codigo += A.partesuperior;
            codigo += "goto L" + A.etiquetasFalsas[0].indice + ";\n";
            codigo += A.etiquetasFalsas[0].etiqueta;
            codigo += B.partesuperior;
            codigo += "goto L" + B.etiquetasFalsas[0].indice + ";\n";
            for (var i = 0; i < A.etiquetasVerdaderas.length; i++) {
                codigo += A.etiquetasVerdaderas[i].etiqueta;
            }
            for (var i = 0; i < B.etiquetasVerdaderas.length; i++) {
                codigo += B.etiquetasVerdaderas[i].etiqueta;
            }
            var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
            var salida = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
            codigo += "t" + indice + "=1;\n";
            codigo += "goto L" + salida + ";\n";
            for (var i = 1; i < A.etiquetasFalsas.length; i++) {
                codigo += A.etiquetasFalsas[i].etiqueta;
            }
            for (var i = 0; i < B.etiquetasFalsas.length; i++) {
                codigo += B.etiquetasFalsas[i].etiqueta;
            }
            codigo += "t" + indice + "=0;\n";
            codigo += "L" + salida + ":\n";
            VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
            return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
        }
        else {
            var encabezado = "";
            var codigo = "";
            encabezado += A.encabezado;
            encabezado += B.encabezado;
            codigo += A.partesuperior;
            codigo += "goto L" + A.etiquetasFalsas[0].indice + ";\n";
            for (var i = 0; i < A.etiquetasFalsas.length; i++) {
                codigo += A.etiquetasFalsas[i].etiqueta;
            }
            codigo += B.partesuperior;
            //codigo += `goto L${B.etiquetasFalsas[0].indice};\n`;
            var etiquetasver = [];
            etiquetasver = B.etiquetasVerdaderas.concat(A.etiquetasVerdaderas);
            var etiquetasfal = [];
            etiquetasfal = B.etiquetasFalsas;
            return new TraduccionLogica_1.TraduccionLogica(etiquetasver, etiquetasfal, codigo, null, null, encabezado);
            //codigo += B.etiquetasFalsas[0].etiqueta;
        }
        return null;
    };
    Logica.prototype.GenerarNodo = function (padre) {
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
    return Logica;
}(Operacion_1.Operacion));
exports.Logica = Logica;
//# sourceMappingURL=Logicas.js.map