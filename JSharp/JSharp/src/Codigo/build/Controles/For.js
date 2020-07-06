"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Expresion_1 = require("../Expresion/Expresion");
var VarGlobal_1 = require("../Global/VarGlobal");
var Entorno_1 = require("../Entorno/Entorno");
var Declaracion_1 = require("../Instruccion/Declaracion");
var Traduccion_1 = require("../3D/Traduccion");
var Acceso_1 = require("../Expresion/Acceso");
var Etiqueta_1 = require("../3D/Etiqueta");
var Return_1 = require("../Expresion/Return");
var For = /** @class */ (function () {
    function For(inici, condi, fin, instr, lin, col) {
        this.inicio = inici;
        this.condicion = condi;
        this.final = fin;
        this.linea = lin;
        this.columna = col;
        this.instrucciones = instr;
    }
    For.prototype.TraducirInstruccion = function (e) {
        var nuevoE = new Entorno_1.Entorno(e, Entorno_1.TipoEntorno.CICLO);
        var indiceloop = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
        var indiceSalida = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
        var indiceIncremento = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
        var etisal = new Etiqueta_1.Etiqueta("L" + indiceSalida + ":\n", indiceSalida);
        var etiloop = new Etiqueta_1.Etiqueta("L" + indiceIncremento + ":\n", indiceIncremento);
        nuevoE.etiquetaSalida = etisal;
        nuevoE.etiquetaContinue = etiloop;
        var codigo = document.createTextNode('');
        if (this.inicio != null) {
            if (this.inicio instanceof Declaracion_1.Declaracion) {
                var resasig = this.inicio.DeclararFuncion(nuevoE);
                if (resasig == null) {
                    return null;
                }
                codigo.appendData(resasig.ObtenerCodigo().toString());
            }
            else {
                var resasig = this.inicio.TraducirInstruccion(nuevoE);
                if (resasig == null) {
                    return null;
                }
                codigo.appendData(resasig.ObtenerCodigo().toString());
            }
        }
        codigo.appendData("L" + indiceloop + ":\n");
        if (this.condicion != null) {
            this.condicion.isControle = true;
            var trad = this.condicion.TraducirExp(nuevoE);
            if (trad == null) {
                return null;
            }
            var condicional = trad.ObtenerCodigo();
            var parteVerdadera = "";
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
                        var trad_1 = aux.TraducirExp(nuevoE);
                        if (trad_1 == null) {
                            continue;
                        }
                        parteVerdadera += trad_1.ObtenerCodigo();
                    }
                    else if (aux instanceof Return_1.Return) {
                        var trad_2 = aux.TraducirExp(e);
                        if (trad_2 == null) {
                            continue;
                        }
                        parteVerdadera += trad_2.ObtenerCodigo();
                    }
                    else if (aux) {
                        var trad_3 = aux.TraducirInstruccion(nuevoE);
                        if (trad_3 == null) {
                            continue;
                        }
                        parteVerdadera += trad_3.ObtenerCodigo();
                    }
                }
            }
            parteVerdadera += "goto L" + indiceIncremento + ";\n";
            condicional = condicional.replace("t" + trad.ObtenerEtiquetas()[0].indice + "=1;", "" + parteVerdadera);
            condicional = condicional.replace("t" + trad.ObtenerEtiquetas()[0].indice + "=0;", "goto L" + indiceSalida + ";\n");
            codigo.appendData(condicional.toString());
        }
        else {
            if (this.instrucciones != null) {
                var parteVerdadera = "";
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
                    else if (aux) {
                        var trad = aux.TraducirInstruccion(nuevoE);
                        if (trad == null) {
                            continue;
                        }
                        parteVerdadera += trad.ObtenerCodigo();
                    }
                }
                codigo.appendData(parteVerdadera);
            }
        }
        codigo.appendData("L" + indiceIncremento + ":\n");
        if (this.final != null) {
            var res = this.final.TraducirInstruccion(nuevoE);
            if (res == null) {
                return null;
            }
            codigo.appendData(res.ObtenerCodigo().toString());
        }
        codigo.appendData("goto L" + indiceloop + ";\n");
        codigo.appendData("L" + indiceSalida + ":\n");
        return new Traduccion_1.Traduccion([], codigo.textContent);
    };
    For.prototype.getLinea = function () {
        return this.linea;
    };
    For.prototype.getColumna = function () {
        return this.columna;
    };
    For.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'CONTROL_FOR', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = '';
        var json = null;
        if (this.inicio != null) {
            cad = this.inicio.GenerarNodo(indice);
            var json_1 = JSON.parse(cad.toString());
            codigo = codigo.concat(json_1.nodo);
            enlace = enlace.concat(json_1.enlace);
        }
        if (this.condicion != null) {
            cad = this.condicion.GenerarNodo(indice);
            json = JSON.parse(cad.toString());
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        }
        if (this.final != null) {
            cad = this.final.GenerarNodo(indice);
            json = JSON.parse(cad.toString());
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        }
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
    return For;
}());
exports.For = For;
//# sourceMappingURL=For.js.map