import { Instruccion } from "../Instruccion/Instruccion";
import { VarGlobal } from "../Global/VarGlobal";
import { Errores } from "../Reportes/Errores";
import { Traduccion } from "../3D/Traduccion";

export class Break implements Instruccion {
    constructor(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    TraducirInstruccion(e: import("../Entorno/Entorno").Entorno): import("../3D/Traduccion").Traduccion {
        let entornobreak = e.cicloBreakMasCercano();
        if (entornobreak == null) {
            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, "El break no esta en un entorno de algun tipo de ciclo o Switch", 3));
            return null;
        }
        let codigo = `goto L${entornobreak.indice};\n`;
        return new Traduccion([], codigo);
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
        codigo.push({ data: { id: `${indice}`, name: 'BREAK', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }
}