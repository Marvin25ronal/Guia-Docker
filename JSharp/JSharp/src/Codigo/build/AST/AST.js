"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Entorno_1 = require("../Entorno/Entorno");
var Declaracion_1 = require("../Instruccion/Declaracion");
var MetodosPropios_1 = require("./MetodosPropios");
var DecFuncion_1 = require("../Instruccion/DecFuncion");
var Funcion_1 = require("../Entorno/Funcion");
var AST = /** @class */ (function () {
    function AST(acciones) {
        this.acciones = acciones;
    }
    Object.defineProperty(AST.prototype, "acciones", {
        get: function () {
            return this._acciones;
        },
        set: function (value) {
            this._acciones = value;
        },
        enumerable: true,
        configurable: true
    });
    AST.prototype.Ejecutar = function (e) {
        VarGlobal_1.VarGlobal.getInstance().limpiar();
        var enuevo = new Entorno_1.Entorno(null, Entorno_1.TipoEntorno.GLOBAL);
        //iniciamos todo
        var codigo = "var Stack[];\nvar Heap[];\nvar P=0;\nvar H=0;\nvar E=0;\n";
        var etiqueta1 = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
        //importaciones
        //Declarar variables globales
        codigo += this.DeclararGlobales(enuevo);
        codigo += "goto L" + etiqueta1 + ";\n";
        codigo += this.DefinirMetodosPropios();
        this.DeclararMetodos(enuevo);
        codigo += this.CodigoMetodos(enuevo);
        //Reservar espacio
        codigo += this.ReservarEspacio(enuevo);
        codigo += "L" + etiqueta1 + ":\n";
        codigo += this.MetodoBegin();
        //crear todos los temporales
        codigo = VarGlobal_1.VarGlobal.getInstance().ObtenerCreacionTemporales() + codigo;
        return JSON.stringify({ code: codigo, error: VarGlobal_1.VarGlobal.getInstance().lErrores });
    };
    AST.prototype.DeclararMetodos = function (e) {
        //let codigo = "";
        for (var i = 0; i < this.acciones.length; i++) {
            if (this.acciones[i] instanceof DecFuncion_1.DecFuncion) {
                var fun = this.acciones[i];
                //let trad = fun.TraducirInstruccion(e);
                var declara = fun.CrearFuncion(e);
                if (declara == false) {
                    continue;
                }
                //.ObtenerCodigo();
                //VarGlobal.getInstance().pilaTemporales = [];
            }
        }
        //return codigo;
    };
    AST.prototype.CodigoMetodos = function (e) {
        var codigo = '';
        var tabla = e.tabla;
        tabla.forEach(function (value, key) {
            if (value instanceof Funcion_1.Funcion) {
                var fun = value;
                var traduc = fun.cuerpoparatraducir.TraducirInstruccion(e);
                if (traduc == null) {
                    return;
                }
                codigo += traduc.ObtenerCodigo();
                VarGlobal_1.VarGlobal.getInstance().pilaTemporales = [];
            }
        });
        return codigo;
    };
    AST.prototype.MetodoBegin = function () {
        var codigo = "";
        // codigo = `P=P+2;\n`;
        codigo += "call FUNCION_VOID_principal;\n";
        //codigo += `P=P-2;\n`
        return codigo;
    };
    AST.prototype.ReservarEspacio = function (e) {
        var codigo = "";
        return codigo;
    };
    AST.prototype.DeclararGlobales = function (e) {
        var codigo = "";
        var inst = this.acciones;
        inst.forEach(function (value) {
            if (value instanceof Declaracion_1.Declaracion) {
                var dec = value;
                var traduc = dec.TraducirInstruccion(e);
                if (traduc == null) {
                    //sabemos que sucedio un error
                    return null;
                }
                else {
                    codigo += traduc.ObtenerCodigo();
                }
            }
        });
        return codigo;
    };
    AST.prototype.DefinirMetodosPropios = function () {
        var codigo = "";
        var metodos = new MetodosPropios_1.MetodosPropios();
        codigo = metodos.Construir();
        return codigo;
    };
    AST.prototype.GenerarArbol = function () {
        var codigo = [];
        var enlace = [];
        var indice = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        var indice2 = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indice, name: 'INICIO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        codigo.push({ data: { id: "" + indice2, name: 'CUERPO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + indice, target: "" + indice2, faveColor: '#6FB1FC', strength: 90 } });
        this.acciones.forEach(function (item) {
            var cad = item.GenerarNodo(indice2);
            var json = JSON.parse(cad);
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    AST.prototype.GenerarTabla = function () {
        VarGlobal_1.VarGlobal.getInstance().limpiar();
        var enuevo = new Entorno_1.Entorno(null, Entorno_1.TipoEntorno.GLOBAL);
        //iniciamos todo
        var codigo = "var Stack[];\nvar Heap[];\nvar P=0;\nvar H=0;\nvar E=0;\n";
        var etiqueta1 = VarGlobal_1.VarGlobal.getInstance().contadorSaltos;
        //importaciones
        //Declarar variables globales
        codigo += this.DeclararGlobales(enuevo);
        codigo += "goto L" + etiqueta1 + ";\n";
        codigo += this.DefinirMetodosPropios();
        this.DeclararMetodos(enuevo);
        codigo += this.CodigoMetodos(enuevo);
        //Reservar espacio
        codigo += this.ReservarEspacio(enuevo);
        codigo += "L" + etiqueta1 + ":\n";
        codigo += this.MetodoBegin();
        //crear todos los temporales
        codigo = VarGlobal_1.VarGlobal.getInstance().ObtenerCreacionTemporales() + codigo;
        console.log(VarGlobal_1.VarGlobal.getInstance().CrearTabla());
        return JSON.stringify({ code: codigo, error: VarGlobal_1.VarGlobal.getInstance().lErrores, entornos: VarGlobal_1.VarGlobal.getInstance().CrearTabla() });
    };
    return AST;
}());
exports.AST = AST;
//# sourceMappingURL=AST.js.map