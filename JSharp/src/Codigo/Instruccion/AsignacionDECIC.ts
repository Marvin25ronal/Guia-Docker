import { Asignacion } from "./Asignacion";
import { VarGlobal } from "../Global/VarGlobal";
import { Entorno, TipoEntorno } from "../Entorno/Entorno";
import { Variable } from "../Entorno/Variable";
import { Traduccion } from "../3D/Traduccion";
import { Etiqueta } from "../3D/Etiqueta";
import { Errores } from "../Reportes/Errores";

export class AsignacionDECIC extends Asignacion {
    incremento: boolean
    TraducirInstruccion(e: Entorno) {
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
                    if (this.incremento) { cad.appendData(`t${operacion}=t${indice}+1;\n`) }
                    else { cad.appendData(`t${operacion}=t${indice}-1;\n`) }
                    cad.appendData(`Heap[t${variable.ref}]=t${operacion};\n`)
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
                    if (this.incremento) { cad.appendData(`t${operacion}=t${indice}+1;\n`) }
                    else { cad.appendData(`t${operacion}=t${indice}-1;\n`) }
                    cad.appendData(`Stack[t${punteropmas}]=t${operacion};\n`)
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
    constructor(valor, incremento, linea, columna) {
        super(valor, null, linea, columna)
        this.incremento = incremento;
    }

    GenerarNodo(padre) {
        let codigo = []
        let enlace = []
        let indice = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${indice}`, name: 'ASIGNACION', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        let cad = this.id.GenerarNodo(indice);
        let json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        let masmas = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${masmas}`, name: '++', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${indice}`, target: `${masmas}`, faveColor: '#6FB1FC', strength: 90 } })
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }

}