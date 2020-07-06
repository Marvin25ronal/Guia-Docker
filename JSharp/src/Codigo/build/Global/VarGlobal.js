"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Variable_1 = require("../Entorno/Variable");
var Funcion_1 = require("../Entorno/Funcion");
var Regla_1 = require("../3D/Regla");
var Arreglo_1 = require("../Entorno/Arreglo");
var VarGlobal = /** @class */ (function () {
    function VarGlobal() {
        this.contadorGrafo = 0;
        this.contadorTemporales = 3;
        this.contadorSaltos = 0;
        this.lErrores = [];
        this.pilaTemporales = [];
        this.bloqueo = false;
        this.pilaTemporales = [];
    }
    Object.defineProperty(VarGlobal.prototype, "pilaTemporales", {
        get: function () {
            return this._pilaTemporales;
        },
        set: function (value) {
            this._pilaTemporales = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VarGlobal.prototype, "lErrores", {
        get: function () {
            return this._lErrores;
        },
        set: function (value) {
            this._lErrores = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VarGlobal.prototype, "contadorTemporales", {
        get: function () {
            return this._contadorTemporales++;
        },
        set: function (value) {
            this._contadorTemporales = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VarGlobal.prototype, "contadorGrafo", {
        get: function () {
            return this._contadorGrafo++;
        },
        set: function (value) {
            this._contadorGrafo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VarGlobal.prototype, "contadorSaltos", {
        get: function () {
            return this._contadorSaltos++;
        },
        set: function (value) {
            this._contadorSaltos = value;
        },
        enumerable: true,
        configurable: true
    });
    VarGlobal.prototype.limpiar = function () {
        this._lErrores = [];
        this._contadorTemporales = 3;
        this._contadorSaltos = 0;
        this.pilaEntornos = [];
    };
    VarGlobal.getInstance = function () {
        if (!VarGlobal.instance) {
            VarGlobal.instance = new VarGlobal();
        }
        return VarGlobal.instance;
    };
    VarGlobal.prototype.agregarError = function (err) {
        this._lErrores.push(err);
    };
    VarGlobal.prototype.GrabarCadena = function (cadena) {
        var res = "";
        var arreglo = cadena.split('');
        console.log(cadena);
        var indice = VarGlobal.getInstance().contadorTemporales;
        res = "t" + indice + "=H;\n";
        for (var i = 0; i < arreglo.length; i++) {
            res += "Heap[H]=" + arreglo[i].charCodeAt(0) + ";\n";
            res += "H=H+1;\n";
        }
        res += "Heap[H]=-1;\n";
        res += "H=H+1;\n";
        return JSON.stringify({ codigo: res, indice: indice, etiqueta: "t" + indice });
    };
    VarGlobal.prototype.ObtenerCreacionTemporales = function () {
        var codigo = "var ";
        for (var i = 0; i < this._contadorTemporales; i++) {
            codigo += "t" + i + ",";
        }
        return codigo.substring(0, codigo.length - 1) + ";\n";
    };
    VarGlobal.prototype.Apilar = function (i) {
        if (this.bloqueo) {
            return;
        }
        if (this._pilaTemporales.includes(i)) {
            var indice = this.pilaTemporales.indexOf(i);
            this.pilaTemporales.splice(indice, 1);
            return;
        }
        this.pilaTemporales.push(i);
    };
    VarGlobal.prototype.CrearTabla = function () {
        var tabla = [];
        for (var i = 0; i < this.pilaEntornos.length; i++) {
            var e = this.pilaEntornos[i];
            e.tabla.forEach(function (value, key) {
                if (value instanceof Variable_1.Variable) {
                    tabla.push({ id: key, nombre: value.nombre, tipo: value.tipo, ambito: value.ambito, linea: value.linea, columna: value.columna, tam: 0, par: null });
                }
                else if (value instanceof Funcion_1.Funcion) {
                    var valu = value;
                    while (valu != null) {
                        tabla.push({ id: key, nombre: valu.nombre, tipo: valu.tipo, ambito: valu.ambito, linea: valu.linea, columna: valu.columna, tam: 0, par: valu.parametros });
                        valu = valu.siguiente;
                    }
                }
                else if (value instanceof Arreglo_1.Arreglo) {
                    tabla.push({ id: key, nombre: value.nombre, tipo: value.tipo, ambito: value.ambito, linea: value.linea, columna: value.columna, tam: value.ref });
                }
            });
        }
        return tabla;
    };
    VarGlobal.prototype.AgregarRegla = function (regla, linea, columna, eliminado) {
        this.pilareglas.push(new Regla_1.Regla(regla, linea, columna, eliminado));
    };
    return VarGlobal;
}());
exports.VarGlobal = VarGlobal;
//# sourceMappingURL=VarGlobal.js.map