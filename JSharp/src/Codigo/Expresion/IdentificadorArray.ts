import { Identificador } from "./Identificador";
import { VarGlobal } from "../Global/VarGlobal";

export class IdentificadorArray extends Identificador {

    constructor(val: string, linea: number, columna: number) {
        super(val, linea, columna);
    }
    GenerarNodo(padre) {
        let indice = VarGlobal.getInstance().contadorGrafo;
        let codigo = [];
        let enlace = [];
        codigo.push({ data: { id: `${indice}`, name: `Id{${this.val}}[]`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        return JSON.stringify({ nodo: codigo, enlace: enlace })
    }
}