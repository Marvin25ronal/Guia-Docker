import { Instruccion } from "./Instruccion";
import { Acceso } from "../Expresion/Acceso";
import { Expresion } from "../Expresion/Expresion";
import { VarGlobal } from "../Global/VarGlobal";
import { Traduccion } from "../3D/Traduccion";
import { Errores } from "../Reportes/Errores";

export class AsignacionLlamada extends Instruccion {
    acc: Acceso;
    valor: Expresion
    constructor(acc, valor, linea, columna, ) {
        super(linea, columna);
        this.acc = acc;
        this.valor = valor;
    }
    TraducirInstruccion(e: import("../Entorno/Entorno").Entorno): Traduccion {
        let tipometiendo = this.acc.GetTipo(e);
        if (tipometiendo == null) { return null }
        let acceso = this.acc.TraducirExp(e);
        if (acceso == null) { return null; }
        let codigo = document.createTextNode('');
        codigo.appendData(acceso.ObtenerCodigo().toString());
        let tipoameter = this.valor.GetTipo(e);
        if (tipoameter == null) { return null; }
        if (tipoameter.sonCompatibles(tipometiendo)) {
            let valormetiendo = this.valor.TraducirExp(e);
            if (valormetiendo == null) { return null; }
           // debugger;
            let indicemetiendo = valormetiendo.ObtenerEtiquetas()[0].indice;
            codigo.appendData(valormetiendo.ObtenerCodigo().toString())
            let indice = this.acc.puntero;
            codigo.appendData(`Heap[t${indice}]=t${indicemetiendo};\n`)
            return new Traduccion([], codigo.textContent);

        } else {
            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `El tipo no es compatible`, 3));
            return null;
        }
    }
    public GenerarNodo(padre: number) {
        let codigo = []
        let enlace = []
        let indice = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${indice}`, name: 'ASIGNACIONLLAMADA', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        let cad = this.acc.GenerarNodo(indice);
        let json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);

        cad = this.valor.GenerarNodo(indice);
        json = JSON.parse(cad.toString())
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }

}