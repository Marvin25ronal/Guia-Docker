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
var Instruccion_1 = require("./Instruccion");
var TipoExp_1 = require("../Expresion/TipoExp");
var VarGlobal_1 = require("../Global/VarGlobal");
var Entorno_1 = require("../Entorno/Entorno");
var Traduccion_1 = require("../3D/Traduccion");
var Variable_1 = require("../Entorno/Variable");
var Errores_1 = require("../Reportes/Errores");
var Arreglo_1 = require("../Entorno/Arreglo");
var Declaracion = /** @class */ (function (_super) {
    __extends(Declaracion, _super);
    function Declaracion(t, id, exp, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.tipo = t;
        _this.id = id;
        _this.exp = exp;
        return _this;
    }
    Declaracion.prototype.DeclararFuncion = function (e) {
        var codigo = "";
        if (this.tipo.isGlobal()) {
            //asignar valor a global
        }
        else if (this.tipo.isConst()) {
            return this.TraducirFuncionDeclaracionValorCONST(e);
        }
        else if (this.tipo.isVar()) {
            return this.TraducirFuncionDeclarionValorVAR(e);
        }
        else {
            if (this.exp != null) {
                //declaracion con valor
                return this.TraducirFuncionDeclarionValor(e);
            }
            else {
                return this.TraducirFuncionDeclaracionSinValor(e);
            }
        }
        return null;
    };
    Declaracion.prototype.TraducirFuncionDeclaracionValorCONST = function (e) {
        var codigo = "";
        var tipoexp = this.exp.GetTipo(e);
        //          console.log(tipoexp);
        if (tipoexp == null) {
            return null;
        }
        var valor = this.exp.TraducirExp(e);
        //            console.log(valor);
        if (valor == null) {
            return null;
        }
        for (var i = 0; i < this.id.length; i++) {
            var value = this.id[i];
            if (e.existeEntorno(value.val)) {
                VarGlobal_1.VarGlobal.getInstance().lErrores.push(new Errores_1.Errores(this.linea, this.columna, "Variable declarada " + value.val, 3));
                return null;
            }
            else {
                var nueva = new Variable_1.Variable(value.val, TipoExp_1.Tipo.CONST, Entorno_1.TipoEntorno.FUNCION, tipoexp, this.linea, this.columna);
                codigo += valor.ObtenerCodigo();
                var indice = e.GetPosicionStackVar();
                nueva.setRef(indice);
                e.insertar(nueva, value.val);
                var indiceP = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                codigo += "t" + indiceP + "=P+" + indice + ";\n";
                codigo += "Stack[t" + indiceP + "]=" + valor.ObtenerEtiquetas()[0].etiqueta + ";\n";
                e.correlativovar++;
            }
        }
        return new Traduccion_1.Traduccion([], codigo);
    };
    Declaracion.prototype.TraducirFuncionDeclaracionSinValor = function (e) {
        var codigo = "";
        for (var i = 0; i < this.id.length; i++) {
            var value = this.id[i];
            if (e.existeEntorno(value.val)) {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "Variable ya declarada", 3));
                return null;
            }
            else {
                var nueva = new Variable_1.Variable(value.val, TipoExp_1.Tipo.NORMAL, Entorno_1.TipoEntorno.FUNCION, this.tipo, this.linea, this.columna);
                var indice = e.GetPosicionStackVar();
                nueva.setRef(indice * -1);
                e.insertar(nueva, value.val);
                var indiceP = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                codigo += "t" + indiceP + "=P+" + indice + ";\n";
                codigo += "Stack[t" + indiceP + "]=-1;\n";
                e.correlativovar++;
            }
        }
        return new Traduccion_1.Traduccion([], codigo);
    };
    Declaracion.prototype.TraducirFuncionDeclarionValor = function (e) {
        var codigo = "";
        var tipoexp = this.exp.GetTipo(e);
        //          console.log(tipoexp);
        if (tipoexp == null) {
            return null;
        }
        var valor = this.exp.TraducirExp(e);
        //            console.log(valor);
        if (valor == null) {
            return null;
        }
        for (var i = 0; i < this.id.length; i++) {
            var value = this.id[i];
            if (e.existeEntorno(value.val)) {
                VarGlobal_1.VarGlobal.getInstance().lErrores.push(new Errores_1.Errores(this.linea, this.columna, "Variable declarada " + value.val, 3));
                return null;
            }
            else {
                if (tipoexp.sonCompatibles(this.tipo)) {
                    //cambio de tipo por si se cambia
                    tipoexp.tipo = this.tipo.tipo;
                    tipoexp.estructname = this.tipo.estructname;
                    var nueva = new Variable_1.Variable(value.val, TipoExp_1.Tipo.NORMAL, Entorno_1.TipoEntorno.FUNCION, tipoexp, this.linea, this.columna);
                    codigo += valor.ObtenerCodigo();
                    //agregamos el codigo de la variable
                    //obtenemos el indice de la variable
                    var indice = e.GetPosicionStackVar();
                    //  e.getPos();
                    nueva.setRef(indice);
                    e.insertar(nueva, value.val);
                    var indiceP = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    /*let indiceP1 = VarGlobal.getInstance().contadorTemporales;
                    let indiceP2 = VarGlobal.getInstance().contadorTemporales;
                    let indiceP3 = VarGlobal.getInstance().contadorTemporales;*/
                    codigo += "t" + indiceP + "=P+" + indice + ";\n";
                    codigo += "Stack[t" + indiceP + "]=" + valor.ObtenerEtiquetas()[0].etiqueta + ";\n";
                    /*codigo += `t${indiceP1}=P+${indice+1};\n`;
                    codigo += `Stack[t${indiceP}]=${valor.ObtenerEtiquetas()[0].etiqueta};\n`;*/
                    //guarda global
                    //gruardar ref-valor
                    //tipo
                    e.correlativovar++;
                }
                else {
                    VarGlobal_1.VarGlobal.getInstance().lErrores.push(new Errores_1.Errores(this.linea, this.columna, "Variable incompatible de tipo " + value.val, 3));
                    console.log(VarGlobal_1.VarGlobal.getInstance().lErrores);
                    return null;
                }
            }
        }
        return new Traduccion_1.Traduccion([], codigo);
    };
    Declaracion.prototype.TraducirFuncionDeclarionValorVAR = function (e) {
        var codigo = "";
        var tipoexp = this.exp.GetTipo(e);
        //          console.log(tipoexp);
        if (tipoexp == null) {
            return null;
        }
        var valor = this.exp.TraducirExp(e);
        //            console.log(valor);
        if (valor == null) {
            return null;
        }
        for (var i = 0; i < this.id.length; i++) {
            var value = this.id[i];
            if (e.existeEntorno(value.val)) {
                VarGlobal_1.VarGlobal.getInstance().lErrores.push(new Errores_1.Errores(this.linea, this.columna, "Variable declarada " + value.val, 3));
                return null;
            }
            else {
                var nueva = new Variable_1.Variable(value.val, TipoExp_1.Tipo.NORMAL, Entorno_1.TipoEntorno.FUNCION, tipoexp, this.linea, this.columna);
                codigo += valor.ObtenerCodigo();
                var indice = e.GetPosicionStackVar();
                nueva.setRef(indice);
                e.insertar(nueva, value.val);
                var indiceP = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                codigo += "t" + indiceP + "=P+" + indice + ";\n";
                codigo += "Stack[t" + indiceP + "]=" + valor.ObtenerEtiquetas()[0].etiqueta + ";\n";
                e.correlativovar++;
            }
        }
        return new Traduccion_1.Traduccion([], codigo);
    };
    Declaracion.prototype.TraducirInstruccion = function (e) {
        //dividimos las variables en las globales
        //entorno global ya que es la primera
        var codigo = "";
        if (this.tipo.isGlobal()) {
            //globales solo tienen una
            var id = this.id[0];
            if (e.existeGlobal(id.val)) {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "Variable global ya declarada", 3));
                return null;
            }
            var tipo = this.exp.GetTipo(e);
            if (tipo == null) {
                return null;
            }
            var exp = this.exp.TraducirExp(e);
            if (exp == null) {
                return;
            }
            var nueva = new Variable_1.Variable(id.val, TipoExp_1.Tipo.GLOBAL, Entorno_1.TipoEntorno.GLOBAL, tipo, this.linea, this.columna);
            nueva.setRef(e.getPos());
            e.insertar(nueva, id.val);
            codigo += exp.ObtenerCodigo();
            //agregamos el codigo de la variable
            var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
            codigo += "t" + indice + "=H;\n";
            nueva.setRef(indice);
            codigo += "Heap[t" + indice + "]=" + exp.ObtenerEtiquetas()[0].etiqueta + ";\n";
            codigo += "H=H+1;\n";
        }
        else if (this.tipo.isVar()) {
            var id = this.id[0];
            if (e.existeGlobal(id.val)) {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "Variable global ya declarada " + id.val, 3));
                return null;
            }
            var tipo = this.exp.GetTipo(e);
            if (tipo == null) {
                return null;
            }
            var exp = this.exp.TraducirExp(e);
            if (exp == null) {
                return;
            }
            var nueva = new Variable_1.Variable(id.val, TipoExp_1.Tipo.VAR, Entorno_1.TipoEntorno.GLOBAL, tipo, this.linea, this.columna);
            nueva.setRef(e.getPos());
            e.insertar(nueva, id.val);
            codigo += exp.ObtenerCodigo();
            //agregamos el codigo de la variable
            var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
            codigo += "t" + indice + "=H;\n";
            nueva.setRef(indice);
            codigo += "Heap[t" + indice + "]=" + exp.ObtenerEtiquetas()[0].etiqueta + ";\n";
            codigo += "H=H+1;\n";
        }
        else if (this.tipo.isConst()) {
            var id = this.id[0];
            if (e.existeGlobal(id.val)) {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "Variable global ya declarada " + id.val, 3));
                return null;
            }
            var tipo = this.exp.GetTipo(e);
            if (tipo == null) {
                return null;
            }
            var exp = this.exp.TraducirExp(e);
            if (exp == null) {
                return;
            }
            var nueva = new Variable_1.Variable(id.val, TipoExp_1.Tipo.CONST, Entorno_1.TipoEntorno.GLOBAL, tipo, this.linea, this.columna);
            nueva.setRef(e.getPos());
            e.insertar(nueva, id.val);
            codigo += exp.ObtenerCodigo();
            //agregamos el codigo de la variable
            var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
            codigo += "t" + indice + "=H;\n";
            nueva.setRef(indice);
            codigo += "Heap[t" + indice + "]=" + exp.ObtenerEtiquetas()[0].etiqueta + ";\n";
            codigo += "H=H+1;\n";
        }
        else if (this.tipo.isEstruct()) {
            //la logica de los struct
        }
        else {
            //parte en donde se declara 
            return this.Declarar2(e);
        }
        return new Traduccion_1.Traduccion([], codigo);
    };
    Declaracion.prototype.Declarar2 = function (e) {
        var codigo = "";
        if (this.exp == null) {
            //variables sin valor
            var tipo = this.tipo;
            var contador = 0;
            for (var i = 0; i < this.id.length; i++) {
                //debugger;
                if (this.tipo.isArray()) {
                    var value = this.id[i];
                    if (e.existeGlobal(value.val)) {
                        VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "Variable global ya declarada " + value.val, 3));
                        return null;
                    }
                    else {
                        //let tipoarray = new TipoExp(Tipo.ARRAY, '');
                        var nueva = new Arreglo_1.Arreglo(value.val, TipoExp_1.Tipo.NORMAL, Entorno_1.TipoEntorno.GLOBAL, this.tipo, this.linea, this.columna);
                        var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                        codigo += "t" + indice + "=H;\n";
                        codigo += "H=H+1;\n";
                        e.getPos();
                        nueva.ref = -1 * indice;
                        e.insertar(nueva, value.val);
                        contador++;
                    }
                }
                else {
                    var value = this.id[i];
                    if (e.existeGlobal(value.val)) {
                        VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "Variable global ya declarada " + value.val, 3));
                        return null;
                    }
                    else {
                        var nueva = new Variable_1.Variable(value.val, TipoExp_1.Tipo.NORMAL, Entorno_1.TipoEntorno.GLOBAL, tipo, this.linea, this.columna);
                        var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                        codigo += "t" + indice + "=H;\n";
                        codigo += "H=H+1;\n";
                        e.getPos();
                        nueva.setRef(-1 * indice);
                        e.insertar(nueva, value.val);
                        // let indice = VarGlobal.getInstance().contadorTemporales;
                        //codigo+=`t${indice}=H;\n`
                        //codigo+=`H=H+1;\n`
                        contador++;
                    }
                }
            }
            codigo += "H=H+" + contador + ";\n";
        }
        else {
            var tipoexp = this.exp.GetTipo(e);
            //          console.log(tipoexp);
            if (tipoexp == null) {
                return null;
            }
            var valor = this.exp.TraducirExp(e);
            //            console.log(valor);
            if (valor == null) {
                return null;
            }
            for (var i = 0; i < this.id.length; i++) {
                if (this.tipo.isArray()) {
                    var indicador = this.id[i];
                    if (tipoexp.isArray()) {
                        if (!tipoexp.sonCompatibles(this.tipo)) {
                            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "El tipo no es el mismo del array", 3));
                            return null;
                        }
                        codigo += valor.ObtenerCodigo();
                        //  let tam = valor.ObtenerEtiquetas()[1];
                        //let pos = valor.ObtenerEtiquetas()[0];
                        var nueva = new Arreglo_1.Arreglo(indicador.val, TipoExp_1.Tipo.NORMAL, Entorno_1.TipoEntorno.GLOBAL, tipoexp, this.linea, this.columna);
                        nueva.ref = e.getPos();
                        e.insertar(nueva, indicador.val);
                        //codigo += valor.ObtenerCodigo();
                        var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                        codigo += "t" + indice + "=H;\n";
                        nueva.ref = indice;
                        codigo += "Heap[t" + indice + "]=" + valor.ObtenerEtiquetas()[0].etiqueta + ";\n";
                        codigo += "H=H+1;\n";
                    }
                    else {
                        VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "El valor no es un arreglo", 3));
                        return null;
                    }
                }
                else {
                    var value = this.id[i];
                    if (e.existeGlobal(value.val)) {
                        VarGlobal_1.VarGlobal.getInstance().lErrores.push(new Errores_1.Errores(this.linea, this.columna, "Variable global ya declarada " + value.val, 3));
                        return null;
                    }
                    else {
                        if (tipoexp.sonCompatibles(this.tipo)) {
                            //cambio de tipo por si se cambia
                            tipoexp.tipo = this.tipo.tipo;
                            tipoexp.estructname = this.tipo.estructname;
                            var nueva = new Variable_1.Variable(value.val, TipoExp_1.Tipo.NORMAL, Entorno_1.TipoEntorno.GLOBAL, tipoexp, this.linea, this.columna);
                            e.getPos();
                            e.insertar(nueva, value.val);
                            codigo += valor.ObtenerCodigo();
                            //agregamos el codigo de la variable
                            var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                            codigo += "t" + indice + "=H;\n";
                            nueva.setRef(indice);
                            //debugger;
                            codigo += "Heap[t" + indice + "]=" + valor.ObtenerEtiquetas()[0].etiqueta + ";\n";
                            codigo += "H=H+1;\n";
                            if (tipoexp.esCadena()) {
                                nueva.setRef(indice);
                            }
                        }
                        else {
                            VarGlobal_1.VarGlobal.getInstance().lErrores.push(new Errores_1.Errores(this.linea, this.columna, "Variable incompatible de tipo " + value.val, 3));
                            console.log(VarGlobal_1.VarGlobal.getInstance().lErrores);
                            return null;
                        }
                    }
                }
            }
        }
        return new Traduccion_1.Traduccion([], codigo);
    };
    Declaracion.prototype.GenerarNodo = function (padre) {
        var indiceDec = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        var indiceTipo = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        var codigo = [];
        var enlace = [];
        codigo.push({ data: { id: "" + indiceDec, name: 'DECLARACION', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        codigo.push({ data: { id: "" + indiceTipo, name: "TIPO{" + this.tipo.toString() + "}", weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indiceDec, faveColor: '#6FB1FC', strength: 90 } });
        enlace.push({ data: { source: "" + indiceDec, target: "" + indiceTipo, faveColor: '#6FB1FC', strength: 90 } });
        for (var i = 0; i < this.id.length; i++) {
            var cad = this.id[i].GenerarNodo(indiceDec);
            var json = JSON.parse(cad.toString());
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        }
        if (this.exp != null) {
            var cad = this.exp.GenerarNodo(indiceDec);
            var json = JSON.parse(cad);
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return Declaracion;
}(Instruccion_1.Instruccion));
exports.Declaracion = Declaracion;
//# sourceMappingURL=Declaracion.js.map