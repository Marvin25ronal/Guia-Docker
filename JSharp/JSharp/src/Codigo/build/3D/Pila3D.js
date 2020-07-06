"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VarGlobal_1 = require("../Global/VarGlobal");
var Bloque_1 = require("../3D/Bloque");
var Pila3D = /** @class */ (function () {
    function Pila3D(ara) {
        this.arreglo = ara;
        this.bloques = [];
    }
    Pila3D.prototype.ConstruirBloques = function () {
        this.ConstruirBloques2(this.arreglo, null);
        for (var i = 0; i < this.bloques.length; i++) {
            if (this.bloques[i].lista.length == 0) {
                this.bloques.splice(i, 1);
            }
        }
        return this.bloques;
    };
    Pila3D.prototype.ConstruirBloques2 = function (arr, bloque) {
        if (bloque == null) {
            bloque = new Bloque_1.Bloque("");
        }
        for (var i = 0; i < arr.length; i++) {
            var opcion = arr[i];
            if (opcion.numero == 1) {
                var metodo = opcion;
                var Bloquenuevo = new Bloque_1.Bloque(metodo.id);
                this.bloques.push(bloque);
                this.ConstruirBloques2(metodo.cuerpo, Bloquenuevo);
            }
            else if (opcion.numero == 0) {
                bloque.insertar(opcion);
            }
            else if (opcion.numero == 2) {
                var BloqueNuevo = new Bloque_1.Bloque("");
                this.bloques.push(bloque);
                BloqueNuevo.insertar(opcion);
                this.bloques.push(BloqueNuevo);
                bloque = new Bloque_1.Bloque("");
            }
            else if (opcion.numero == 3) {
                this.bloques.push(bloque);
                var nuevo = new Bloque_1.Bloque(opcion.id);
                bloque = nuevo;
            }
            else if (opcion.numero == 4) {
                this.bloques.push(bloque);
                var nuevo = new Bloque_1.Bloque("");
                nuevo.insertar(opcion);
                this.bloques.push(nuevo);
                bloque = new Bloque_1.Bloque('');
            }
            else {
                bloque.insertar(opcion);
            }
        }
        this.bloques.push(bloque);
    };
    Pila3D.prototype.OptimizarMirilla = function () {
        VarGlobal_1.VarGlobal.getInstance().pilareglas = [];
        if (this.arreglo != null) {
            this.Regla1(this.arreglo);
            this.Regla6(this.arreglo);
            this.Regla7(this.arreglo);
            this.Regla2(this.arreglo);
            this.Regla3(this.arreglo);
            this.Regla4(this.arreglo);
            this.Regla5(this.arreglo);
            this.Regla8(this.arreglo);
            this.Regla9(this.arreglo);
            this.Regla10(this.arreglo);
            this.Regla11(this.arreglo);
            this.Regla12(this.arreglo);
            this.Regla13(this.arreglo);
            this.Regla14(this.arreglo);
            this.Regla15(this.arreglo);
            this.Regla16(this.arreglo);
            this.Regla17(this.arreglo);
            this.Regla18(this.arreglo);
            return this.codigo(this.arreglo);
        }
    };
    Pila3D.prototype.Regla1 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_1 = arr[i];
                this.Regla1(Metodo_1.cuerpo);
            }
            else if (arr[i].numero == 0) {
                var asignacion = arr[i];
                if (asignacion.Valor2 == null) {
                    var a = asignacion.Asignando;
                    var b = asignacion.Valor1;
                    //de aqui recorremos
                    for (var j = i; j < arr.length; j++) {
                        if (arr[j].numero == 0) {
                            var nuevaasign = arr[j];
                            var a2 = nuevaasign.Asignando;
                            var b2 = nuevaasign.Valor1;
                            if (a == a2) {
                                if (b != b2) {
                                    break;
                                }
                            }
                            else if (a == b2) {
                                if (b == a2) {
                                    //esta repetida
                                    //this.pilaTemporales.splice(indice, 1);
                                    VarGlobal_1.VarGlobal.getInstance().AgregarRegla(1, arr[j].linea, arr[j].columna, arr[j].Codigo());
                                    arr.splice(j, 1);
                                    break;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                        else {
                            break;
                        }
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla2 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_2 = arr[i];
                this.Regla2(Metodo_2.cuerpo);
            }
            else if (arr[i].numero == 2) {
                var goto = arr[i];
                var destino = goto.salto;
                var codigo = "";
                for (var j = i; j < arr.length; j++) {
                    var aux = arr[j];
                    codigo += arr[j].Codigo();
                    if (aux.numero == 3) {
                        var etiqu = aux;
                        if (etiqu.id == destino) {
                            //se elimina
                            var inicio = i;
                            VarGlobal_1.VarGlobal.getInstance().AgregarRegla(2, arr[i].linea, arr[i].columna, codigo);
                            arr.splice(inicio, j - i);
                            break;
                        }
                        else {
                            break;
                        }
                    }
                    else if (aux.numero == 1) {
                        break;
                    }
                }
            }
        }
    };
    //Asignacion 0
    //Metodos 1
    //goto 2
    //Etiqueta 3
    //IF 4
    Pila3D.prototype.Regla3 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_3 = arr[i];
                this.Regla3(Metodo_3.cuerpo);
            }
            else if (arr[i].numero == 4) {
                if (!(i < arr.length - 2)) {
                    continue;
                }
                if (arr[i + 1].numero == 2) {
                    //cumple condicion
                    if (arr[i + 2].numero == 3) {
                        var ifactual = arr[i];
                        if (ifactual.signo != "==" || (ifactual.Valor1 == "1" && (ifactual.Valor2 == "1" || ifactual.Valor2 == "0"))) {
                            continue;
                        }
                        var Verdadera = arr[i + 2].id;
                        if (Verdadera != ifactual.Salto) {
                            continue;
                        }
                        var etifalse = arr[i + 1].salto;
                        var pilaVerdaderas = [];
                        var indicefalso = 0;
                        for (var j = i + 3; j < arr.length; j++) {
                            if (arr[j].numero == 3) {
                                var aux = arr[j];
                                if (aux.id == etifalse) {
                                    indicefalso = j;
                                    break;
                                }
                                else {
                                    indicefalso = -1;
                                    break;
                                }
                            }
                            pilaVerdaderas.push(arr[j]);
                        }
                        if (indicefalso == -1) {
                            continue;
                        }
                        var codigo = '';
                        codigo += ifactual.Codigo();
                        codigo += arr[i + 1].Codigo();
                        codigo += arr[i + 2].Codigo();
                        VarGlobal_1.VarGlobal.getInstance().AgregarRegla(3, arr[i].linea, arr[i].columna, codigo);
                        ifactual.signo = "<>";
                        ifactual.Salto = etifalse;
                        arr.splice(i + 1, 1); //eliminamos goto
                        arr.splice(i + 1, 1); //eliminamos L1:
                        arr.splice(i + 1, (indicefalso - 3) - i);
                        this.insertArrayAt(arr, i + 1, pilaVerdaderas);
                        continue;
                        //eliminar el goto
                        //eliminar el L1
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla4 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_4 = arr[i];
                this.Regla4(Metodo_4.cuerpo);
            }
            else if (arr[i].numero == 4) {
                if (!(i < arr.length - 2)) {
                    continue;
                }
                if (arr[i + 1].numero == 2) {
                    //cumple condicion
                    var condi = arr[i];
                    if (condi.signo == "==" && condi.Valor1 == "1" && condi.Valor2 == "1") {
                        var salto = arr[i + 1];
                        salto.salto = condi.Salto;
                        VarGlobal_1.VarGlobal.getInstance().AgregarRegla(4, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        arr.splice(i, 1);
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla5 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_5 = arr[i];
                this.Regla4(Metodo_5.cuerpo);
            }
            else if (arr[i].numero == 4) {
                if (!(i < arr.length - 2)) {
                    continue;
                }
                if (arr[i + 1].numero == 2) {
                    //cumple condicion
                    var condi = arr[i];
                    if (condi.signo == "==" && condi.Valor1 == "1" && condi.Valor2 == "0") {
                        VarGlobal_1.VarGlobal.getInstance().AgregarRegla(5, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        arr.splice(i, 1);
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla6 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_6 = arr[i];
                this.Regla6(Metodo_6.cuerpo);
            }
            else if (arr[i].numero == 2) {
                //vamos a buscar la siguiente
                var goto = arr[i];
                var busqueda = goto.salto;
                for (var j = i; j < arr.length - 1; j++) {
                    if (arr[j].numero == 3) {
                        var eti = arr[j];
                        if (eti.id == busqueda) {
                            if (arr[j + 1].numero == 2) {
                                // debugger;
                                //cumple
                                var saltotran = arr[j + 1];
                                VarGlobal_1.VarGlobal.getInstance().AgregarRegla(6, goto.linea, goto.columna, goto.Codigo());
                                goto.salto = saltotran.salto;
                                break;
                            }
                        }
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla7 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_7 = arr[i];
                this.Regla7(Metodo_7.cuerpo);
            }
            else if (arr[i].numero == 4) {
                //vamos a buscar la siguiente
                var goto = arr[i];
                var busqueda = goto.Salto;
                for (var j = i; j < arr.length - 1; j++) {
                    if (arr[j].numero == 3) {
                        var eti = arr[j];
                        if (eti.id == busqueda) {
                            if (arr[j + 1].numero == 2) {
                                var saltotran = arr[j + 1];
                                VarGlobal_1.VarGlobal.getInstance().AgregarRegla(7, goto.linea, goto.columna, goto.Codigo());
                                goto.Salto = saltotran.salto;
                                break;
                            }
                        }
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla9 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_8 = arr[i];
                this.Regla9(Metodo_8.cuerpo);
            }
            else if (arr[i].numero == 0) {
                var asig = arr[i];
                if (asig.signo == "-") {
                    if (asig.Valor2 == "0") {
                        if (asig.Asignando == asig.Valor1) {
                            VarGlobal_1.VarGlobal.getInstance().AgregarRegla(9, arr[i].linea, arr[i].columna, arr[i].Codigo());
                            arr.splice(i, 1);
                            //arr.splice(i, 1);
                        }
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla13 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_9 = arr[i];
                this.Regla13(Metodo_9.cuerpo);
            }
            else if (arr[i].numero == 0) {
                var asig = arr[i];
                if (asig.signo == "-") {
                    if (asig.Valor2 == "0") {
                        //if (asig.Asignando == asig.Valor1) {
                        VarGlobal_1.VarGlobal.getInstance().AgregarRegla(13, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        //arr.splice(i, 1);
                        asig.Valor2 = null;
                        asig.signo = null;
                        //arr.splice(i, 1);
                        //}
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla11 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_10 = arr[i];
                this.Regla11(Metodo_10.cuerpo);
            }
            else if (arr[i].numero == 0) {
                var asig = arr[i];
                if (asig.signo == "/") {
                    if (asig.Valor2 == "1") {
                        if (asig.Asignando == asig.Valor1) {
                            VarGlobal_1.VarGlobal.getInstance().AgregarRegla(11, arr[i].linea, arr[i].columna, arr[i].Codigo());
                            arr.splice(i, 1);
                        }
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla15 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_11 = arr[i];
                this.Regla15(Metodo_11.cuerpo);
            }
            else if (arr[i].numero == 0) {
                var asig = arr[i];
                if (asig.signo == "/") {
                    if (asig.Valor2 == "1") {
                        //if (asig.Asignando == asig.Valor1) {
                        VarGlobal_1.VarGlobal.getInstance().AgregarRegla(15, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        //arr.splice(i, 1);
                        asig.Valor2 = null;
                        asig.signo = null;
                        //}
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla10 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_12 = arr[i];
                this.Regla10(Metodo_12.cuerpo);
            }
            else if (arr[i].numero == 0) {
                var asig = arr[i];
                if (asig.signo == "*") {
                    if (asig.Valor1 == "1") {
                        if (asig.Asignando == asig.Valor2) {
                            VarGlobal_1.VarGlobal.getInstance().AgregarRegla(10, arr[i].linea, arr[i].columna, arr[i].Codigo());
                            arr.splice(i, 1);
                        }
                    }
                    else if (asig.Valor2 == "1") {
                        if (asig.Asignando == asig.Valor1) {
                            VarGlobal_1.VarGlobal.getInstance().AgregarRegla(10, arr[i].linea, arr[i].columna, arr[i].Codigo());
                            arr.splice(i, 1);
                        }
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla14 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_13 = arr[i];
                this.Regla14(Metodo_13.cuerpo);
            }
            else if (arr[i].numero == 0) {
                var asig = arr[i];
                if (asig.signo == "*") {
                    if (asig.Valor1 == "1") {
                        VarGlobal_1.VarGlobal.getInstance().AgregarRegla(14, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        //    arr.splice(i, 1);
                        asig.Valor1 = asig.Valor2;
                        asig.Valor2 = null;
                        asig.signo = null;
                    }
                    else if (asig.Valor2 == "1") {
                        asig.Valor2 = null;
                        VarGlobal_1.VarGlobal.getInstance().AgregarRegla(14, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        //arr.splice(i, 1);
                        asig.signo = null;
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla8 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_14 = arr[i];
                this.Regla8(Metodo_14.cuerpo);
            }
            else if (arr[i].numero == 0) {
                var asig = arr[i];
                if (asig.signo == "+") {
                    if (asig.Valor1 == "0") {
                        if (asig.Asignando == asig.Valor2) {
                            VarGlobal_1.VarGlobal.getInstance().AgregarRegla(8, arr[i].linea, arr[i].columna, arr[i].Codigo());
                            arr.splice(i, 1);
                        }
                    }
                    else if (asig.Valor2 == "0") {
                        if (asig.Asignando == asig.Valor1) {
                            VarGlobal_1.VarGlobal.getInstance().AgregarRegla(8, arr[i].linea, arr[i].columna, arr[i].Codigo());
                            arr.splice(i, 1);
                        }
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla16 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_15 = arr[i];
                this.Regla16(Metodo_15.cuerpo);
            }
            else if (arr[i].numero == 0) {
                var asig = arr[i];
                if (asig.signo == "*") {
                    if (asig.Valor1 == "2") {
                        VarGlobal_1.VarGlobal.getInstance().AgregarRegla(16, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        asig.Valor1 = asig.Valor2;
                        asig.signo = "+";
                    }
                    else if (asig.Valor2 == "2") {
                        VarGlobal_1.VarGlobal.getInstance().AgregarRegla(16, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        asig.Valor2 = asig.Valor1;
                        asig.signo = "+";
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla17 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_16 = arr[i];
                this.Regla17(Metodo_16.cuerpo);
            }
            else if (arr[i].numero == 0) {
                var asig = arr[i];
                if (asig.signo == "*") {
                    if (asig.Valor1 == "0") {
                        VarGlobal_1.VarGlobal.getInstance().AgregarRegla(17, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        asig.Valor1 = "0";
                        asig.signo = null;
                        asig.Valor2 = null;
                    }
                    else if (asig.Valor2 == "0") {
                        VarGlobal_1.VarGlobal.getInstance().AgregarRegla(17, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        asig.Valor2 = null;
                        asig.signo = null;
                        asig.Valor1 = "0";
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla18 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_17 = arr[i];
                this.Regla18(Metodo_17.cuerpo);
            }
            else if (arr[i].numero == 0) {
                var asig = arr[i];
                if (asig.signo == "/") {
                    if (asig.Valor1 == "0") {
                        VarGlobal_1.VarGlobal.getInstance().AgregarRegla(18, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        asig.Valor1 = "0";
                        asig.signo = null;
                        asig.Valor2 = null;
                    }
                }
            }
        }
    };
    Pila3D.prototype.Regla12 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                var Metodo_18 = arr[i];
                this.Regla12(Metodo_18.cuerpo);
            }
            else if (arr[i].numero == 0) {
                var asig = arr[i];
                if (asig.signo == "+") {
                    if (asig.Valor1 == "0") {
                        VarGlobal_1.VarGlobal.getInstance().AgregarRegla(12, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        asig.Valor1 = asig.Valor2;
                        asig.Valor2 = null;
                        asig.signo = null;
                    }
                    else if (asig.Valor2 == "0") {
                        VarGlobal_1.VarGlobal.getInstance().AgregarRegla(12, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        asig.Valor2 = null;
                        asig.signo = null;
                    }
                }
            }
        }
    };
    Pila3D.prototype.codigo = function (arr) {
        var codigo = document.createTextNode('');
        for (var i = 0; i < arr.length; i++) {
            codigo.appendData(arr[i].Codigo());
        }
        return codigo.textContent;
    };
    Pila3D.prototype.insertArrayAt = function (array, index, arrayToInsert) {
        Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
    };
    return Pila3D;
}());
exports.Pila3D = Pila3D;
//# sourceMappingURL=Pila3D.js.map