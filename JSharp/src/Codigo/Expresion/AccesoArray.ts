import { Expresion } from "./Expresion";
import { Identificador } from "./Identificador";
import { VarGlobal } from "../Global/VarGlobal";
import { Errores } from "../Reportes/Errores";
import { Arreglo } from "../Entorno/Arreglo";
import { Tipo, TipoExp } from "./TipoExp";
import { Traduccion } from "../3D/Traduccion";
import { Etiqueta } from "../3D/Etiqueta";

export class AccesoArray implements Expresion {
    indice: Expresion
    id: Identificador;
    apuntador: number
    constructor(id, exp, linea, columna) {
        this.columna = columna;
        this.linea = linea;
        this.indice = exp;
        this.id = id;
    }
    isControle: boolean;
    isControl: boolean;
    islogical: boolean;
    TraducirExp(e: import("../Entorno/Entorno").Entorno): import("../3D/Traduccion").Traduccion {
        let simbolo = this.id.TraducirExp(e);
        if (simbolo == null) { return null; }
        //el indice en donde esta la pos de heap
        let indice = VarGlobal.getInstance().contadorTemporales;
        let tam = VarGlobal.getInstance().contadorTemporales;
        let tpos = VarGlobal.getInstance().contadorTemporales;
        let tretorno = VarGlobal.getInstance().contadorTemporales;
        let L0 = VarGlobal.getInstance().contadorSaltos;
        let L1 = VarGlobal.getInstance().contadorSaltos;
        let Lsalida = VarGlobal.getInstance().contadorSaltos;
        let arreglo = e.getSimbolo(this.id.val);
        let simboloarray = arreglo as Arreglo;
        if (simboloarray.tipo.tipoarray == Tipo.STRING || simboloarray.tipo.tipoarray == Tipo.CHAR) {
            let codigo = document.createTextNode('');
            // debugger;
            codigo.appendData(simbolo.ObtenerCodigo().toString())
            codigo.appendData(`t${indice}=t${simbolo.ObtenerEtiquetas()[0].indice};\n`);
            codigo.appendData(`t${tam}=Heap[t${indice}];\n`);
            codigo.appendData(`t${indice}=t${indice}+1;\n`)
            let tippoexp = this.indice.GetTipo(e);
            if (tippoexp == null) { return null; }
            let expresion = this.indice.TraducirExp(e);
            if (expresion == null) { return null; }
            codigo.appendData(expresion.ObtenerCodigo().toString())
            if (tippoexp.isInteger()) {
                codigo.appendData(`t${tpos}=t${indice}+t${expresion.ObtenerEtiquetas()[0].indice};\n`);
                codigo.appendData(`if(t${expresion.ObtenerEtiquetas()[0].indice}<t${tam}) goto L${L0};\n`)
                codigo.appendData(`goto L${L1};\n`)
                codigo.appendData(`L${L0}:\n`);
                codigo.appendData(`if (t${tpos}<0) goto L${L1};\n`)
                codigo.appendData(`t${tretorno}=Heap[t${tpos}];\n`)
                this.apuntador = tpos;
                //tenemos la posicon en donde se encuentra la cadena
                //let indicecadena = VarGlobal.getInstance().contadorTemporales;
                //codigo.appendData(`t${indicecadena}=Heap[t${tretorno}];\n`)
                codigo.appendData(`goto L${Lsalida};\n`)
                codigo.appendData(`L${L1}:\n`)
                codigo.appendData(`E=2;\n`)
                codigo.appendData(`L${Lsalida}:\n`)
                return new Traduccion([new Etiqueta(`t${tretorno}`, tretorno)], codigo.textContent);
            } else {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `El indice tiene que ser de tipo numerico`, 3));
                return null;
            }
        } else {
            let codigo = document.createTextNode('');
            codigo.appendData(simbolo.ObtenerCodigo().toString())
            codigo.appendData(`t${indice}=t${simbolo.ObtenerEtiquetas()[0].indice};\n`);
            codigo.appendData(`t${tam}=Heap[t${indice}];\n`);//el tam
            codigo.appendData(`t${indice}=t${indice}+1;\n`)
            let tippoexp = this.indice.GetTipo(e);
            if (tippoexp == null) { return null; }
            let expresion = this.indice.TraducirExp(e);
            if (expresion == null) { return null; }
            codigo.appendData(expresion.ObtenerCodigo().toString())
            if (tippoexp.isInteger()) {
                codigo.appendData(`t${tpos}=t${indice}+t${expresion.ObtenerEtiquetas()[0].indice};\n`);
                codigo.appendData(`if(t${expresion.ObtenerEtiquetas()[0].indice}<t${tam}) goto L${L0};\n`)
                codigo.appendData(`goto L${L1};\n`)
                codigo.appendData(`L${L0}:\n`);
                codigo.appendData(`if (t${tpos}<0) goto L${L1};\n`)
                codigo.appendData(`t${tretorno}=Heap[t${tpos}];\n`)
                this.apuntador = tpos;
                codigo.appendData(`goto L${Lsalida};\n`)
                codigo.appendData(`L${L1}:\n`)
                codigo.appendData(`E=2;\n`)
                codigo.appendData(`L${Lsalida}:\n`)
                return new Traduccion([new Etiqueta(`t${tretorno}`, tretorno)], codigo.textContent);
            } else {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `El indice tiene que ser de tipo numerico`, 3));
                return null;
            }
        }

    }
    GetTipo(e: import("../Entorno/Entorno").Entorno): import("./TipoExp").TipoExp {
        if (e.existe(this.id.val)) {
            let simbolo = e.getSimbolo(this.id.val);
            let arreglo = simbolo as Arreglo;
            return new TipoExp(arreglo.tipo.tipoarray, arreglo.tipo.estructname);
        } else {
            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `Variable no encontrada como arreglo`, 3));
            return null;
        }
    }
    linea: number;
    columna: number;
    getLinea(): number {
        return this.linea;
    }
    getColumna(): number {
        return this.columna;
    }
    public GenerarNodo(padre: number) {
        let codigo = []
        let enlace = []
        let indice = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${indice}`, name: 'ACCESOARRAY', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })

        let cad = this.id.GenerarNodo(indice);
        let json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);

        cad = this.indice.GenerarNodo(indice);
        json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }

}