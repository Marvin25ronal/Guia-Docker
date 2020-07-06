"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Traduccion_1 = require("../3D/Traduccion");
var Errores_1 = require("../Reportes/Errores");
var Etiqueta_1 = require("../3D/Etiqueta");
var Acceso_1 = require("./Acceso");
var AccesoFuncion = /** @class */ (function () {
    function AccesoFuncion(id, par, linea, columna) {
        this.idfun = id;
        this.param = par;
        this.linea = linea;
        this.columna = columna;
    }
    AccesoFuncion.prototype.TraducirExp = function (e) {
        //  debugger;
        var codigo = document.createTextNode('');
        //guardar temporales en stack
        //debugger;
        VarGlobal_1.VarGlobal.getInstance().pilaTemporales.sort();
        //guardamos el contador de los temporales
        var contadortemp = e.correlativovar;
        var contadoraux = e.GetPosicionStackVar();
        //guardar los parametros
        VarGlobal_1.VarGlobal.getInstance().bloqueo = true;
        for (var i = 0; i < VarGlobal_1.VarGlobal.getInstance().pilaTemporales.length; i++) {
            var indicet = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
            //let indice = e.GetPosicionStackVar();
            //debugger;
            e.getPos();
            codigo.appendData("t" + indicet + "=P+" + contadoraux + ";\n");
            codigo.appendData("Stack[t" + indicet + "]=t" + VarGlobal_1.VarGlobal.getInstance().pilaTemporales[i] + ";\n");
            contadoraux++;
            //array.push(indicet);
            //VarGlobal.getInstance().Apilar(indicet);
        }
        //e.correlativovar = contadoraux-1;
        //cambio de ambito simulado y grabar variables
        if (this.param != null) {
            //paso de parametros
            //creacion de parametros
            //  codigo.appendData('paso\n')
            var aux = VarGlobal_1.VarGlobal.getInstance().pilaTemporales;
            VarGlobal_1.VarGlobal.getInstance().pilaTemporales = [];
            if (this.parametrosCorrectos(e)) {
                //codigo.appendData(`grabarparam\n`)
                var indice = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
                var contaux = e.correlativovar;
                //  let numeroentorno = e.correlativovar;
                // console.log(VarGlobal.getInstance().pilaTemporales);
                //codigo.appendData(`Iniio paso`)
                var contadorEntorno = e.correlativovar;
                for (var i = 0; i < this.param.length; i++) {
                    var par = this.param[i];
                    if (par instanceof Acceso_1.Acceso) {
                        // debugger;
                        e.correlativovar += i;
                    }
                    var trad = par.TraducirExp(e);
                    if (trad == null) {
                        return null;
                    }
                    codigo.appendData(trad.ObtenerCodigo().toString());
                    codigo.appendData("t" + indice + "=P+" + (e.GetPosicionStackVar() + 2) + ";\n");
                    e.getPos();
                    codigo.appendData("Stack[t" + indice + "]=t" + trad.ObtenerEtiquetas()[0].indice + ";\n");
                    //console.log(VarGlobal.getInstance().pilaTemporales);
                    VarGlobal_1.VarGlobal.getInstance().Apilar(trad.ObtenerEtiquetas()[0].indice);
                    if (par instanceof Acceso_1.Acceso) {
                        e.correlativovar -= i;
                    }
                    //console.log(VarGlobal.getInstance().pilaTemporales);
                }
                //codigo.appendData(`termino paso`)
                console.log(VarGlobal_1.VarGlobal.getInstance().pilaTemporales);
                // codigo.appendData(`terminoparam\n`)
                VarGlobal_1.VarGlobal.getInstance().pilaTemporales = aux;
                e.correlativovar = contaux;
            }
            else {
                VarGlobal_1.VarGlobal.getInstance().bloqueo = false;
                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "Error en los parametros de la funcion " + this.idfun.val, 3));
                return null;
            }
        }
        //cambio de ambito
        var siguientepos = e.GetPosicionStackVar();
        codigo.appendData("P=P+" + siguientepos + ";\n");
        codigo.appendData("call " + this.funcionAllamar.nombre + ";\n");
        //regresar todos los valores 
        var eti = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
        codigo.appendData("t" + eti + "=P+1;\n");
        var ret = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
        codigo.appendData("t" + ret + "=Stack[t" + eti + "];\n");
        var etiret = new Etiqueta_1.Etiqueta("t" + ret, ret);
        codigo.appendData("P=P-" + siguientepos + ";\n");
        e.correlativovar = contadortemp;
        contadoraux = e.GetPosicionStackVar();
        //console.log(VarGlobal.getInstance().pilaTemporales);
        for (var i = 0; i < VarGlobal_1.VarGlobal.getInstance().pilaTemporales.length; i++) {
            var indicet = VarGlobal_1.VarGlobal.getInstance().contadorTemporales;
            codigo.appendData("t" + indicet + "=P+" + contadoraux + ";\n");
            codigo.appendData("t" + VarGlobal_1.VarGlobal.getInstance().pilaTemporales[i] + "=Stack[t" + indicet + "];\n");
            e.getPos();
            contadoraux++;
        }
        e.correlativovar = contadortemp;
        VarGlobal_1.VarGlobal.getInstance().bloqueo = false;
        return new Traduccion_1.Traduccion([etiret], codigo.textContent);
    };
    AccesoFuncion.prototype.parametrosCorrectos = function (e) {
        var parfun = this.funcionAllamar.parametros;
        var parametrosmetiendo = this.param;
        if (parfun == null) {
            return false;
        }
        if (parfun.length == parametrosmetiendo.length) {
            for (var i = 0; i < parfun.length; i++) {
                var item1fun = parfun[i];
                var itempar = parametrosmetiendo[i];
                if (itempar.GetTipo(e).sonCompatibles(item1fun.tipo)) {
                    continue;
                }
                else {
                    VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "No se puede meter ese tipo en " + itempar.GetTipo(e).toString() + " en " + item1fun.tipo.toString() + " funcion " + this.idfun.val, 3));
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    AccesoFuncion.prototype.GetTipo = function (e) {
        throw new Error("Method not implemented.");
    };
    AccesoFuncion.prototype.getLinea = function () {
        return this.linea;
    };
    AccesoFuncion.prototype.getColumna = function () {
        return this.columna;
    };
    AccesoFuncion.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'ACCESOFUNCION', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        var cad = this.idfun.GenerarNodo(indice);
        var json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        if (this.param != null) {
            var indicepar_1 = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
            codigo.push({ data: { id: "" + indicepar_1, name: 'PARAMETROS', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
            enlace.push({ data: { source: "" + indice, target: "" + indicepar_1, faveColor: '#6FB1FC', strength: 90 } });
            this.param.forEach(function (item) {
                var cad = item.GenerarNodo(indicepar_1);
                var json = JSON.parse(cad);
                codigo = codigo.concat(json.nodo);
                enlace = enlace.concat(json.enlace);
            });
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return AccesoFuncion;
}());
exports.AccesoFuncion = AccesoFuncion;
//# sourceMappingURL=AccesoFuncion.js.map