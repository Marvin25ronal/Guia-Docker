import { Expresion } from "./Expresion";
import { TipoExp } from "./TipoExp";
import { VarGlobal } from "../Global/VarGlobal";
import { Traduccion } from "../3D/Traduccion";
import { Errores } from "../Reportes/Errores";
import { Etiqueta } from "../3D/Etiqueta";

export class Casteo implements Expresion {
    tipo: TipoExp
    exp: Expresion
    constructor(tipo, exp, linea, columna) {
        this.tipo = tipo;
        this.exp = exp;
        this.columna = columna;
        this.linea = linea;
    }
    isControle: boolean;
    isControl: boolean;
    islogical: boolean;
    GetTipo(e: import("../Entorno/Entorno").Entorno): TipoExp {
        return this.tipo;
    }
    TraducirExp(e: import("../Entorno/Entorno").Entorno): Traduccion {
        let tipoexpresion = this.exp.GetTipo(e);
        if (tipoexpresion == null) { return null }
        if (tipoexpresion.isDouble()) {
            let expr = this.exp.TraducirExp(e);
            if (expr == null) { return null; }
            if (this.tipo.isInteger()) {
                //se tiene que truncar
                let codigo = document.createTextNode(``);
                let indice = VarGlobal.getInstance().contadorTemporales;
                let indice2 = VarGlobal.getInstance().contadorTemporales;
                let res = VarGlobal.getInstance().contadorTemporales;
                codigo.appendData(expr.ObtenerCodigo().toString())
                codigo.appendData(`t${indice}=t${expr.ObtenerEtiquetas()[0].indice};\n`)
                codigo.appendData(`t${indice2}=t${indice}%1;\n`)
                codigo.appendData(`t${res}=t${indice}-t${indice2};\n`)
                VarGlobal.getInstance().Apilar(res);
                return new Traduccion([new Etiqueta(`t${res}`, res)], codigo.textContent);
            } else if (this.tipo.isChar()) {
                //Hacer un nuevo arreglo con string
                let codigo = document.createTextNode(``);
                let indice = VarGlobal.getInstance().contadorTemporales;
                let indice2 = VarGlobal.getInstance().contadorTemporales;
                let th = VarGlobal.getInstance().contadorTemporales;
                let res = VarGlobal.getInstance().contadorTemporales;
                let res2 = VarGlobal.getInstance().contadorTemporales;
                codigo.appendData(expr.ObtenerCodigo().toString())
                codigo.appendData(`t${indice}=t${expr.ObtenerEtiquetas()[0].indice};\n`)
                codigo.appendData(`t${indice2}=t${indice}%1;\n`)
                codigo.appendData(`t${res}=t${indice}-t${indice2};\n`)
                codigo.appendData(`t${th}=H;\n`)
                codigo.appendData(`Heap[t${th}]=t${res};\n`)
                codigo.appendData(`H=H+1;\n`)
                codigo.appendData(`Heap[H]=-1;\n`)
                codigo.appendData(`H=H+1;\n`)
                codigo.appendData(`t${res2}=t${th};\n`)
                VarGlobal.getInstance().Apilar(res2);
                return new Traduccion([new Etiqueta(`t${res2}`, res2)], codigo.textContent);
            } else {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `no se puede castear el double`, 3))
                return null;
            }
        } else if (tipoexpresion.isChar()) {
            let expr = this.exp.TraducirExp(e);
            if (expr == null) { return null; }
            if (this.tipo.esNumero()) {
                let indice = VarGlobal.getInstance().contadorTemporales;
                let ret = VarGlobal.getInstance().contadorTemporales;
                let codigo = document.createTextNode(``);
                codigo.appendData(expr.ObtenerCodigo().toString())
                codigo.appendData(`t${indice}=t${expr.ObtenerEtiquetas()[0].indice};\n`)
                codigo.appendData(`t${ret}=Heap[t${indice}];\n`)
                VarGlobal.getInstance().Apilar(ret);
                return new Traduccion([new Etiqueta(`t${ret}`, ret)], codigo.textContent);
            } else {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `no se puede castear el char`, 3))
                return null;
            }
        } else if (tipoexpresion.isInteger()) {
            let expr = this.exp.TraducirExp(e);
            if (expr == null) { return null }
            if (this.tipo.esNumero()) {
                return expr;
            } else if (this.tipo.isChar()) {
                let indice = VarGlobal.getInstance().contadorTemporales;
                let res = VarGlobal.getInstance().contadorTemporales;
                let codigo = document.createTextNode('');
                codigo.appendData(`t${indice}=t${expr.ObtenerEtiquetas()[0].indice};\n`)
                codigo.appendData(`t${res}=Heap[t${indice}];\n`)
                VarGlobal.getInstance().Apilar(res)
                return new Traduccion([new Etiqueta(`t${res}`, res)], codigo.textContent);
            } else {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `no se puede castear el entero`, 3))
                return null;
            }
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
        let indicetipo = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${indice}`, name: 'CASTEO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        codigo.push({ data: { id: `${indicetipo}`, name: `TIPO{${this.tipo.toString()}}`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        enlace.push({ data: { source: `${indice}`, target: `${indicetipo}`, faveColor: '#6FB1FC', strength: 90 } })

        let cad = this.exp.GenerarNodo(indice);
        let json = JSON.parse(cad);
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }

}