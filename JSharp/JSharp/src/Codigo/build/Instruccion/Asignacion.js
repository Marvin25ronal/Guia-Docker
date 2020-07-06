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
var VarGlobal_1 = require("../Global/VarGlobal");
var Traduccion_1 = require("../3D/Traduccion");
var Errores_1 = require("../Reportes/Errores");
var TipoExp_1 = require("../Expresion/TipoExp");
var Entorno_1 = require("../Entorno/Entorno");
var Asignacion = /** @class */ (function (_super) {
    __extends(Asignacion, _super);
    function Asignacion(valor, exp, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.id = valor;
        _this.exp = exp;
        return _this;
    }
    Asignacion.prototype.TraducirInstruccion = function (e) {
        //debugger;
        if (e.existe(this.id.val)) {
            var variable = e.getSimbolo(this.id.val);
            var vari = variable;
            var codigo = "";
            if (vari.ambito == Entorno_1.TipoEntorno.GLOBAL) {
                //todas las que estan en el heap
                if (vari.modificador == TipoExp_1.Tipo.GLOBAL) {
                    var tipoex = this.exp.GetTipo(e);
                    if (tipoex == null) {
                        return null;
                    }
                    var valorex = this.exp.TraducirExp(e);
                    if (valorex == null) {
                        return null;
                    }
                    if (tipoex.isEstruct()) {
                    }
                    else {
                        if (tipoex.sonCompatibles(vari.tipo)) {
                            if (vari.ref < 0 || vari.ref.toString() == "-0") {
                                vari.ref = vari.ref * -1;
                            }
                            codigo += valorex.ObtenerCodigo();
                            codigo += "Heap[t" + vari.ref + "]=t" + valorex.ObtenerEtiquetas()[0].indice + ";\n";
                            // vari.tipo = tipoex;
                            return new Traduccion_1.Traduccion([], codigo);
                        }
                        else {
                            VarGlobal_1.VarGlobal.getInstance().lErrores.push(new Errores_1.Errores(this.linea, this.columna, "Variable incompatible de tipo " + vari.nombre, 3));
                            return null;
                        }
                        //let indice = VarGlobal.getInstance().contadorTemporales;
                    }
                }
                else if (vari.modificador == TipoExp_1.Tipo.CONST) {
                    VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "La Variable " + vari.nombre + " es de tipo CONST no se puede modificar", 3));
                    return null;
                }
                else if (vari.modificador == TipoExp_1.Tipo.VAR) {
                    //las var
                    var tipoex = this.exp.GetTipo(e);
                    if (tipoex == null) {
                        return null;
                    }
                    var valorex = this.exp.TraducirExp(e);
                    if (valorex == null) {
                        return null;
                    }
                    if (tipoex.isEstruct()) {
                    }
                    else {
                        if (tipoex.sonCompatibles(vari.tipo)) {
                            if (vari.ref < 0 || vari.ref.toString() == "-0") {
                                vari.ref = vari.ref * -1;
                            }
                            codigo += valorex.ObtenerCodigo();
                            codigo += "Heap[t" + vari.ref + "]=t" + valorex.ObtenerEtiquetas()[0].indice + ";\n";
                            //vari.tipo = tipoex;
                            return new Traduccion_1.Traduccion([], codigo);
                        }
                        else {
                            VarGlobal_1.VarGlobal.getInstance().lErrores.push(new Errores_1.Errores(this.linea, this.columna, "Variable incompatible de tipo " + vari.nombre, 3));
                            return null;
                        }
                        //let indice = VarGlobal.getInstance().contadorTemporales;
                    }
                }
                else if (vari.modificador == TipoExp_1.Tipo.NORMAL) {
                    var tipoex = this.exp.GetTipo(e);
                    if (tipoex == null) {
                        return null;
                    }
                    var valorexp = this.exp.TraducirExp(e);
                    if (valorexp == null) {
                        return null;
                    }
                    var tipovar = vari.tipo;
                    if (tipovar.isEstruct()) {
                        //comparacion de estructuras
                    }
                    else {
                        if (tipoex.sonCompatibles(tipovar)) {
                            //let indice = VarGlobal.getInstance().contadorTemporales;
                            if (vari.ref < 0 || vari.ref.toString() == "-0") {
                                vari.ref = vari.ref * -1;
                            }
                            codigo += valorexp.ObtenerCodigo();
                            codigo += "Heap[t" + vari.ref + "]=t" + valorexp.ObtenerEtiquetas()[0].indice + ";\n";
                            return new Traduccion_1.Traduccion([], codigo);
                        }
                        else {
                            VarGlobal_1.VarGlobal.getInstance().lErrores.push(new Errores_1.Errores(this.linea, this.columna, "Variable incompatible de tipo " + vari.nombre, 3));
                            return null;
                        }
                    }
                }
            }
            else {
                //son todas las que estan en la funcion 
                var tipoex = this.exp.GetTipo(e);
                if (tipoex == null) {
                    return null;
                }
                var valorexp = this.exp.TraducirExp(e);
                if (valorexp == null) {
                    return null;
                }
                var tipovar = vari.tipo;
                if (vari.modificador == TipoExp_1.Tipo.CONST) {
                    VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "La Variable " + vari.nombre + " es de tipo CONST no se puede modificar", 3));
                    return null;
                }
                if (tipovar.isEstruct()) {
                    //comparacion de estructuras
                }
                else {
                    if (tipoex.sonCompatibles(tipovar)) {
                        var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                        if (vari.ref < 0 || vari.ref.toString() == "-0") {
                            vari.ref = vari.ref * -1;
                        }
                        codigo += valorexp.ObtenerCodigo();
                        codigo += "t" + indice + "=P+" + vari.ref + ";\n";
                        codigo += "Stack[t" + indice + "]=t" + valorexp.ObtenerEtiquetas()[0].indice + ";\n";
                        return new Traduccion_1.Traduccion([], codigo);
                    }
                    else {
                        VarGlobal_1.VarGlobal.getInstance().lErrores.push(new Errores_1.Errores(this.linea, this.columna, "Variable incompatible de tipo " + vari.nombre, 3));
                        return null;
                    }
                }
            }
        }
        else {
            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "La variable no existe " + this.id.val, 3));
            return null;
        }
    };
    Asignacion.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'ASIGNACION', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.id.GenerarNodo(indice);
        var json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        cad = this.exp.GenerarNodo(indice);
        json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return Asignacion;
}(Instruccion_1.Instruccion));
exports.Asignacion = Asignacion;
//# sourceMappingURL=Asignacion.js.map