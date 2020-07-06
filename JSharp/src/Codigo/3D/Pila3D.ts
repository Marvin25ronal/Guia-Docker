import { Codigo } from "./Codigo";
import { Metodo } from "./Metodo";
import { Asignacion3D } from './Asignacion3D'
import { VarGlobal } from "../Global/VarGlobal";
import { Salto } from "./Salto";
import { CodigoEtiqueta } from "./CodigoEtiqueta";
import { IF } from "./IF";
import { Bloque } from "../3D/Bloque";

export class Pila3D {
    arreglo: Codigo[]
    bloques: Bloque[];
    constructor(ara) {
        this.arreglo = ara;
        this.bloques=[]
    }
 
    ConstruirBloques(): Bloque[] {
        this.ConstruirBloques2(this.arreglo, null);
        for (let i = 0; i < this.bloques.length; i++) {
            if (this.bloques[i].lista.length == 0) {
                this.bloques.splice(i, 1);
            }
        }
        return this.bloques;
    }
    ConstruirBloques2(arr: Codigo[], bloque: Bloque) {

        if (bloque == null) { bloque = new Bloque(""); }
        for (let i = 0; i < arr.length; i++) {
            let opcion = arr[i];
            if (opcion.numero == 1) {
                let metodo = opcion as Metodo;
                let Bloquenuevo = new Bloque(metodo.id);
                this.bloques.push(bloque);
                this.ConstruirBloques2(metodo.cuerpo, Bloquenuevo);
            } else if (opcion.numero == 0) {
                bloque.insertar(opcion);
            } else if (opcion.numero == 2) {
                let BloqueNuevo = new Bloque("");
                this.bloques.push(bloque)
                BloqueNuevo.insertar(opcion);
                this.bloques.push(BloqueNuevo);
                bloque = new Bloque("");
            } else if (opcion.numero == 3) {
                this.bloques.push(bloque);
                let nuevo = new Bloque((opcion as CodigoEtiqueta).id)
                bloque = nuevo;
            } else if (opcion.numero == 4) {
                this.bloques.push(bloque);
                let nuevo = new Bloque("");
                nuevo.insertar(opcion);
                this.bloques.push(nuevo);
                bloque = new Bloque('');
            } else {
                bloque.insertar(opcion);
            }
        }
        this.bloques.push(bloque);
    }
    OptimizarMirilla() {
        VarGlobal.getInstance().pilareglas = [];
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
    }

    Regla1(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {

            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla1(Metodo.cuerpo);
            } else if (arr[i].numero == 0) {
                let asignacion = arr[i] as Asignacion3D;
                if (asignacion.Valor2 == null) {
                    let a = asignacion.Asignando;
                    let b = asignacion.Valor1;
                    //de aqui recorremos
                    for (let j = i; j < arr.length; j++) {
                        if (arr[j].numero == 0) {
                            let nuevaasign = arr[j] as Asignacion3D
                            let a2 = nuevaasign.Asignando;
                            let b2 = nuevaasign.Valor1;
                            if (a == a2) {
                                if (b != b2) {
                                    break;
                                }
                            } else if (a == b2) {
                                if (b == a2) {
                                    //esta repetida
                                    //this.pilaTemporales.splice(indice, 1);
                                    VarGlobal.getInstance().AgregarRegla(1, arr[j].linea, arr[j].columna, arr[j].Codigo());
                                    arr.splice(j, 1);
                                    break;
                                } else {
                                    break;
                                }
                            }
                        } else {
                            break;
                        }
                    }

                }
            }
        }
    }
    Regla2(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla2(Metodo.cuerpo);
            } else if (arr[i].numero == 2) {
                let goto = arr[i] as Salto;
                let destino = goto.salto;
                let codigo = ""
                for (let j = i; j < arr.length; j++) {
                    let aux = arr[j];
                    codigo += arr[j].Codigo();
                    if (aux.numero == 3) {
                        let etiqu = aux as CodigoEtiqueta;
                        if (etiqu.id == destino) {
                            //se elimina
                            let inicio = i;
                            VarGlobal.getInstance().AgregarRegla(2, arr[i].linea, arr[i].columna, codigo);
                            arr.splice(inicio, j - i);
                            break;
                        } else {
                            break;
                        }
                    } else if (aux.numero == 1) {
                        break;
                    }
                }
            }
        }
    }
    //Asignacion 0
    //Metodos 1
    //goto 2
    //Etiqueta 3
    //IF 4
    Regla3(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla3(Metodo.cuerpo);
            } else if (arr[i].numero == 4) {
                if (!(i < arr.length - 2)) { continue; }
                if (arr[i + 1].numero == 2) {
                    //cumple condicion
                    if (arr[i + 2].numero == 3) {
                        let ifactual = arr[i] as IF;
                        if (ifactual.signo != "==" || (ifactual.Valor1 == "1" && (ifactual.Valor2 == "1" || ifactual.Valor2 == "0"))) { continue; }
                        let Verdadera = (arr[i + 2] as CodigoEtiqueta).id;
                        if (Verdadera != ifactual.Salto) { continue; }
                        let etifalse = (arr[i + 1] as Salto).salto;
                        let pilaVerdaderas = [];

                        let indicefalso = 0;
                        for (let j = i + 3; j < arr.length; j++) {
                            if (arr[j].numero == 3) {
                                let aux = arr[j] as CodigoEtiqueta;
                                if (aux.id == etifalse) {
                                    indicefalso = j;
                                    break;
                                }else{
                                    indicefalso=-1;
                                    break;
                                }
                            }
                            pilaVerdaderas.push(arr[j]);
                        }
                        if(indicefalso==-1){continue}
                        let codigo = ''
                        codigo += ifactual.Codigo();
                        codigo += arr[i + 1].Codigo();
                        codigo += arr[i + 2].Codigo();
                        VarGlobal.getInstance().AgregarRegla(3, arr[i].linea, arr[i].columna, codigo);

                        ifactual.signo = "<>";
                        ifactual.Salto = etifalse;
                        arr.splice(i + 1, 1);//eliminamos goto
                        arr.splice(i + 1, 1);//eliminamos L1:
                        arr.splice(i + 1, (indicefalso - 3) - i);
                        this.insertArrayAt(arr, i + 1, pilaVerdaderas);
                        continue;
                        //eliminar el goto
                        //eliminar el L1


                    }
                }
            }
        }
    }
    Regla4(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla4(Metodo.cuerpo);
            } else if (arr[i].numero == 4) {
                if (!(i < arr.length - 2)) { continue; }
                if (arr[i + 1].numero == 2) {
                    //cumple condicion
                    let condi = arr[i] as IF;
                    if (condi.signo == "==" && condi.Valor1 == "1" && condi.Valor2 == "1") {
                        let salto = arr[i + 1] as Salto;
                        salto.salto = condi.Salto;
                        VarGlobal.getInstance().AgregarRegla(4, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        arr.splice(i, 1);
                    }
                }
            }
        }
    }
    Regla5(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla4(Metodo.cuerpo);
            } else if (arr[i].numero == 4) {
                if (!(i < arr.length - 2)) { continue; }
                if (arr[i + 1].numero == 2) {
                    //cumple condicion
                    let condi = arr[i] as IF;
                    if (condi.signo == "==" && condi.Valor1 == "1" && condi.Valor2 == "0") {
                        VarGlobal.getInstance().AgregarRegla(5, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        arr.splice(i, 1);
                    }
                }
            }
        }
    }
    Regla6(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla6(Metodo.cuerpo);
            } else if (arr[i].numero == 2) {
                //vamos a buscar la siguiente
                let goto = arr[i] as Salto;
                let busqueda = goto.salto;
                for (let j = i; j < arr.length - 1; j++) {
                    if (arr[j].numero == 3) {
                        let eti = arr[j] as CodigoEtiqueta;
                        if (eti.id == busqueda) {
                            if (arr[j + 1].numero == 2) {
                               // debugger;
                                //cumple
                                let saltotran = arr[j + 1] as Salto;
                                VarGlobal.getInstance().AgregarRegla(6, goto.linea, goto.columna, goto.Codigo());
                                goto.salto = saltotran.salto;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    Regla7(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla7(Metodo.cuerpo);
            } else if (arr[i].numero == 4) {
                //vamos a buscar la siguiente
                let goto = arr[i] as IF;
                let busqueda = goto.Salto;
                for (let j = i; j < arr.length - 1; j++) {
                    if (arr[j].numero == 3) {
                        let eti = arr[j] as CodigoEtiqueta;
                        if (eti.id == busqueda) {
                            if (arr[j + 1].numero == 2) {

                                let saltotran = arr[j + 1] as Salto;
                                VarGlobal.getInstance().AgregarRegla(7, goto.linea, goto.columna, goto.Codigo());
                                goto.Salto = saltotran.salto;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    Regla9(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla9(Metodo.cuerpo);
            } else if (arr[i].numero == 0) {
                let asig = arr[i] as Asignacion3D;
                if (asig.signo == "-") {
                    if (asig.Valor2 == "0") {
                        if (asig.Asignando == asig.Valor1) {
                            VarGlobal.getInstance().AgregarRegla(9, arr[i].linea, arr[i].columna, arr[i].Codigo());
                            arr.splice(i, 1);
                            //arr.splice(i, 1);
                        }
                    }
                }
            }
        }
    }
    Regla13(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla13(Metodo.cuerpo);
            } else if (arr[i].numero == 0) {
                let asig = arr[i] as Asignacion3D;
                if (asig.signo == "-") {
                    if (asig.Valor2 == "0") {
                        //if (asig.Asignando == asig.Valor1) {
                        VarGlobal.getInstance().AgregarRegla(13, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        //arr.splice(i, 1);
                        asig.Valor2 = null
                        asig.signo = null;
                        //arr.splice(i, 1);
                        //}
                    }
                }
            }
        }
    }
    Regla11(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla11(Metodo.cuerpo);
            } else if (arr[i].numero == 0) {
                let asig = arr[i] as Asignacion3D;
                if (asig.signo == "/") {
                    if (asig.Valor2 == "1") {
                        if (asig.Asignando == asig.Valor1) {
                            VarGlobal.getInstance().AgregarRegla(11, arr[i].linea, arr[i].columna, arr[i].Codigo());
                            arr.splice(i, 1);
                        }
                    }
                }
            }
        }
    }
    Regla15(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla15(Metodo.cuerpo);
            } else if (arr[i].numero == 0) {
                let asig = arr[i] as Asignacion3D;
                if (asig.signo == "/") {
                    if (asig.Valor2 == "1") {
                        //if (asig.Asignando == asig.Valor1) {
                        VarGlobal.getInstance().AgregarRegla(15, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        //arr.splice(i, 1);
                        asig.Valor2 = null;
                        asig.signo = null;
                        //}
                    }
                }
            }
        }
    }
    Regla10(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla10(Metodo.cuerpo);
            } else if (arr[i].numero == 0) {
                let asig = arr[i] as Asignacion3D;
                if (asig.signo == "*") {
                    if (asig.Valor1 == "1") {
                        if (asig.Asignando == asig.Valor2) {
                            VarGlobal.getInstance().AgregarRegla(10, arr[i].linea, arr[i].columna, arr[i].Codigo());
                            arr.splice(i, 1);
                        }
                    } else if (asig.Valor2 == "1") {
                        if (asig.Asignando == asig.Valor1) {
                            VarGlobal.getInstance().AgregarRegla(10, arr[i].linea, arr[i].columna, arr[i].Codigo());
                            arr.splice(i, 1);
                        }
                    }
                }
            }
        }
    }
    Regla14(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla14(Metodo.cuerpo);
            } else if (arr[i].numero == 0) {
                let asig = arr[i] as Asignacion3D;
                if (asig.signo == "*") {
                    if (asig.Valor1 == "1") {

                        VarGlobal.getInstance().AgregarRegla(14, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        //    arr.splice(i, 1);
                        asig.Valor1 = asig.Valor2;
                        asig.Valor2 = null;
                        asig.signo = null;
                    } else if (asig.Valor2 == "1") {
                        asig.Valor2 = null;
                        VarGlobal.getInstance().AgregarRegla(14, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        //arr.splice(i, 1);
                        asig.signo = null;

                    }
                }
            }
        }
    }


    Regla8(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla8(Metodo.cuerpo);
            } else if (arr[i].numero == 0) {
                let asig = arr[i] as Asignacion3D;
                if (asig.signo == "+") {
                    if (asig.Valor1 == "0") {
                        if (asig.Asignando == asig.Valor2) {
                            VarGlobal.getInstance().AgregarRegla(8, arr[i].linea, arr[i].columna, arr[i].Codigo());
                            arr.splice(i, 1);
                        }
                    } else if (asig.Valor2 == "0") {
                        if (asig.Asignando == asig.Valor1) {
                            VarGlobal.getInstance().AgregarRegla(8, arr[i].linea, arr[i].columna, arr[i].Codigo());
                            arr.splice(i, 1);
                        }
                    }
                }
            }
        }
    }
    Regla16(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla16(Metodo.cuerpo);
            } else if (arr[i].numero == 0) {
                let asig = arr[i] as Asignacion3D;
                if (asig.signo == "*") {
                    if (asig.Valor1 == "2") {
                        VarGlobal.getInstance().AgregarRegla(16, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        asig.Valor1 = asig.Valor2
                        asig.signo = "+";
                    } else if (asig.Valor2 == "2") {
                        VarGlobal.getInstance().AgregarRegla(16, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        asig.Valor2 = asig.Valor1
                        asig.signo = "+";
                    }
                }
            }
        }
    }
    Regla17(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla17(Metodo.cuerpo);
            } else if (arr[i].numero == 0) {
                let asig = arr[i] as Asignacion3D;
                if (asig.signo == "*") {
                    if (asig.Valor1 == "0") {
                        VarGlobal.getInstance().AgregarRegla(17, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        asig.Valor1 = "0"
                        asig.signo = null
                        asig.Valor2 = null
                    } else if (asig.Valor2 == "0") {
                        VarGlobal.getInstance().AgregarRegla(17, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        asig.Valor2 = null
                        asig.signo = null;
                        asig.Valor1 = "0"
                    }
                }
            }
        }
    }
    Regla18(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla18(Metodo.cuerpo);
            } else if (arr[i].numero == 0) {
                let asig = arr[i] as Asignacion3D;
                if (asig.signo == "/") {
                    if (asig.Valor1 == "0") {
                        VarGlobal.getInstance().AgregarRegla(18, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        asig.Valor1 = "0"
                        asig.signo = null
                        asig.Valor2 = null
                    }
                }
            }
        }
    }
    Regla12(arr: Codigo[]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].numero == 1) {
                let Metodo = arr[i] as Metodo;
                this.Regla12(Metodo.cuerpo);
            } else if (arr[i].numero == 0) {
                let asig = arr[i] as Asignacion3D;
                if (asig.signo == "+") {
                    if (asig.Valor1 == "0") {

                        VarGlobal.getInstance().AgregarRegla(12, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        asig.Valor1 = asig.Valor2
                        asig.Valor2 = null;
                        asig.signo = null

                    } else if (asig.Valor2 == "0") {

                        VarGlobal.getInstance().AgregarRegla(12, arr[i].linea, arr[i].columna, arr[i].Codigo());
                        asig.Valor2 = null;
                        asig.signo = null

                    }
                }
            }
        }
    }
    codigo(arr: Codigo[]) {
        let codigo = document.createTextNode('')
        for (let i = 0; i < arr.length; i++) {
            codigo.appendData(arr[i].Codigo());
        }
        return codigo.textContent;
    }
    insertArrayAt(array, index, arrayToInsert) {
        Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
    }

}