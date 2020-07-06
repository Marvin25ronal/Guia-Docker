"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Expresion_1 = require("../Expresion/Expresion");
var Traduccion_1 = require("../3D/Traduccion");
var VarGlobal_1 = require("../Global/VarGlobal");
var Entorno_1 = require("../Entorno/Entorno");
var Etiqueta_1 = require("../3D/Etiqueta");
var Errores_1 = require("../Reportes/Errores");
var Declaracion_1 = require("../Instruccion/Declaracion");
var Acceso_1 = require("../Expresion/Acceso");
var Else_1 = require("./Else");
var ElseIF_1 = require("./ElseIF");
var Return_1 = require("../Expresion/Return");
var ControlIF = /** @class */ (function () {
    function ControlIF(condicion, instrucciones, lifs, lines, columna) {
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.Lifs = lifs;
        this.linea = lines;
        this.columna = columna;
    }
    ControlIF.prototype.TraducirInstruccion = function (e) {
        var nuevoE = new Entorno_1.Entorno(e, Entorno_1.TipoEntorno.IF);
        var indiceSalida = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
        var etisal = new Etiqueta_1.Etiqueta("L" + indiceSalida + ":\n", indiceSalida);
        nuevoE.etiquetaSalida = etisal;
        var tipocon = this.condicion.GetTipo(nuevoE);
        if (tipocon.isBoolean()) {
            this.condicion.isControle = true;
            var exp = this.condicion.TraducirExp(nuevoE);
            if (exp == null) {
                return null;
            }
            var parteVerdadera = "";
            var partefalsa = "";
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
                }
            }
            parteVerdadera += "goto L" + etisal.indice + ";\n";
            // console.log(this.Lifs);
            if (this.Lifs != null) {
                for (var i = 0; i < this.Lifs.length; i++) {
                    var aux = this.Lifs[i];
                    if (aux instanceof Else_1.Else) {
                        aux.etiquetaif = etisal;
                    }
                    if (aux instanceof ElseIF_1.ElseIF) {
                        aux.salidaif = etisal;
                    }
                    var nuevoE_1 = new Entorno_1.Entorno(e, Entorno_1.TipoEntorno.IF);
                    var trad = aux.TraducirInstruccion(nuevoE_1);
                    partefalsa += trad.ObtenerCodigo();
                }
            }
            //partefalsa += `L${etisal.indice}:\n`;
            var cansuperior = exp.ObtenerCodigo().replace("t" + exp.ObtenerEtiquetas()[0].indice + "=1;", "" + parteVerdadera);
            var caninferior = cansuperior.replace("t" + exp.ObtenerEtiquetas()[0].indice + "=0;", "" + partefalsa);
            caninferior += "L" + etisal.indice + ":\n";
            return new Traduccion_1.Traduccion([], caninferior);
        }
        else {
            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "La condicion del if no es de tipo booleana", 3));
            return null;
        }
        return null;
    };
    ControlIF.prototype.getLinea = function () {
        return this.linea;
    };
    ControlIF.prototype.getColumna = function () {
        throw new Error("Method not implemented.");
    };
    ControlIF.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'CONTROL_IF', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
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
        if (this.Lifs != null) {
            var indicelif = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
            codigo.push({ data: { id: "" + indicelif, name: 'LIFS', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
            enlace.push({ data: { source: "" + indice, target: "" + indicelif, faveColor: '#6FB1FC', strength: 90 } });
            for (var i = 0; i < this.Lifs.length; i++) {
                cad = this.Lifs[i].GenerarNodo(indicelif);
                json = JSON.parse(cad.toString());
                codigo = codigo.concat(json.nodo);
                enlace = enlace.concat(json.enlace);
            }
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return ControlIF;
}());
exports.ControlIF = ControlIF;
//# sourceMappingURL=ControlIF.js.map