import { TipoExp } from "../Expresion/TipoExp";
import { Identificador } from "../Expresion/Identificador";
import { VarGlobal } from "../Global/VarGlobal";

export class Parametros {
    tipo: TipoExp;
    id: Identificador
    constructor(tipo, id) {
        this.tipo = tipo;
        this.id = id;
    }
    public ConstruirNodo(padre): string {
        let codigo = [];
        let enlace = [];
        let indice = VarGlobal.getInstance().contadorGrafo;
        let indice2 = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${indice}`, name: `PARAMETRO`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        let cad = this.id.GenerarNodo(indice);
        let json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        codigo.push({ data: { id: `${indice2}`, name: `Tipo{${this.tipo.toString()}}`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${indice}`, target: `${indice2}`, faveColor: '#6FB1FC', strength: 90 } })
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }
}