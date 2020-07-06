import { Expresion } from "./Expresion";
import { VarGlobal } from "../Global/VarGlobal";
import { Identificador } from "./Identificador";
import { Variable } from "../Entorno/Variable";
import { Errores } from "../Reportes/Errores";

export class AccesoVariable implements Expresion {
    id: Identificador
    constructor(id) {
        this.id = id
    }
    TraducirExp(e: import("../Entorno/Entorno").Entorno): import("../3D/Traduccion").Traduccion {
        return this.id.TraducirExp(e);
    }
    GetTipo(e: import("../Entorno/Entorno").Entorno): import("./TipoExp").TipoExp {
        if (e.existe(this.id.val)) {
            let signo = e.getSimbolo(this.id.val);
            let variable = signo as Variable;
            return variable.tipo;
        } else {
            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `No se encuentra la variable ${this.id.val}`, 3));
            return null;
        }
    }
    islogical: boolean;
    isControle: boolean;
    linea: number;
    columna: number;
    getLinea(): number {
        return this.linea;
    }
    getColumna(): number {
        return this.columna;
    }
    public GenerarNodo(padre: number) {
        let indice = VarGlobal.getInstance().contadorGrafo;
        let codigo = [];
        let enlace = [];
        codigo.push({ data: { id: `${indice}`, name: `AccesoVariable{${this.id.val}}`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        return JSON.stringify({ nodo: codigo, enlace: enlace })
    }

}