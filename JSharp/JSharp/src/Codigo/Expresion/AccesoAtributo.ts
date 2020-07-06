import { Expresion } from "./Expresion";
import { Identificador } from "./Identificador";
import { VarGlobal } from "../Global/VarGlobal";
import { Traduccion } from "../3D/Traduccion";

export class AccesoAtributo implements Expresion {
    id: Identificador
    constructor(id, linea, columna) {
        this.id = id;
        this.linea = linea;
        this.columna = columna;
    }
    isControle: boolean;
    isControl: boolean;
    islogical: boolean;
    GetTipo(e: import("../Entorno/Entorno").Entorno): import("./TipoExp").TipoExp {
        throw new Error("Method not implemented.");
    }
    TraducirExp(e: import("../Entorno/Entorno").Entorno): Traduccion {
        throw new Error("Method not implemented.");
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
        codigo.push({ data: { id: `${indice}`, name: 'ACCESOATRIBUTO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })

        let cad = this.id.GenerarNodo(indice);
        let json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }

}