import { Expresion } from "./Expresion";
import { Identificador } from "./Identificador";
import { VarGlobal } from "../Global/VarGlobal";
import { Traduccion } from "../3D/Traduccion";
import { Errores } from "../Reportes/Errores";
import { Variable } from "../Entorno/Variable";
import { TipoEntorno } from "../Entorno/Entorno";
import { Etiqueta } from "../3D/Etiqueta";

export class IncreDecre implements Expresion {
    id: Identificador;
    incre: boolean
    constructor(id, incre, linea, columna) {
        this.id = id;
        this.incre = incre;
        this.linea = linea;
        this.columna = columna;
    }
    isControle: boolean;
    isControl: boolean;
    islogical: boolean;
    GetTipo(e: import("../Entorno/Entorno").Entorno): import("./TipoExp").TipoExp {
        if (e.existe(this.id.val)) {
            let simbolo = e.getSimbolo(this.id.val);
            let variable = simbolo as Variable;
            if (variable.tipo.esNumero()) {
                return variable.tipo;
            } else {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `No se puede hacer incremento con este tipo de variable`, 3));
                return null;
            }
        }
        return null;
    }
    TraducirExp(e: import("../Entorno/Entorno").Entorno): Traduccion {
        if (e.existe(this.id.val)) {
            let indice = VarGlobal.getInstance().contadorTemporales;
            let operacion = VarGlobal.getInstance().contadorTemporales;
            let cad = document.createTextNode('');
            let simbolo = e.getSimbolo(this.id.val);
            let variable = simbolo as Variable;
            if (variable.ambito == TipoEntorno.GLOBAL) {
                //su valor esta en el heap
                if (variable.tipo.esNumero()) {
                    cad.appendData(`t${indice}=Heap[t${variable.ref}];\n`)
                    if (this.incre) { cad.appendData(`t${operacion}=t${indice}+1;\n`) }
                    else { cad.appendData(`t${operacion}=t${indice}-1;\n`) }
                    cad.appendData(`Heap[t${variable.ref}]=t${operacion};\n`)
                    VarGlobal.getInstance().Apilar(operacion);
                    return new Traduccion([new Etiqueta(`t${indice}`, indice)], cad.textContent);
                }
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `La variable no es de tipo numerica`, 3));
                return null;
            } else {
                //esta en estack
                if (variable.tipo.esNumero()) {
                    let punteropmas = VarGlobal.getInstance().contadorGrafo;
                    cad.appendData(`t${punteropmas}=P+${variable.ref};\n`)
                    cad.appendData(`t${indice}=Stack[t${punteropmas}];\n`)
                    if (this.incre) { cad.appendData(`t${operacion}=t${indice}+1;\n`) }
                    else { cad.appendData(`t${operacion}=t${indice}-1;\n`) }
                    cad.appendData(`Stack[t${punteropmas}]=t${operacion};\n`)
                    VarGlobal.getInstance().Apilar(operacion);
                    return new Traduccion([new Etiqueta(`t${indice}`, indice)], cad.textContent);
                }
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `La variable no es de tipo numerica`, 3))
                return null;
            }

        } else {
            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `La variable no existe ${this.id.val}`, 3))
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
        let indiceincre = VarGlobal.getInstance().contadorGrafo;
        if (this.incre) {
            codigo.push({ data: { id: `${indice}`, name: 'INCREMENTO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
            codigo.push({ data: { id: `${indiceincre}`, name: '++', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        } else {
            codigo.push({ data: { id: `${indice}`, name: 'DECREMENTO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
            codigo.push({ data: { id: `${indiceincre}`, name: '--', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        }
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        let cad = this.id.GenerarNodo(indice);
        let json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        enlace.push({ data: { source: `${padre}`, target: `${indiceincre}`, faveColor: '#6FB1FC', strength: 90 } })
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }

}