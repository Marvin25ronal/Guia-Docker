"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Expresion_1 = require("../Expresion/Expresion");
var VarGlobal_1 = require("../Global/VarGlobal");
var Errores_1 = require("../Reportes/Errores");
var Entorno_1 = require("../Entorno/Entorno");
var Etiqueta_1 = require("../3D/Etiqueta");
var Declaracion_1 = require("../Instruccion/Declaracion");
var Traduccion_1 = require("../3D/Traduccion");
var Acceso_1 = require("../Expresion/Acceso");
var Return_1 = require("../Expresion/Return");
var While = /** @class */ (function () {
    function While(con, inst, linea, columna) {
        this.condicion = con;
        this.instrucciones = inst;
        this.linea = linea;
        this.columna = columna;
    }
    While.prototype.TraducirInstruccion = function (e) {
        var nuevoE = new Entorno_1.Entorno(e, Entorno_1.TipoEntorno.CICLO);
        var indiceSalida = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
        var etisal = new Etiqueta_1.Etiqueta("L" + indiceSalida + ":\n", indiceSalida);
        var indiceContinue = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
        var eticontinue = new Etiqueta_1.Etiqueta("L" + indiceContinue + ":\n", indiceContinue);
        nuevoE.etiquetaSalida = etisal;
        nuevoE.etiquetaContinue = eticontinue;
        var tipocon = this.condicion.GetTipo(nuevoE);
        if (tipocon.isBoolean()) {
            this.condicion.isControle = true;
            var exp = this.condicion.TraducirExp(nuevoE);
            if (exp == null) {
                return null;
            }
            var parteVerdadera = "";
            var partefalsa = "goto L" + indiceSalida + ";\n";
            //parteVerdadera += `L${eticontinue}:\n`;
            if (this.instrucciones != null) {
                if (this.instrucciones != null) {
                    for (var i = 0; i < this.instrucciones.length; i++) {
                        var aux = this.instrucciones[i];
                        if (aux instanceof Declaracion_1.Declaracion) {
                            var traddec = aux.DeclararFuncion(nuevoE);
                            if (traddec == null) {
                                continue;
                            }
                            parteVerdadera += traddec.ObtenerCodigo();
                        }
                        else if (aux instanceof Expresion_1.Expresion) {
                            var traduce = aux.TraducirExp(nuevoE);
                            if (traduce == null) {
                                continue;
                            }
                            parteVerdadera += traduce.ObtenerCodigo();
                        }
                        else if (aux instanceof Acceso_1.Acceso) {
                            var trad = aux.TraducirExp(nuevoE);
                            if (trad == null) {
                                continue;
                            }
                            parteVerdadera += trad.ObtenerCodigo();
                        }
                        else if (aux instanceof Return_1.Return) {
                            var trad = aux.TraducirExp(e);
                            if (trad == null) {
                                continue;
                            }
                            parteVerdadera += trad.ObtenerCodigo();
                        }
                        else if (aux) {
                            var trad = aux.TraducirInstruccion(nuevoE);
                            if (trad == null) {
                                continue;
                            }
                            parteVerdadera += trad.ObtenerCodigo();
                        }
                    }
                    parteVerdadera += "goto L" + eticontinue.indice + ";\n";
                    var cansuperior = exp.ObtenerCodigo().replace("t" + exp.ObtenerEtiquetas()[0].indice + "=1;", "" + parteVerdadera);
                    cansuperior = "L" + indiceContinue + ":\n" + cansuperior;
                    var caninferior = cansuperior.replace("t" + exp.ObtenerEtiquetas()[0].indice + "=0;", "" + partefalsa);
                    caninferior += "L" + etisal.indice + ":\n";
                    console.log(VarGlobal_1.VarGlobal.getInstance().pilaTemporales);
                    return new Traduccion_1.Traduccion([], caninferior);
                }
            }
        }
        else {
            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "La condicion del while tiene que ser de tipo booleana", 3));
            return null;
        }
    };
    While.prototype.getLinea = function () {
        return this.linea;
    };
    While.prototype.getColumna = function () {
        return this.columna;
    };
    While.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'CONTROL_WHILE', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.condicion.GenerarNodo(indice);
        var json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        if (this.instrucciones != null) {
            var indicec = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
            codigo.push({ data: { id: "" + indicec, name: 'CUERPO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
            enlace.push({ data: { source: "" + indice, target: "" + indicec, faveColor: '#6FB1FC', strength: 90 } });
            for (var i = 0; i < this.instrucciones.length; i++) {
                cad = this.instrucciones[i].GenerarNodo(indicec);
                json = JSON.parse(cad.toString());
                codigo = codigo.concat(json.nodo);
                enlace = enlace.concat(json.enlace);
            }
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return While;
}());
exports.While = While;
//# sourceMappingURL=While.js.map