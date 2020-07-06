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
var Expresion_1 = require("./Expresion");
var VarGlobal_1 = require("../Global/VarGlobal");
var Traduccion_1 = require("../3D/Traduccion");
var Etiqueta_1 = require("../3D/Etiqueta");
var TraduccionLogica_1 = require("../3D/TraduccionLogica");
var Literal = /** @class */ (function (_super) {
    __extends(Literal, _super);
    function Literal(valor, tipo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        _this.tipo = tipo;
        return _this;
    }
    Literal.prototype.GetTipo = function (e) {
        return this.tipo;
    };
    Literal.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: this.tipo.toString() + "{" + this.valor.toString() + "}", weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    Literal.prototype.TraducirExp = function (e) {
        if (this.tipo.esCadena()) {
            if (this.tipo.isString()) {
                var codigo = "";
                var json = JSON.parse(VarGlobal_1.VarGlobal.getInstance().GrabarCadena(this.valor.toString()));
                codigo += json.codigo;
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + json.indice, json.indice)], codigo);
            }
            else {
                var codigo = "";
                var json = JSON.parse(VarGlobal_1.VarGlobal.getInstance().GrabarCadena(this.valor.toString()));
                codigo += json.codigo;
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + json.indice, json.indice)], codigo);
            }
        }
        else {
            if (this.islogical == true) {
                //parte retornamos con un if
                var LV = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                var LF = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                if (this.valor.toString() == "true") {
                    var codigo = "if(1==1)goto L" + LV + ";\n";
                    return new TraduccionLogica_1.TraduccionLogica([new Etiqueta_1.Etiqueta("L" + LV + ":\n", LV)], [new Etiqueta_1.Etiqueta("L" + LF + ":\n", LF)], codigo, null, null, "");
                }
                else {
                    var codigo = "if(1==0)goto L" + LV + ";\n";
                    return new TraduccionLogica_1.TraduccionLogica([new Etiqueta_1.Etiqueta("L" + LV + ":\n", LV)], [new Etiqueta_1.Etiqueta("L" + LF + ":\n", LF)], codigo, null, null, "");
                }
            }
            if (this.tipo.isBoolean()) {
                if (this.isControle) {
                    var indicet_1 = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                    var indiceV = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                    var indiceF = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                    var Lsalida = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
                    if (this.valor.toString() == "true") {
                        var codigo = "if(1==1) goto L" + indiceV + ";\ngoto L" + indiceF + ";\nL" + indiceV + ":\nt" + indicet_1.toString() + "=1;\ngoto L" + Lsalida + ";\nL" + indiceF + ":\nt" + indicet_1.toString() + "=0;\nL" + Lsalida + ":\n";
                        return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indicet_1, indicet_1)], codigo);
                    }
                    else {
                        var codigo = "if(1==0) goto L" + indiceV + ";\ngoto L" + indiceF + ";\nL" + indiceV + ":\nt" + indicet_1.toString() + "=1;\ngoto L" + Lsalida + ";\nL" + indiceF + ":\nt" + indicet_1.toString() + "=0;\nL" + Lsalida + ":\n";
                        return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indicet_1, indicet_1)], codigo);
                    }
                }
                var indicet = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                if (this.valor.toString() == "true") {
                    var codigo = "t" + indicet.toString() + "=1;\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(indicet);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indicet, indicet)], codigo);
                }
                else {
                    var codigo = "t" + indicet.toString() + "=0;\n";
                    VarGlobal_1.VarGlobal.getInstance().Apilar(indicet);
                    return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indicet, indicet)], codigo);
                }
            }
            else {
                var indicet = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                VarGlobal_1.VarGlobal.getInstance().Apilar(indicet);
                return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indicet, indicet)], "t" + indicet + "=" + this.valor.toString() + ";\n");
            }
        }
        return null;
    };
    return Literal;
}(Expresion_1.Expresion));
exports.Literal = Literal;
//# sourceMappingURL=Literal.js.map