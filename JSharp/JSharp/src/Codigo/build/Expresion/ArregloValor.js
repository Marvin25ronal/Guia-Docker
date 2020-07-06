"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var TipoExp_1 = require("./TipoExp");
var TipoExp_2 = require("./TipoExp");
var Errores_1 = require("../Reportes/Errores");
var Traduccion_1 = require("../3D/Traduccion");
var Etiqueta_1 = require("../3D/Etiqueta");
var ArregloValor = /** @class */ (function () {
    function ArregloValor(valores, linea, columna) {
        this.valores = valores;
        this.linea = linea;
        this.columna = columna;
    }
    ArregloValor.prototype.TraducirExp = function (e) {
        var tam = this.valores.length;
        var codigo = document.createTextNode("");
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
        var indicearreglo = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
        var inicioarreglo = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
        var iterador = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
        codigo.appendData("t" + indice + "=" + tam + ";\n");
        codigo.appendData("t0=t" + indice + ";\n");
        codigo.appendData("call marvin_201602520_crearArray;\n");
        codigo.appendData("t" + indicearreglo + "=t0;\n");
        codigo.appendData("t" + inicioarreglo + "=t" + indicearreglo + "+1;\n");
        codigo.appendData("t" + iterador + "=t" + inicioarreglo + ";\n");
        for (var i = 0; i < tam; i++) {
            var valor = this.valores[i].TraducirExp(e);
            if (valor == null) {
                return null;
            }
            VarGlobal_1.VarGlobal.getInstance().Apilar(valor.ObtenerEtiquetas()[0].indice);
            codigo.appendData(valor.ObtenerCodigo().toString());
            codigo.appendData("Heap[t" + iterador + "]=t" + valor.ObtenerEtiquetas()[0].indice + ";\n");
            codigo.appendData("t" + iterador + "=t" + iterador + "+1;\n");
        }
        return new Traduccion_1.Traduccion([new Etiqueta_1.Etiqueta("t" + indicearreglo, indicearreglo)], codigo.textContent);
    };
    ArregloValor.prototype.GetTipo = function (e) {
        var tipo = new TipoExp_2.TipoExp(TipoExp_1.Tipo.ARRAY, null);
        if (this.valores != null) {
            var tipoaux = null;
            for (var i = 0; i < this.valores.length; i++) {
                var tipoexp = this.valores[i].GetTipo(e);
                if (tipoexp == null) {
                    return null;
                }
                if (tipoaux == null) {
                    tipoaux = tipoexp;
                }
                else {
                    if (tipoexp.sonCompatibles(tipoaux)) {
                        tipoaux = tipoexp;
                    }
                    else {
                        VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "Los datos no son del mismo tipo", 3));
                        return null;
                    }
                }
            }
            tipo.tipoarray = tipoaux;
            return tipo;
        }
        tipo.tipoarray = TipoExp_1.Tipo.INTEGER;
        return null;
    };
    ArregloValor.prototype.getLinea = function () {
        return this.linea;
    };
    ArregloValor.prototype.getColumna = function () {
        return this.columna;
    };
    ArregloValor.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'ARRAY', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        this.valores.forEach(function (item) {
            console.log(item);
            var cad = item.GenerarNodo(indice);
            var json = JSON.parse(cad);
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return ArregloValor;
}());
exports.ArregloValor = ArregloValor;
//# sourceMappingURL=ArregloValor.js.map