import { Expresion } from "./Expresion";
import { Traduccion } from "../3D/Traduccion";
import { TipoExp, Tipo } from "./TipoExp";
import { VarGlobal } from "../Global/VarGlobal";
import { Operacion } from "../Operaciones/Operacion";
import { Signo } from "../Operaciones/Signo";
import { Etiqueta } from "../3D/Etiqueta";
import { TraduccionLogica } from "../3D/TraduccionLogica";
import { Errores } from "../Reportes/Errores";

export class Relacionales extends Operacion {
    GetTipo(e: import("../Entorno/Entorno").Entorno): import("./TipoExp").TipoExp {
        return new TipoExp(Tipo.BOOLEAN, null);
    }
    TraducirExp(e: import("../Entorno/Entorno").Entorno): Traduccion {
        let tipoA = this.op1.GetTipo(e);
        let tipoB = this.op2.GetTipo(e);
        if (tipoA == null || tipoB == null) { return null; }
        let traducA = this.op1.TraducirExp(e);
        let traducB = this.op2.TraducirExp(e);
        if (traducA == null || traducB == null) { return null; }
        if (this.op == Signo.IGUAL_IGUAL) {
            return this.traducirIgual(tipoA, tipoB, traducA, traducB, "==");
        } else if (this.op == Signo.DISTINTO) {
            return this.traducirIgual(tipoA, tipoB, traducA, traducB, "<>");
        } else if (this.op == Signo.MAYOR) {
            return this.traducirMayor(tipoA, tipoB, traducA, traducB, ">");
        } else if (this.op == Signo.MENOR) {
            return this.traducirMayor(tipoA, tipoB, traducA, traducB, "<");
        } else if (this.op == Signo.MAYORI) {
            return this.traducirMayor(tipoA, tipoB, traducA, traducB, ">=");
        } else if (this.op == Signo.MENORI) {
            return this.traducirMayor(tipoA, tipoB, traducA, traducB, "<=");
        }
        return null;
    }
    traducirMayor(tipoA: TipoExp, tipob: TipoExp, traducA: Traduccion, traducB: Traduccion, signo: string): Traduccion {

        if (this.islogical == false) {
            let codigo = "";
            codigo += traducA.ObtenerCodigo();
            codigo += traducB.ObtenerCodigo();
            let indice = VarGlobal.getInstance().contadorTemporales;
            let etiV = VarGlobal.getInstance().contadorSaltos;
            let etiSa = VarGlobal.getInstance().contadorSaltos;
            if (tipoA.esNumero()) {
                if (tipob.esNumero()) {
                    codigo += `if(${traducA.ObtenerEtiquetas()[0].etiqueta}${signo}${traducB.ObtenerEtiquetas()[0].etiqueta}) goto L${etiV};\n`
                    codigo += `t${indice}=0;\ngoto L${etiSa};\n`;
                    codigo += `L${etiV}:\nt${indice}=1;\nL${etiSa}:\n`;
                    VarGlobal.getInstance().Apilar(indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo)
                } else if (tipob.isChar()) {
                    let aux2 = VarGlobal.getInstance().contadorTemporales;
                    let aux3 = VarGlobal.getInstance().contadorTemporales;
                    codigo += `t${indice}=${traducB.ObtenerEtiquetas()[0].etiqueta};\n`;
                    codigo += `t${aux2}=Heap[t${indice}];\n`;
                    codigo += `if(${traducA.ObtenerEtiquetas()[0].etiqueta}${signo}t${aux2}) goto L${etiV};\n`;
                    codigo += `t${aux3}=0;\ngoto L${etiSa};\n`;
                    codigo += `L${etiV}:\nt${aux3}=1;\nL${etiSa}:\n`;
                    VarGlobal.getInstance().Apilar(aux3);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    return new Traduccion([new Etiqueta(`t${aux3}`, aux3)], codigo);
                }
            } else if (tipoA.isChar()) {
                if (tipob.esNumero()) {
                    let aux2 = VarGlobal.getInstance().contadorTemporales;
                    let aux3 = VarGlobal.getInstance().contadorTemporales;
                    codigo += `t${indice}=${traducA.ObtenerEtiquetas()[0].etiqueta};\n`;
                    codigo += `t${aux2}=Heap[t${indice}];\n`;
                    codigo += `if(t${aux2}${signo}${traducB.ObtenerEtiquetas()[0].etiqueta}) goto L${etiV};\n`;
                    codigo += `t${aux3}=0;\ngoto L${etiSa};\n`;
                    codigo += `L${etiV}:\nt${aux3}=1;\nL${etiSa}:\n`;
                    VarGlobal.getInstance().Apilar(aux3);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    return new Traduccion([new Etiqueta(`t${aux3}`, aux3)], codigo);
                } else if (tipob.isChar()) {
                    let aux2 = VarGlobal.getInstance().contadorTemporales;
                    let indice2 = VarGlobal.getInstance().contadorTemporales;
                    let aux4 = VarGlobal.getInstance().contadorTemporales;
                    let aux3 = VarGlobal.getInstance().contadorTemporales;
                    codigo += `t${indice}=${traducA.ObtenerEtiquetas()[0].etiqueta};\n`;
                    codigo += `t${aux2}=Heap[t${indice}];\n`;
                    codigo += `t${indice2}=${traducB.ObtenerEtiquetas()[0].etiqueta};\n`;
                    codigo += `t${aux4}=Heap[t${indice2}];\n`;
                    codigo += `if(t${aux4}${signo}t${aux2}) goto L${etiV};\n`;
                    codigo += `t${aux3}=0;\ngoto L${etiSa};\n`;
                    codigo += `L${etiV}:\nt${aux3}=1;\nL${etiSa}:\n`;
                    VarGlobal.getInstance().Apilar(aux3);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    return new Traduccion([new Etiqueta(`t${aux3}`, aux3)], codigo);
                }
            }
        } else {
            let cabeza = '';
            cabeza += traducA.ObtenerCodigo();
            cabeza += traducB.ObtenerCodigo();
            let partesuper = '';
            let etiquetaV = VarGlobal.getInstance().contadorSaltos;
            let etiquetaF = VarGlobal.getInstance().contadorSaltos;
            if (tipoA.esNumero()) {
                if (tipob.esNumero()) {
                    partesuper = `if(${traducA.ObtenerEtiquetas()[0].etiqueta}${signo}${traducB.ObtenerEtiquetas()[0].etiqueta})goto L${etiquetaV};\n`;
                    return new TraduccionLogica([new Etiqueta(`L${etiquetaV}:\n`, etiquetaV)], [new Etiqueta(`L${etiquetaF}:\n`, etiquetaF)], partesuper, null, null, cabeza);
                } else if (tipob.isChar()) {
                    let aux2 = VarGlobal.getInstance().contadorTemporales;
                    let indice = VarGlobal.getInstance().contadorTemporales;
                    cabeza += `t${indice}=${traducB.ObtenerEtiquetas()[0].etiqueta};\n`;
                    cabeza += `t${aux2}=Heap[t${indice}];\n`;
                    partesuper += `if(${traducA.ObtenerEtiquetas()[0].etiqueta}${signo}t${aux2}) goto L${etiquetaV};\n`;
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica([new Etiqueta(`L${etiquetaV}:\n`, etiquetaV)], [new Etiqueta(`L${etiquetaF}:\n`, etiquetaF)], partesuper, null, null, cabeza);
                }
            } else if (tipoA.isChar()) {
                if (tipob.isChar()) {
                    let aux2 = VarGlobal.getInstance().contadorTemporales;
                    let indice2 = VarGlobal.getInstance().contadorTemporales;
                    let aux4 = VarGlobal.getInstance().contadorTemporales;

                    let indice = VarGlobal.getInstance().contadorTemporales;
                    cabeza += `t${indice}=${traducA.ObtenerEtiquetas()[0].etiqueta};\n`;
                    cabeza += `t${aux2}=Heap[t${indice}];\n`;
                    cabeza += `t${indice2}=${traducB.ObtenerEtiquetas()[0].etiqueta};\n`;
                    cabeza += `t${aux4}=Heap[t${indice2}];\n`;
                    partesuper += `if(t${aux4}${signo}t${aux2}) goto L${etiquetaV};\n`;
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica([new Etiqueta(`L${etiquetaV}:\n`, etiquetaV)], [new Etiqueta(`L${etiquetaF}:\n`, etiquetaF)], partesuper, null, null, cabeza);
                } else if (tipob.esNumero()) {
                    let indice = VarGlobal.getInstance().contadorTemporales;
                    let aux2 = VarGlobal.getInstance().contadorTemporales;
                    let aux3 = VarGlobal.getInstance().contadorTemporales;
                    cabeza += `t${indice}=${traducA.ObtenerEtiquetas()[0].etiqueta};\n`;
                    cabeza += `t${aux2}=Heap[t${indice}];\n`;
                    partesuper += `if(t${aux2}${signo}${traducB.ObtenerEtiquetas()[0].etiqueta}) goto L${etiquetaV};\n`;
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica([new Etiqueta(`L${etiquetaV}:\n`, etiquetaV)], [new Etiqueta(`L${etiquetaF}:\n`, etiquetaF)], partesuper, null, null, cabeza);
                }
            }
        }
        VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `No se puede operar esas expresiones en ${signo} `, 3));
        return null;
    }
    constructor(op1, op2, op, lin, col) {
        super(op1, op2, op, lin, col)
    }
    traducirIgual(tipoA: TipoExp, tipob: TipoExp, traducA: Traduccion, traducB: Traduccion, signo: string): Traduccion {
        if (this.islogical == false) {
            let codigo = "";
            codigo += traducA.ObtenerCodigo();
            codigo += traducB.ObtenerCodigo();
            let indice = VarGlobal.getInstance().contadorTemporales;
            let etiV = VarGlobal.getInstance().contadorSaltos;
            let etiSa = VarGlobal.getInstance().contadorSaltos;
            if (tipoA.esNumero()) {
                if (tipob.esNumero()) {
                    codigo += `if(${traducA.ObtenerEtiquetas()[0].etiqueta}${signo}${traducB.ObtenerEtiquetas()[0].etiqueta}) goto L${etiV};\n`
                    codigo += `t${indice}=0;\ngoto L${etiSa};\n`;
                    codigo += `L${etiV}:\nt${indice}=1;\nL${etiSa}:\n`;
                    VarGlobal.getInstance().Apilar(indice);
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
                } else if (tipob.isChar()) {
                    let aux2 = VarGlobal.getInstance().contadorTemporales;
                    let aux3 = VarGlobal.getInstance().contadorTemporales;
                    codigo += `t${indice}=${traducB.ObtenerEtiquetas()[0].etiqueta};\n`;
                    codigo += `t${aux2}=Heap[t${indice}];\n`;
                    codigo += `if(${traducA.ObtenerEtiquetas()[0].etiqueta}${signo}t${aux2}) goto L${etiV};\n`;
                    codigo += `t${aux3}=0;\ngoto L${etiSa};\n`;
                    codigo += `L${etiV}:\nt${aux3}=1;\nL${etiSa}:\n`;
                    VarGlobal.getInstance().Apilar(aux3);
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new Traduccion([new Etiqueta(`t${aux3}`, aux3)], codigo);
                }
            } else if (tipoA.isBoolean()) {
                if (tipob.isBoolean()) {
                    codigo += `if(${traducA.ObtenerEtiquetas()[0].etiqueta}${signo}${traducB.ObtenerEtiquetas()[0].etiqueta}) goto L${etiV};\n`
                    codigo += `t${indice}=0;\ngoto L${etiSa};\n`;
                    codigo += `L${etiV}:\nt${indice}=1;\nL${etiSa}:\n`;
                    VarGlobal.getInstance().Apilar(indice);
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
                }
            } else if (tipoA.isChar()) {
                if (tipob.esNumero()) {
                    let aux2 = VarGlobal.getInstance().contadorTemporales;
                    let aux3 = VarGlobal.getInstance().contadorTemporales;
                    codigo += `t${indice}=${traducA.ObtenerEtiquetas()[0].etiqueta};\n`;
                    codigo += `t${aux2}=Heap[t${indice}];\n`;
                    codigo += `if(t${aux2}${signo}${traducB.ObtenerEtiquetas()[0].etiqueta}) goto L${etiV};\n`;
                    codigo += `t${aux3}=0;\ngoto L${etiSa};\n`;
                    codigo += `L${etiV}:\nt${aux3}=1;\nL${etiSa}:\n`;
                    VarGlobal.getInstance().Apilar(aux3);
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new Traduccion([new Etiqueta(`t${aux3}`, aux3)], codigo);
                } else if (tipob.isChar()) {
                    let aux2 = VarGlobal.getInstance().contadorTemporales;
                    let indice2 = VarGlobal.getInstance().contadorTemporales;
                    let aux4 = VarGlobal.getInstance().contadorTemporales;
                    let aux3 = VarGlobal.getInstance().contadorTemporales;
                    codigo += `t${indice}=${traducA.ObtenerEtiquetas()[0].etiqueta};\n`;
                    codigo += `t${aux2}=Heap[t${indice}];\n`;
                    codigo += `t${indice2}=${traducB.ObtenerEtiquetas()[0].etiqueta};\n`;
                    codigo += `t${aux4}=Heap[t${indice2}];\n`;
                    codigo += `if(t${aux4}${signo}t${aux2}) goto L${etiV};\n`;
                    codigo += `t${aux3}=0;\ngoto L${etiSa};\n`;
                    codigo += `L${etiV}:\nt${aux3}=1;\nL${etiSa}:\n`;
                    VarGlobal.getInstance().Apilar(aux3);
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new Traduccion([new Etiqueta(`t${aux3}`, aux3)], codigo);
                }
            } else if (tipoA.isString()) {
                if (tipob.isString()) {
                    //let aux2 = VarGlobal.getInstance().contadorTemporales;
                    let indice2 = VarGlobal.getInstance().contadorTemporales;
                    //let aux4 = VarGlobal.getInstance().contadorTemporales;
                    let aux3 = VarGlobal.getInstance().contadorTemporales;
                    codigo += `t${indice}=${traducA.ObtenerEtiquetas()[0].etiqueta};\n`;
                    codigo += `t${indice2}=${traducB.ObtenerEtiquetas()[0].etiqueta};\n`;
                    codigo += `t1=t${indice};\n`;
                    codigo += `t2=t${indice2};\n`;
                    codigo += `call marvin_201602520_ToStringEquals;\n`
                    codigo += `t${aux3}=t0;\n`;
                    VarGlobal.getInstance().Apilar(aux3);
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    if (signo == "<>") {
                        let L1 = VarGlobal.getInstance().contadorSaltos;
                        let L2 = VarGlobal.getInstance().contadorSaltos;
                        codigo += `if(t${aux3}==1)goto L${L1};\n`
                        codigo += `t${aux3}=1;\ngoto L${L2};\n`
                        codigo += `L${L1}:\nt${aux3}=0;\nL${L2}:\n`;
                    }
                    return new Traduccion([new Etiqueta(`t${aux3}`, aux3)], codigo);
                }
            }
        } else {
            //mandan a pedir un traduccionlogica
            let cabeza = '';
            cabeza += traducA.ObtenerCodigo();
            cabeza += traducB.ObtenerCodigo();
            let partesuper = '';
            let etiquetaV = VarGlobal.getInstance().contadorSaltos;
            let etiquetaF = VarGlobal.getInstance().contadorSaltos;
            if (tipoA.esNumero()) {
                if (tipob.esNumero()) {
                    partesuper = `if(${traducA.ObtenerEtiquetas()[0].etiqueta}${signo}${traducB.ObtenerEtiquetas()[0].etiqueta})goto L${etiquetaV};\n`;
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica([new Etiqueta(`L${etiquetaV}:\n`, etiquetaV)], [new Etiqueta(`L${etiquetaF}:\n`, etiquetaF)], partesuper, null, null, cabeza);
                } else if (tipob.isChar()) {
                    let aux2 = VarGlobal.getInstance().contadorTemporales;
                    let indice = VarGlobal.getInstance().contadorTemporales;
                    cabeza += `t${indice}=${traducB.ObtenerEtiquetas()[0].etiqueta};\n`;
                    cabeza += `t${aux2}=Heap[t${indice}];\n`;
                    partesuper += `if(${traducA.ObtenerEtiquetas()[0].etiqueta}${signo}t${aux2}) goto L${etiquetaV};\n`;
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica([new Etiqueta(`L${etiquetaV}:\n`, etiquetaV)], [new Etiqueta(`L${etiquetaF}:\n`, etiquetaF)], partesuper, null, null, cabeza);
                }
            } else if (tipoA.isBoolean()) {
                if (tipob.isBoolean()) {
                    partesuper += `if(${traducA.ObtenerEtiquetas()[0].etiqueta}${signo}${traducB.ObtenerEtiquetas()[0].etiqueta}) goto L${etiquetaV};\n`
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica([new Etiqueta(`L${etiquetaV}:\n`, etiquetaV)], [new Etiqueta(`L${etiquetaF}:\n`, etiquetaF)], partesuper, null, null, cabeza);
                }
            } else if (tipoA.isChar()) {
                if (tipob.isChar()) {
                    let aux2 = VarGlobal.getInstance().contadorTemporales;
                    let indice2 = VarGlobal.getInstance().contadorTemporales;
                    let aux4 = VarGlobal.getInstance().contadorTemporales;

                    let indice = VarGlobal.getInstance().contadorTemporales;
                    cabeza += `t${indice}=${traducA.ObtenerEtiquetas()[0].etiqueta};\n`;
                    cabeza += `t${aux2}=Heap[t${indice}];\n`;
                    cabeza += `t${indice2}=${traducB.ObtenerEtiquetas()[0].etiqueta};\n`;
                    cabeza += `t${aux4}=Heap[t${indice2}];\n`;
                    partesuper += `if(t${aux4}${signo}t${aux2}) goto L${etiquetaV};\n`;
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica([new Etiqueta(`L${etiquetaV}:\n`, etiquetaV)], [new Etiqueta(`L${etiquetaF}:\n`, etiquetaF)], partesuper, null, null, cabeza);
                } else if (tipob.esNumero()) {
                    let indice = VarGlobal.getInstance().contadorTemporales;
                    let aux2 = VarGlobal.getInstance().contadorTemporales;
                    let aux3 = VarGlobal.getInstance().contadorTemporales;
                    cabeza += `t${indice}=${traducA.ObtenerEtiquetas()[0].etiqueta};\n`;
                    cabeza += `t${aux2}=Heap[t${indice}];\n`;
                    partesuper += `if(t${aux2}${signo}${traducB.ObtenerEtiquetas()[0].etiqueta}) goto L${etiquetaV};\n`;
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica([new Etiqueta(`L${etiquetaV}:\n`, etiquetaV)], [new Etiqueta(`L${etiquetaF}:\n`, etiquetaF)], partesuper, null, null, cabeza);
                }
            } else if (tipoA.isString()) {
                if (tipob.isString()) {
                    //let aux2 = VarGlobal.getInstance().contadorTemporales;
                    let indice = VarGlobal.getInstance().contadorTemporales;
                    let indice2 = VarGlobal.getInstance().contadorTemporales;
                    //let aux4 = VarGlobal.getInstance().contadorTemporales;
                    let aux3 = VarGlobal.getInstance().contadorTemporales;
                    cabeza += `t${indice}=${traducA.ObtenerEtiquetas()[0].etiqueta};\n`;
                    cabeza += `t${indice2}=${traducB.ObtenerEtiquetas()[0].etiqueta};\n`;
                    cabeza += `t1=t${indice};\n`;
                    cabeza += `t2=t${indice2};\n`;
                    cabeza += `call marvin_201602520_ToStringEquals;\n`
                    cabeza += `t${aux3}=t0;\n`;
                    partesuper += `if(t${aux3}${signo}1)goto L${etiquetaV};\n`
                    VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    VarGlobal.getInstance().Apilar(traducB.ObtenerEtiquetas()[0].indice);
                    return new TraduccionLogica([new Etiqueta(`L${etiquetaV}:\n`, etiquetaV)], [new Etiqueta(`L${etiquetaF}:\n`, etiquetaF)], partesuper, null, null, cabeza);
                }
            }

        }
        VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `No se puede operar esas expresiones en ${signo} `, 3));
        return null;
    }

    op1: Expresion;
    op2: Expresion;
    op: import("../Operaciones/Signo").Signo;

    public GenerarNodo(padre: number) {
        let codigo = []
        let enlace = []
        let indice = VarGlobal.getInstance().contadorGrafo;
        let indicesigno = VarGlobal.getInstance().contadorGrafo
        codigo.push({ data: { id: `${indice}`, name: 'EXP', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })

        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })

        let cad = this.op1.GenerarNodo(indice);
        let json = JSON.parse(cad);
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);

        codigo.push({ data: { id: `${indicesigno}`, name: `${this.ObtenerSignoString()}`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${indice}`, target: `${indicesigno}`, faveColor: '#6FB1FC', strength: 90 } })
        cad = this.op2.GenerarNodo(indice);
        json = JSON.parse(cad);
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }

}