import { Expresion } from "./Expresion";
import { VarGlobal } from "../Global/VarGlobal";
import { Traduccion } from "../3D/Traduccion";
import { Errores } from "../Reportes/Errores";
import { Variable } from "../Entorno/Variable";
import { TipoEntorno } from "../Entorno/Entorno";
import { Tipo } from "./TipoExp";
import { Etiqueta } from "../3D/Etiqueta";
import { TraduccionLogica } from "../3D/TraduccionLogica";
import { Return } from "./Return";

export class Identificador implements Expresion {
    val: string;
    constructor(val: string, linea: number, columna: number) {
        this.val = val.toLowerCase();
        this.linea = linea;
        this.columna = columna;
    }
    isControle: boolean;
    //isControl: boolean;
    islogical: boolean;

    GetTipo(e: import("../Entorno/Entorno").Entorno): import("./TipoExp").TipoExp {
        if (e.existe(this.val)) {
            let signo = e.getSimbolo(this.val);
            let variable = signo as Variable;
            return variable.tipo;
        } else {
            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `No se encuentra la variable ${this.val}`, 3));
            return null;
        }
        //    throw new Error("Method not implemented.");
    }
    public GenerarNodo(padre: number): string {
        let indice = VarGlobal.getInstance().contadorGrafo;
        let codigo = [];
        let enlace = [];
        codigo.push({ data: { id: `${indice}`, name: `Id{${this.val}}`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        return JSON.stringify({ nodo: codigo, enlace: enlace })
    }

    TraducirExp(e: import("../Entorno/Entorno").Entorno): Traduccion {
        let codigo = ``;
        let variable = e.getSimbolo(this.val);
        if (variable != null) {
            let vari = variable as Variable;
            // debugger;
            if (vari.tipo.isArray()) {
                if (vari.ambito == TipoEntorno.GLOBAL) {
                    let indiceT = VarGlobal.getInstance().contadorTemporales;
                    codigo = `t${indiceT}=Heap[t${vari.ref}];\n`
                    VarGlobal.getInstance().Apilar(indiceT);
                    return new Traduccion([new Etiqueta(`t${indiceT}`, indiceT)], codigo);
                } else if (vari.ambito = TipoEntorno.FUNCION) {
                    let indiceT = VarGlobal.getInstance().contadorTemporales;
                    let indiceT2 = VarGlobal.getInstance().contadorTemporales;
                    codigo += `t${indiceT}=P+${vari.ref};\n`;
                    codigo += `t${indiceT2}=Stack[t${indiceT}];\n`;
                    VarGlobal.getInstance().Apilar(indiceT2);
                    return new Traduccion([new Etiqueta(`t${indiceT2}`, indiceT2)], codigo);
                }
            }
            if (vari.tipo.esCadena()) {
                if (vari.ambito == TipoEntorno.GLOBAL) {
                    let indiceT = VarGlobal.getInstance().contadorTemporales;
                    codigo = `t${indiceT}=Heap[t${vari.ref}];\n`
                    VarGlobal.getInstance().Apilar(indiceT);
                    return new Traduccion([new Etiqueta(`t${indiceT}`, indiceT)], codigo);
                } else if (vari.ambito = TipoEntorno.FUNCION) {
                    let indiceT = VarGlobal.getInstance().contadorTemporales;
                    let indiceT2 = VarGlobal.getInstance().contadorTemporales;
                    codigo += `t${indiceT}=P+${vari.ref};\n`;
                    codigo += `t${indiceT2}=Stack[t${indiceT}];\n`;
                    VarGlobal.getInstance().Apilar(indiceT2);
                    return new Traduccion([new Etiqueta(`t${indiceT2}`, indiceT2)], codigo);
                }
            }
            if (vari.ref < 0 || vari.ref.toString() == "-0") {//no declaradas
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `La variable a la cual se esta accediendo esta nula o no esta declarda`, 3))
                return null;
            }
            if (vari.ambito == TipoEntorno.GLOBAL) {
                //debugger;
                let indiceT = VarGlobal.getInstance().contadorTemporales;
                codigo = `t${indiceT}=Heap[t${vari.ref}];\n`
                if (vari.tipo.isBoolean() && this.isControle) {
                    let indice = VarGlobal.getInstance().contadorTemporales;
                    let L0 = VarGlobal.getInstance().contadorSaltos;
                    let L1 = VarGlobal.getInstance().contadorSaltos;
                    let Ls = VarGlobal.getInstance().contadorSaltos;
                    codigo += `if (t${indiceT}==1) goto L${L0};\n`;
                    codigo += `goto L${L1};\n`
                    codigo += `L${L0}:\n`
                    codigo += `t${indice}=1;\n`
                    codigo += `goto L${Ls};\n`;
                    codigo += `L${L1}:\n`
                    codigo += `t${indice}=0;\n`
                    codigo += `L${Ls}:\n`
                    VarGlobal.getInstance().Apilar(indice);
                    return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
                } else if (vari.tipo.isBoolean() && this.islogical) {
                    let LV = VarGlobal.getInstance().contadorSaltos;
                    let LF = VarGlobal.getInstance().contadorSaltos;
                    codigo += `if(t${indiceT}==1) goto L${LV};\n`
                    return new TraduccionLogica([new Etiqueta(`L${LV}:\n`, LV)], [new Etiqueta(`L${LF}:\n`, LF)], codigo, null, null, "");
                }
                VarGlobal.getInstance().Apilar(indiceT);
                return new Traduccion([new Etiqueta(`t${indiceT}`, indiceT)], codigo);
            } else if (vari.ambito == TipoEntorno.FUNCION) {
                let indiceT = VarGlobal.getInstance().contadorTemporales;
                let indiceT2 = VarGlobal.getInstance().contadorTemporales;
                codigo += `t${indiceT}=P+${vari.ref};\n`;
                codigo += `t${indiceT2}=Stack[t${indiceT}];\n`;
                if (vari.tipo.isBoolean() && this.islogical) {
                    let LV = VarGlobal.getInstance().contadorSaltos;
                    let LF = VarGlobal.getInstance().contadorSaltos;
                    codigo += `if(t${indiceT2}==1) goto L${LV};\n`
                    return new TraduccionLogica([new Etiqueta(`L${LV}:\n`, LV)], [new Etiqueta(`L${LF}:\n`, LF)], codigo, null, null, "");
                }
                if (vari.tipo.isBoolean() && this.isControle) {
                    let indice = VarGlobal.getInstance().contadorTemporales;
                    let L0 = VarGlobal.getInstance().contadorSaltos;
                    let L1 = VarGlobal.getInstance().contadorSaltos;
                    let Ls = VarGlobal.getInstance().contadorSaltos;
                    codigo += `if (t${indiceT2}==1) goto L${L0};\n`;
                    codigo += `goto L${L1};\n`
                    codigo += `L${L0}:\n`
                    codigo += `t${indice}=1;\n`
                    codigo += `goto L${Ls};\n`;
                    codigo += `L${L1}:\n`
                    codigo += `t${indice}=0;\n`
                    codigo += `L${Ls}:\n`
                    VarGlobal.getInstance().Apilar(indice);
                    return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
                }
                VarGlobal.getInstance().Apilar(indiceT2);
                return new Traduccion([new Etiqueta(`t${indiceT2}`, indiceT2)], codigo);
            }
        }
        return null;
    }
    linea: number;
    columna: number;
    getLinea(): number {
        return this.linea;
    }
    getColumna(): number {
        return this.columna;
    }

}