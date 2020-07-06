import { AccesoFuncion } from "../Expresion/AccesoFuncion";
import { Entorno } from "../Entorno/Entorno";
import { Traduccion } from "../3D/Traduccion";
import { Etiqueta } from "../3D/Etiqueta";
import { TipoExp, Tipo } from "../Expresion/TipoExp";
import { Print } from "./Print";
import { VarGlobal } from "../Global/VarGlobal";
import { Errores } from "../Reportes/Errores";

export class FuncionesPropias {
    acceso: AccesoFuncion
    tanterior: Etiqueta;
    tipoanterior: TipoExp;
    tiposintetizado: TipoExp;
    constructor(ac, ant, tipo) {
        this.acceso = ac;
        this.tanterior = ant
        this.tipoanterior = tipo;
    }
    Generar(e: Entorno): Traduccion {
        //let codigo = ``;
        let linea = this.acceso.getLinea();
        let columna = this.acceso.getColumna();
        this.acceso.idfun.val = this.acceso.idfun.val.toLowerCase();
        if (this.acceso.idfun.val == "print") {
            if (this.tanterior != null) { VarGlobal.getInstance().agregarError(new Errores(linea, columna, "La funcion print no es atributo de un objeto", 3)); return null; }
            if (this.acceso.param.length == 1) {
                let print = new Print(this.acceso.param[0]);
                let traduc = print.Imprimir(e);
                this.tiposintetizado = new TipoExp(Tipo.VOID, null);
                return traduc;
            } else {
                VarGlobal.getInstance().agregarError(new Errores(linea, columna, "La funcion print solo recibe unicamente un parametro", 3));
                return null;
            }
        } else if (this.acceso.idfun.val == "tochararray") {
            if (this.tanterior == null) { VarGlobal.getInstance().agregarError(new Errores(linea, columna, "La funcion toCharArray tiene que ser propiedad de un array", 3)); return null }
            let tipo = this.tipoanterior;
            if (tipo.isString()) {
                let codigo = document.createTextNode('');
                codigo.appendData(`t0=t${this.tanterior.indice};\n`)
                codigo.appendData(`call marvin_201602520_ToCharArray;\n`)
                let indice = VarGlobal.getInstance().contadorTemporales;
                VarGlobal.getInstance().Apilar(indice);
                codigo.appendData(`t${indice}=t0;\n`)
                let nuevotipo = new TipoExp(Tipo.ARRAY, null);
                nuevotipo.tipoarray = Tipo.CHAR;
                this.tiposintetizado = nuevotipo;
                return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo.textContent);
            } else {
                VarGlobal.getInstance().agregarError(new Errores(linea, columna, `Tiene que ser una cadena`, 3))
                return null;
            }

        } else if (this.acceso.idfun.val == "length") {
            if (this.tanterior == null) { VarGlobal.getInstance().agregarError(new Errores(linea, columna, "La funcion length tiene que ser propiedad de un string", 3)); return null }
            if (this.tipoanterior.isString()) {
                let codigo = document.createTextNode('');
                codigo.appendData(`t0=t${this.tanterior.indice};\n`)
                codigo.appendData(`call marvin_201602520_StringLength;\n`)
                let indice = VarGlobal.getInstance().contadorTemporales;
                VarGlobal.getInstance().Apilar(indice);
                codigo.appendData(`t${indice}=t0;\n`)
                this.tiposintetizado = new TipoExp(Tipo.INTEGER, null);
                return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo.textContent);
            } else {
                VarGlobal.getInstance().agregarError(new Errores(linea, columna, `Tiene que ser una cadena`, 3))
                return null;
            }


        } else if (this.acceso.idfun.val == "touppercase") {
            if (this.tanterior == null) { VarGlobal.getInstance().agregarError(new Errores(linea, columna, "La funcion upper tiene que ser propiedad de un string", 3)); return null }
            if (this.tipoanterior.isString()) {
                let codigo = document.createTextNode('\n');
                codigo.appendData(`t0=t${this.tanterior.indice};\n`)
                codigo.appendData(`call marvin_201602520_toUpperCase;\n`)
                let indice = VarGlobal.getInstance().contadorTemporales;
                VarGlobal.getInstance().Apilar(indice);
                codigo.appendData(`t${indice}=t0;\n`)
                this.tiposintetizado = new TipoExp(Tipo.STRING, null);
                return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo.textContent);
            } else {
                VarGlobal.getInstance().agregarError(new Errores(linea, columna, `Tiene que ser una cadena`, 3));
                return null;
            }
        }
        else if (this.acceso.idfun.val == "tolowercase") {
            if (this.tanterior == null) { VarGlobal.getInstance().agregarError(new Errores(linea, columna, "La funcion lower tiene que ser propiedad de un string", 3)); return null }
            if (this.tipoanterior.isString()) {
                let codigo = document.createTextNode('\n');
                codigo.appendData(`t0=t${this.tanterior.indice};\n`)
                codigo.appendData(`call marvin_201602520_toLowerCase;\n`)
                let indice = VarGlobal.getInstance().contadorTemporales;
                VarGlobal.getInstance().Apilar(indice);
                codigo.appendData(`t${indice}=t0;\n`)
                this.tiposintetizado = new TipoExp(Tipo.STRING, null);
                return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo.textContent);
            } else {
                VarGlobal.getInstance().agregarError(new Errores(linea, columna, `Tiene que ser una cadena`, 3));
                return null;
            }
        } else if (this.acceso.idfun.val == "linealize") {
            if (this.tanterior == null) { VarGlobal.getInstance().agregarError(new Errores(linea, columna, "La funcion lower tiene que ser propiedad de un string", 3)); return null }
            if (this.tipoanterior.isArray()) {
                let codigo = document.createTextNode('\n');
                codigo.appendData(`t0=t${this.tanterior.indice};\n`)
                codigo.appendData(`call marvin_201602520_linealize;\n`)
                let indice = VarGlobal.getInstance().contadorTemporales;
                VarGlobal.getInstance().Apilar(indice);
                codigo.appendData(`t${indice}=t0;\n`)
                this.tiposintetizado = new TipoExp(Tipo.STRING, null);
                return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo.textContent);
            } else {
                VarGlobal.getInstance().agregarError(new Errores(linea, columna, `Tiene que ser una cadena`, 3));
                return null;
            }
        } else if (this.acceso.idfun.val == "charat") {
            if (this.tanterior == null) { VarGlobal.getInstance().agregarError(new Errores(linea, columna, "La funcion charat tiene que ser propiedad de un string", 3)); return null }
            if (this.tipoanterior.isString()) {
                if (this.acceso.param.length == 1) {
                    let codigo = document.createTextNode('\n');
                    let valor = this.acceso.param[0].TraducirExp(e);
                    codigo.appendData(valor.ObtenerCodigo().toString());
                    codigo.appendData(`t0=t${this.tanterior.indice};\n`)
                    let indice = VarGlobal.getInstance().contadorTemporales;
                    let res = VarGlobal.getInstance().contadorTemporales;
                    //codigo.appendData(`;\n`)
                    codigo.appendData(`t${indice}=t0+t${valor.ObtenerEtiquetas()[0].indice};\n`)
                    VarGlobal.getInstance().Apilar(res);
                    codigo.appendData(`t${indice}=Heap[t${indice}];\n`)
                    codigo.appendData(`t${res}=H;\n`)
                    codigo.appendData(`Heap[H]=t${indice};\n`)
                    codigo.appendData(`H=H+1;\n`)
                    codigo.appendData(`Heap[H]=-1;\n`)
                    codigo.appendData(`H=H+1;\n`)
                    this.tiposintetizado = new TipoExp(Tipo.STRING, null);
                    return new Traduccion([new Etiqueta(`t${res}`, res)], codigo.textContent);
                }
            } else {
                VarGlobal.getInstance().agregarError(new Errores(linea, columna, `Tiene que ser una cadena`, 3));
                return null;
            }
        }

    }
}