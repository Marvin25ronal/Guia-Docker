import { Asignacion } from "./Asignacion";
import { Expresion } from "../Expresion/Expresion";
import { VarGlobal } from "../Global/VarGlobal";

export class AsignacionArray extends Asignacion {
    indice: Expresion
    constructor(valor, indice, exp, linea, columna) {
        super(valor, exp, linea, columna)
        this.indice = indice;
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

        let indicearr=VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${indicearr}`, name: 'INDICE', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${indice}`, target: `${indicearr}`, faveColor: '#6FB1FC', strength: 90 } })

        cad = this.indice.GenerarNodo(indicearr);
        json = JSON.parse(cad.toString())
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);

        cad = this.exp.GenerarNodo(indice);
        json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }
}