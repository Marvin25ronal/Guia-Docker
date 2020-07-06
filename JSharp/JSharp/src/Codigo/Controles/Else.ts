import { Instruccion } from "../Instruccion/Instruccion";
import { Nodo } from "../AST/Nodo";
import { VarGlobal } from "../Global/VarGlobal";
import { Etiqueta } from "../3D/Etiqueta";
import { Declaracion } from "../Instruccion/Declaracion";
import { Traduccion } from "../3D/Traduccion";
import { Expresion } from "../Expresion/Expresion";
import { Acceso } from "../Expresion/Acceso";
import { Return } from "../Expresion/Return";

export class Else implements Instruccion {
    TraducirInstruccion(e: import("../Entorno/Entorno").Entorno): import("../3D/Traduccion").Traduccion {
        let parteVerdadera = ``;
        //let partefalsa = ``;
        if (this.instrucciones != null) {
            for (let i = 0; i < this.instrucciones.length; i++) {
                let aux = this.instrucciones[i];
                if (aux instanceof Declaracion) {
                    let traddec: Traduccion = aux.DeclararFuncion(e);
                    if (traddec == null) { continue; }
                    parteVerdadera += traddec.ObtenerCodigo();
                } else if (aux instanceof Expresion) {
                    let traduce: Traduccion = (aux as Expresion).TraducirExp(e);
                    if (traduce == null) { continue; }
                    parteVerdadera += traduce.ObtenerCodigo();
                } else if (aux instanceof Acceso) {
                    let trad = (aux as Acceso).TraducirExp(e);
                    if (trad == null) { continue; }
                    parteVerdadera += trad.ObtenerCodigo();
                } else if (aux instanceof Return) {
                    let trad = (aux as Return).TraducirExp(e);
                    if (trad == null) { continue; }
                    parteVerdadera += trad.ObtenerCodigo();
                } else if (aux as Instruccion) {
                    let trad = (aux as Instruccion).TraducirInstruccion(e);
                    if (trad == null) { continue; }
                    parteVerdadera += trad.ObtenerCodigo();
                }
            }
        }
        parteVerdadera += `goto L${this.etiquetaif.indice};\n`;
        return new Traduccion([], parteVerdadera);
    }
    linea: number;
    columna: number;
    instrucciones: Nodo[];
    etiquetaif: Etiqueta;
    constructor(lista, linea, columna) {
        this.instrucciones = lista;
        this.linea = linea;
        this.columna = columna;
    }
    getLinea(): number {
        throw new Error("Method not implemented.");
    }
    getColumna(): number {
        throw new Error("Method not implemented.");
    }
    public GenerarNodo(padre: number) {
        let codigo = []
        let enlace = []
        let indice = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${indice}`, name: 'CONTROL_ELSE', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })

        let cad = ''
        let json;

        if (this.instrucciones != null) {
            let indicec = VarGlobal.getInstance().contadorGrafo;
            codigo.push({ data: { id: `${indicec}`, name: 'CUERPO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
            enlace.push({ data: { source: `${indice}`, target: `${indicec}`, faveColor: '#6FB1FC', strength: 90 } })
            for (let i = 0; i < this.instrucciones.length; i++) {
                cad = this.instrucciones[i].GenerarNodo(indicec);
                json = JSON.parse(cad.toString());
                codigo = codigo.concat(json.nodo);
                enlace = enlace.concat(json.enlace);
            }
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }

}