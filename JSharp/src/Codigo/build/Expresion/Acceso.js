"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Traduccion_1 = require("../3D/Traduccion");
var TipoExp_1 = require("./TipoExp");
var AccesoArray_1 = require("./AccesoArray");
var AccesoAtributo_1 = require("./AccesoAtributo");
var AccesoFuncion_1 = require("./AccesoFuncion");
var Errores_1 = require("../Reportes/Errores");
var FuncionesPropias_1 = require("../FuncionesPropias/FuncionesPropias");
var AtributosPropios_1 = require("../FuncionesPropias/AtributosPropios");
var AccesoVariable_1 = require("./AccesoVariable");
var Acceso = /** @class */ (function () {
    function Acceso(accesos, linea, columna) {
        this.accesos = accesos;
        this.linea = linea;
        this.columna = columna;
    }
    Acceso.prototype.TraducirExp = function (e) {
        var codigo = "";
        var traduccion = null;
        var eti = null;
        var tipo;
        for (var i = 0; i < this.accesos.length; i++) {
            if (this.accesos[i] instanceof AccesoArray_1.AccesoArray) {
                var acceso = this.accesos[i];
                if (eti != null) {
                    VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "El arreglo no es de tipo atributo", 3));
                    return null;
                }
                var trad = acceso.TraducirExp(e);
                this.puntero = acceso.apuntador;
                if (trad == null) {
                    return null;
                }
                codigo += trad.ObtenerCodigo();
                eti = trad.ObtenerEtiquetas()[0];
            }
            else if (this.accesos[i] instanceof AccesoAtributo_1.AccesoAtributo) {
                var acceso = this.accesos[i];
                if (this.AtributoPropio(acceso.id.val)) {
                    var atributo = new AtributosPropios_1.AtributosPropios(this.accesos[i], eti, tipo);
                    traduccion = atributo.Generar(e);
                    tipo = atributo.tiposintetizado;
                    if (traduccion == null) {
                        return null;
                    }
                    if (traduccion.ObtenerEtiquetas().length > 0) {
                        eti = traduccion.ObtenerEtiquetas()[0];
                    }
                    else {
                        eti = null;
                    }
                    codigo += traduccion.ObtenerCodigo();
                }
            }
            else if (this.accesos[i] instanceof AccesoVariable_1.AccesoVariable) {
                var acceso = this.accesos[i];
                traduccion = acceso.TraducirExp(e);
                if (traduccion == null) {
                    return null;
                }
                tipo = acceso.GetTipo(e);
                eti = traduccion.ObtenerEtiquetas()[0];
                codigo += traduccion.ObtenerCodigo();
            }
            else if (this.accesos[i] instanceof AccesoFuncion_1.AccesoFuncion) {
                var acceso = this.accesos[i];
                if (this.FuncionesPropias(acceso.idfun.val)) {
                    var funcion = new FuncionesPropias_1.FuncionesPropias(this.accesos[i], eti, tipo);
                    traduccion = funcion.Generar(e);
                    tipo = funcion.tiposintetizado;
                    if (traduccion == null) {
                        return null;
                    }
                    if (traduccion.ObtenerEtiquetas().length > 0) {
                        eti = traduccion.ObtenerEtiquetas()[0];
                    }
                    else {
                        eti = null;
                    }
                    codigo += traduccion.ObtenerCodigo();
                }
                else if (e.existeGlobal("FUNCION_" + acceso.idfun.val)) {
                    //guardar parametros estan en el stack
                    //guardar temporales en el stack
                    //cambio de ambito simulado
                    //llamamos funcion
                    var simobolo = e.getSimbolo("FUNCION_" + acceso.idfun.val);
                    var llamada = this.accesos[i];
                    var funcion = simobolo;
                    var nombrellamada = this.generarNombre(llamada.param, funcion.tipo, llamada.idfun, e);
                    if (llamada.param != null) {
                        //se busca la llave
                        var llam = funcion.obtenerFuncion(nombrellamada);
                        if (llam == null) {
                            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "No se encontro la funcion con parametros " + nombrellamada, 3));
                            return null;
                        }
                        if (eti == null) {
                            //et fun = this.ObtenersinparFun(funcion);
                            llamada.funcionAllamar = funcion;
                            var trad = llamada.TraducirExp(e);
                            if (trad == null) {
                                return null;
                            }
                            codigo += trad.ObtenerCodigo();
                            eti = trad.ObtenerEtiquetas()[0];
                        }
                        else {
                            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "La funcion no es atributo de algo " + acceso.idfun.val, 3));
                            return null;
                        }
                    }
                    else {
                        //la llamada no tiene parametros y tenemos que buscar la que no tiene parametros
                        if (this.existeSinparFun(funcion)) {
                            if (eti == null) {
                                var fun = this.ObtenersinparFun(funcion);
                                llamada.funcionAllamar = fun;
                                var trad = llamada.TraducirExp(e);
                                if (trad == null) {
                                    return null;
                                }
                                codigo += trad.ObtenerCodigo();
                                eti = trad.ObtenerEtiquetas()[0];
                            }
                            else {
                                VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "La funcion no es atributo de algo " + acceso.idfun.val, 3));
                                return null;
                            }
                        }
                        else {
                            VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "No se encontro la funcion sin parametros " + funcion.nombre, 3));
                            return null;
                        }
                    }
                }
                else {
                    VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "No existe la funcion " + acceso.idfun.val, 3));
                    return null;
                }
            }
        }
        return new Traduccion_1.Traduccion([eti], codigo);
    };
    Acceso.prototype.existeSinparFun = function (funcion) {
        var aux = funcion;
        while (aux != null) {
            if (aux.parametros == null) {
                return true;
            }
            aux = aux.siguiente;
        }
        return false;
    };
    Acceso.prototype.ObtenersinparFun = function (funcion) {
        var aux = funcion;
        while (aux != null) {
            if (aux.parametros == null) {
                return aux;
            }
            aux = aux.siguiente;
        }
        return null;
    };
    Acceso.prototype.generarNombre = function (parametros, tipo, id, e) {
        var cad = '';
        if (parametros != null) {
            for (var i = 0; i < parametros.length; i++) {
                var aux = parametros[i];
                if (aux.GetTipo(e).esNumero()) {
                    cad += "NUMERO";
                }
                else if (aux.GetTipo(e).isEstruct()) {
                }
                else {
                    cad += aux.GetTipo(e).toString();
                }
            }
            return "FUNCION_" + tipo.toString() + "_" + id.val + "_" + cad;
        }
        return "FUNCION_" + tipo.toString() + "_" + id.val;
    };
    Acceso.prototype.GetTipo = function (e) {
        var tipo = null;
        for (var i = 0; i < this.accesos.length; i++) {
            if (this.accesos[i] instanceof AccesoArray_1.AccesoArray) {
                tipo = this.accesos[i].GetTipo(e);
            }
            else if (this.accesos[i] instanceof AccesoAtributo_1.AccesoAtributo) {
                var acceso = this.accesos[i];
                if (this.AtributoPropio(acceso.id.val)) {
                    tipo = this.TipoAtributoPropio(acceso.id.val);
                }
            }
            else if (this.accesos[i] instanceof AccesoVariable_1.AccesoVariable) {
                var acceso = this.accesos[i];
                tipo = acceso.GetTipo(e);
            }
            else if (this.accesos[i] instanceof AccesoFuncion_1.AccesoFuncion) {
                var acceso = this.accesos[i];
                if (this.FuncionesPropias(acceso.idfun.val)) {
                    this.tipooculto = tipo;
                    tipo = this.TipoFuncionesPropias(acceso.idfun.val);
                }
                else if (e.existeGlobal("FUNCION_" + acceso.idfun.val)) {
                    var simobolo = e.getSimbolo("FUNCION_" + acceso.idfun.val);
                    tipo = simobolo.tipo;
                }
                else {
                    VarGlobal_1.VarGlobal.getInstance().agregarError(new Errores_1.Errores(this.linea, this.columna, "No se encontro la funcion " + acceso.idfun.val, 3));
                    return null;
                }
            }
        }
        return tipo;
    };
    Acceso.prototype.TipoFuncionesPropias = function (s) {
        switch (s.toLowerCase()) {
            case 'print':
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.VOID, null);
            case 'tochararray':
                var aux = new TipoExp_1.TipoExp(TipoExp_1.Tipo.ARRAY, null);
                aux.tipoarray = TipoExp_1.Tipo.CHAR;
                return aux;
            case 'length':
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.INTEGER, null);
            case 'touppercase':
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.STRING, null);
            case "tolowercase":
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.STRING, null);
            case "charat":
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.CHAR, null);
            case "linealize":
                return this.tipooculto;
        }
    };
    Acceso.prototype.TipoAtributoPropio = function (s) {
        switch (s.toLowerCase()) {
            case 'length':
                return new TipoExp_1.TipoExp(TipoExp_1.Tipo.INTEGER, null);
        }
    };
    Acceso.prototype.FuncionesPropias = function (s) {
        switch (s.toLowerCase()) {
            case 'print':
                return true;
            case "tochararray":
                return true;
            case "length":
                return true;
            case "touppercase":
                return true;
            case "tolowercase":
                return true;
            case "charat":
                return true;
            case "linealize":
                return true;
        }
    };
    Acceso.prototype.AtributoPropio = function (s) {
        switch (s.toLowerCase()) {
            case 'length':
                return true;
        }
    };
    Acceso.prototype.getLinea = function () {
        return this.linea;
    };
    Acceso.prototype.getColumna = function () {
        return this.columna;
    };
    Acceso.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'ACCESO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indice, faveColor: '#6FB1FC', strength: 90 } });
        this.accesos.forEach(function (item) {
            console.log(item);
            var cad = item.GenerarNodo(indice);
            var json = JSON.parse(cad);
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    return Acceso;
}());
exports.Acceso = Acceso;
//# sourceMappingURL=Acceso.js.map