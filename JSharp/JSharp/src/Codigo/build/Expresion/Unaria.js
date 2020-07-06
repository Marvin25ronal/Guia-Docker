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
var Operacion_1 = require("../Operaciones/Operacion");
var VarGlobal_1 = require("../Global/VarGlobal");
var Traduccion_1 = require("../3D/Traduccion");
var Signo_1 = require("../Operaciones/Signo");
var Errores_1 = require("../Reportes/Errores");
var Etiqueta_1 = require("../3D/Etiqueta");
var TraduccionLogica_1 = require("../3D/TraduccionLogica");
var Unaria = /** @class */ (function (_super) {
    __extends(Unaria, _super);
    function Unaria(op1, s, linea, columna) {
        return _super.call(this, op1, null, s, linea, columna) || this;
    }
    Unaria.prototype.GetTipo = function (e) {
        return this.op1.GetTipo(e);
    };
    Unaria.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        var indicesigno = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'EXP', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        codigo.push({ data: { id: "" + indicesigno, name: "" + this.ObtenerSignoString(), weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + indice, target: "" + indicesigno, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.op1.GenerarNodo(indice);
        var json = JSON.parse(cad);
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    Unaria.prototype.TraducirExp = function (e) {
        var tipoA = this.op1.GetTipo(e);
        if (tipoA == null) {
            return null;
        }
        if (this.op == Signo_1.Signo.RESTA) {
            var traducA = this.op1.TraducirExp(e);
            if (traducA == null) {
                return null;
            }
            var codigo = "";
            if (tipoA.esNumero()) {
                codigo += traducA.ObtenerCodigo();
                var etiqueta = traducA.ObtenerEtiquetas();
                var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                codigo += "t" + indice + "=t" + etiqueta[0].indice + "*-1;\n";
                VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "No se puede hacer negativo ese tipo ", 3));
                return null;
            }
        }
        else if (this.op == Signo_1.Signo.NOT) {
            if (tipoA.isBoolean()) {
                if (this.islogical) {
                    this.op1.islogical = true;
                    var traducA = this.op1.TraducirExp(e);
                    var TA = traducA;
                    var encabezado = "";
                    var codigo = "";
                    encabezado += TA.encabezado;
                    //encabezado += B.encabezado;
                    codigo += TA.partesuperior;
                    //codigo += `goto L${TA.etiquetasFalsas[0].indice};\n`;
                    //codigo += TA.etiquetasVerdaderas[0].etiqueta;
                    //codigo += B.partesuperior;
                    //codigo += `goto L${B.etiquetasFalsas[0].indice};\n`;
                    var etiquetasver = [];
                    //TA.etiquetasVerdaderas.shift();
                    etiquetasver = TA.etiquetasFalsas;
                    var etiquetasfal = [];
                    etiquetasfal = TA.etiquetasVerdaderas;
                    return new TraduccionLogica_1.TraduccionLogica(etiquetasver, etiquetasfal, codigo, null, null, encabezado);
                }
                else {
                    this.op1.islogical = true;
                    var traducA = this.op1.TraducirExp(e);
                    var TA = traducA;
                    var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var etiSa = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                    var codigo = "";
                    codigo += TA.encabezado;
                    codigo += TA.partesuperior;
                    codigo += "goto L" + TA.etiquetasFalsas[0].indice + ";\n";
                    for (var i = 0; i < TA.etiquetasVerdaderas.length; i++) {
                        codigo += TA.etiquetasVerdaderas[i].etiqueta;
                    }
                    codigo += "t" + indice + "=0;\ngoto L" + etiSa + ";\n";
                    for (var i = 0; i < TA.etiquetasFalsas.length; i++) {
                        codigo += TA.etiquetasFalsas[i].etiqueta;
                    }
                    codigo += "t" + indice + "=1;\nL" + etiSa + ":\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(indice);
                    if (traducA.ObtenerEtiquetas() != null) {
                        VarGlobal_1.VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    }
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indice, indice)], codigo);
                }
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "No se puede hacer not a ese tipo ", 3));
                return null;
            }
        }
        return null;
    };
    return Unaria;
}(Operacion_1.Operacion));
exports.Unaria = Unaria;
//# sourceMappingURL=Unaria.js.map