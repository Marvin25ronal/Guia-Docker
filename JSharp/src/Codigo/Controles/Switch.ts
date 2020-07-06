import { Instruccion } from "../Instruccion/Instruccion";
import { Nodo } from "../AST/Nodo";
import { VarGlobal } from "../Global/VarGlobal";
import { Expresion } from "../Expresion/Expresion";
import { Case } from "./Case";
import { Entorno, TipoEntorno } from "../Entorno/Entorno";
import { Traduccion } from "../3D/Traduccion";
import { Etiqueta } from "../3D/Etiqueta";
import { Default } from "./Default";

export class Switch implements Instruccion {
    constructor(cond, listacase, linea, columna) {
        this.condicion = cond;
        this.listacase = listacase;
        this.linea = linea;
        this.columna = columna;
    }
    TraducirInstruccion(e: import("../Entorno/Entorno").Entorno): import("../3D/Traduccion").Traduccion {
        let nuevoE = new Entorno(e, TipoEntorno.SWITCH)
        let indisalida = VarGlobal.getInstance().contadorSaltos;
        let etisalida = new Etiqueta(`L${indisalida}:\n`, indisalida);
        nuevoE.etiquetaSalida = etisalida;

        let tipocon = this.condicion.GetTipo(nuevoE);
        if (tipocon == null) { return null; }
        let condi = this.condicion.TraducirExp(nuevoE);
        if (condi == null) { return null; }
        let codigo = document.createTextNode(``);
        codigo.appendData(condi.ObtenerCodigo().toString());
        if (this.listacase != null) {
            let eti: Etiqueta = null;
            for (let i = 0; i < this.listacase.length; i++) {
                if (this.listacase[i] instanceof Case) {
                    let objcase = this.listacase[i] as Case;
                    objcase.siguientecase = eti;
                    objcase.tiposuperior = tipocon;
                    objcase.etiquetasuperior = condi.ObtenerEtiquetas()[0];
                    let res = objcase.TraducirInstruccion(nuevoE);
                    eti = objcase.siguientecase;
                    if (res == null) { return null; }
                    codigo.appendData(res.ObtenerCodigo().toString());
                } else {
                    let objelse = this.listacase[i] as Default;
                    codigo.appendData(`L${eti.indice}:\n`);
                    let res = objelse.TraducirInstruccion(nuevoE);
                    if (res == null) { return null; }
                    eti = null;
                    codigo.appendData(res.ObtenerCodigo().toString());
                }
            }
            if (eti != null) { codigo.appendData(`L${eti.indice}:\n`) }
        }
        codigo.appendData(`L${indisalida}:\n`);
        return new Traduccion([], codigo.textContent);

    }
    linea: number;
    columna: number;
    condicion: Expresion
    listacase: Instruccion[]
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
        codigo.push({ data: { id: `${indice}`, name: 'CONTROL_SWITCH', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })

        let cad = this.condicion.GenerarNodo(indice);
        let json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);

        if (this.listacase != null) {
            let indicec = VarGlobal.getInstance().contadorGrafo;
            codigo.push({ data: { id: `${indicec}`, name: 'CUERPO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
            enlace.push({ data: { source: `${indice}`, target: `${indicec}`, faveColor: '#6FB1FC', strength: 90 } })
            for (let i = 0; i < this.listacase.length; i++) {
                cad = this.listacase[i].GenerarNodo(indicec);
                json = JSON.parse(cad.toString());
                codigo = codigo.concat(json.nodo);
                enlace = enlace.concat(json.enlace);
            }
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }
}