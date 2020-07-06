"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Traduccion_1 = require("../3D/Traduccion");
var Etiqueta_1 = require("../3D/Etiqueta");
var TipoExp_1 = require("../Expresion/TipoExp");
var Print_1 = require("./Print");
var VarGlobal_1 = require("../Global/VarGlobal");
var Errores_1 = require("../Reportes/Errores");
var FuncionesPropias = /** @class */ (function () {
    function FuncionesPropias(ac, ant, tipo) {
        this.acceso = ac;
        this.tanterior = ant;
        this.tipoanterior = tipo;
    }
    FuncionesPropias.prototype.Generar = function (e) {
        //let codigo = ``;
        var linea = this.acceso.getLinea();
        var columna = this.acceso.getColumna();
        this.acceso.idfun.val = this.acceso.idfun.val.toLowerCase();
        if (this.acceso.idfun.val == "print") {
            if (this.tanterior != null) {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "La funcion print no es atributo de un objeto", 3));
                return null;
            }
            if (this.acceso.param.length == 1) {
                var print_1 = new Print_1.Print(this.acceso.param[0]);
                var traduc = print_1.Imprimir(e);
                this.tiposintetizado = new TipoExp_1.TipoExp(TipoExp_1.Tipo.VOID, null);
                return traduc;
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "La funcion print solo recibe unicamente un parametro", 3));
                return null;
            }
        }
        else if (this.acceso.idfun.val == "tochararray") {
            if (this.tanterior == null) {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "La funcion toCharArray tiene que ser propiedad de un array", 3));
                return null;
            }
            var tipo = this.tipoanterior;
            if (tipo.isString()) {
                var codigo = document.createTextNode('');
                codigo.appendData("t0=t" + this.tanterior.indice + ";\n");
                codigo.appendData("call marvin_201602520_ToCharArray;\n");
                var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                codigo.appendData("t" + indice + "=t0;\n");
                var nuevotipo = new TipoExp_1.TipoExp(TipoExp_1.Tipo.ARRAY, null);
                nuevotipo.tipoarray = TipoExp_1.Tipo.CHAR;
                this.tiposintetizado = nuevotipo;
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo.textContent);
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "Tiene que ser una cadena", 3));
                return null;
            }
        }
        else if (this.acceso.idfun.val == "length") {
            if (this.tanterior == null) {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "La funcion length tiene que ser propiedad de un string", 3));
                return null;
            }
            if (this.tipoanterior.isString()) {
                var codigo = document.createTextNode('');
                codigo.appendData("t0=t" + this.tanterior.indice + ";\n");
                codigo.appendData("call marvin_201602520_StringLength;\n");
                var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                codigo.appendData("t" + indice + "=t0;\n");
                this.tiposintetizado = new TipoExp_1.TipoExp(TipoExp_1.Tipo.INTEGER, null);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo.textContent);
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "Tiene que ser una cadena", 3));
                return null;
            }
        }
        else if (this.acceso.idfun.val == "touppercase") {
            if (this.tanterior == null) {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "La funcion upper tiene que ser propiedad de un string", 3));
                return null;
            }
            if (this.tipoanterior.isString()) {
                var codigo = document.createTextNode('\n');
                codigo.appendData("t0=t" + this.tanterior.indice + ";\n");
                codigo.appendData("call marvin_201602520_toUpperCase;\n");
                var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                codigo.appendData("t" + indice + "=t0;\n");
                this.tiposintetizado = new TipoExp_1.TipoExp(TipoExp_1.Tipo.STRING, null);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo.textContent);
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "Tiene que ser una cadena", 3));
                return null;
            }
        }
        else if (this.acceso.idfun.val == "tolowercase") {
            if (this.tanterior == null) {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "La funcion lower tiene que ser propiedad de un string", 3));
                return null;
            }
            if (this.tipoanterior.isString()) {
                var codigo = document.createTextNode('\n');
                codigo.appendData("t0=t" + this.tanterior.indice + ";\n");
                codigo.appendData("call marvin_201602520_toLowerCase;\n");
                var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                codigo.appendData("t" + indice + "=t0;\n");
                this.tiposintetizado = new TipoExp_1.TipoExp(TipoExp_1.Tipo.STRING, null);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo.textContent);
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "Tiene que ser una cadena", 3));
                return null;
            }
        }
        else if (this.acceso.idfun.val == "linealize") {
            if (this.tanterior == null) {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "La funcion lower tiene que ser propiedad de un string", 3));
                return null;
            }
            if (this.tipoanterior.isArray()) {
                var codigo = document.createTextNode('\n');
                codigo.appendData("t0=t" + this.tanterior.indice + ";\n");
                codigo.appendData("call marvin_201602520_linealize;\n");
                var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                codigo.appendData("t" + indice + "=t0;\n");
                this.tiposintetizado = new TipoExp_1.TipoExp(TipoExp_1.Tipo.STRING, null);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo.textContent);
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "Tiene que ser una cadena", 3));
                return null;
            }
        }
        else if (this.acceso.idfun.val == "charat") {
            if (this.tanterior == null) {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "La funcion charat tiene que ser propiedad de un string", 3));
                return null;
            }
            if (this.tipoanterior.isString()) {
                if (this.acceso.param.length == 1) {
                    var codigo = document.createTextNode('\n');
                    var valor = this.acceso.param[0].TraducirExp(e);
                    codigo.appendData(valor.ObtenerCodigo().toString());
                    codigo.appendData("t0=t" + this.tanterior.indice + ";\n");
                    var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var res = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    //codigo.appendData(`;\n`)
                    codigo.appendData("t" + indice + "=t0+t" + valor.ObtenerEtiquetas()[0].indice + ";\n");
                    VarGlobal_1.VarGlobal.getInstance().Apilar(res);
                    codigo.appendData("t" + indice + "=Heap[t" + indice + "];\n");
                    codigo.appendData("t" + res + "=H;\n");
                    codigo.appendData("Heap[H]=t" + indice + ";\n");
                    codigo.appendData("H=H+1;\n");
                    codigo.appendData("Heap[H]=-1;\n");
                    codigo.appendData("H=H+1;\n");
                    this.tiposintetizado = new TipoExp_1.TipoExp(TipoExp_1.Tipo.STRING, null);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + res, res)], codigo.textContent);
                }
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(linea, columna, "Tiene que ser una cadena", 3));
                return null;
            }
        }
    };
    return FuncionesPropias;
}());
exports.FuncionesPropias = FuncionesPropias;
//# sourceMappingURL=FuncionesPropias.js.map