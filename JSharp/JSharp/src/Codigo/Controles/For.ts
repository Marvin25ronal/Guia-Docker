import { Instruccion } from "../Instruccion/Instruccion";
import { Asignacion } from "../Instruccion/Asignacion";
import { Expresion } from "../Expresion/Expresion";
import { VarGlobal } from "../Global/VarGlobal";
import { Entorno, TipoEntorno } from "../Entorno/Entorno";
import { format } from "path";
import { Nodo } from "../AST/Nodo";
import { Declaracion } from "../Instruccion/Declaracion";
import { Traduccion } from "../3D/Traduccion";
import { Acceso } from "../Expresion/Acceso";
import { Etiqueta } from "../3D/Etiqueta";
import { Return } from "../Expresion/Return";

export class For implements Instruccion {
    TraducirInstruccion(e: import("../Entorno/Entorno").Entorno): import("../3D/Traduccion").Traduccion {
        let nuevoE = new Entorno(e, TipoEntorno.CICLO);
        let indiceloop = VarGlobal.getInstance().contadorSaltos;
        let indiceSalida = VarGlobal.getInstance().contadorSaltos;
        let indiceIncremento = VarGlobal.getInstance().contadorSaltos;
        let etisal = new Etiqueta(`L${indiceSalida}:\n`, indiceSalida);
        let etiloop = new Etiqueta(`L${indiceIncremento}:\n`, indiceIncremento);
        nuevoE.etiquetaSalida = etisal;
        nuevoE.etiquetaContinue = etiloop;
        let codigo = document.createTextNode('');
        if (this.inicio != null) {
            if (this.inicio instanceof Declaracion) {
                let resasig = this.inicio.DeclararFuncion(nuevoE);
                if (resasig == null) { return null; }
                codigo.appendData(resasig.ObtenerCodigo().toString());
            } else {
                let resasig = this.inicio.TraducirInstruccion(nuevoE);
                if (resasig == null) { return null }
                codigo.appendData(resasig.ObtenerCodigo().toString());
            }
        }

        codigo.appendData(`L${indiceloop}:\n`);
        if (this.condicion != null) {
            this.condicion.isControle = true;
            let trad = this.condicion.TraducirExp(nuevoE);
            if (trad == null) { return null }
            let condicional = trad.ObtenerCodigo();
            let parteVerdadera = ``;
            if (this.instrucciones != null) {
                for (let i = 0; i < this.instrucciones.length; i++) {
                    let aux = this.instrucciones[i];
                    if (aux instanceof Declaracion) {
                        let traddec: Traduccion = aux.DeclararFuncion(nuevoE);
                        if (traddec == null) { continue; }
                        parteVerdadera += traddec.ObtenerCodigo();
                    } else if (aux instanceof Expresion) {
                        let traduce: Traduccion = (aux as Expresion).TraducirExp(nuevoE);
                        if (traduce == null) { continue; }
                        parteVerdadera += traduce.ObtenerCodigo();
                    } else if (aux instanceof Acceso) {
                        let trad = (aux as Acceso).TraducirExp(nuevoE);
                        if (trad == null) { continue; }
                        parteVerdadera += trad.ObtenerCodigo();
                    }else if (aux instanceof Return) {
                        let trad = (aux as Return).TraducirExp(e);
                        if (trad == null) { continue; }
                        parteVerdadera += trad.ObtenerCodigo();
                    } else if (aux as Instruccion) {
                        let trad = (aux as Instruccion).TraducirInstruccion(nuevoE);
                        if (trad == null) { continue; }
                        parteVerdadera += trad.ObtenerCodigo();
                    }
                }
            }
            parteVerdadera += `goto L${indiceIncremento};\n`;
           
            condicional = condicional.replace(`t${trad.ObtenerEtiquetas()[0].indice}=1;`, `${parteVerdadera}`)
            condicional = condicional.replace(`t${trad.ObtenerEtiquetas()[0].indice}=0;`, `goto L${indiceSalida};\n`);
            codigo.appendData(condicional.toString());
        } else {
            if (this.instrucciones != null) {
                let parteVerdadera = ``;
                for (let i = 0; i < this.instrucciones.length; i++) {
                    let aux = this.instrucciones[i];
                    if (aux instanceof Declaracion) {
                        let traddec: Traduccion = aux.DeclararFuncion(nuevoE);
                        if (traddec == null) { continue; }
                        parteVerdadera += traddec.ObtenerCodigo();
                    } else if (aux instanceof Expresion) {
                        let traduce: Traduccion = (aux as Expresion).TraducirExp(nuevoE);
                        if (traduce == null) { continue; }
                        parteVerdadera += traduce.ObtenerCodigo();
                    } else if (aux instanceof Acceso) {
                        let trad = (aux as Acceso).TraducirExp(nuevoE);
                        if (trad == null) { continue; }
                        parteVerdadera += trad.ObtenerCodigo();
                    } else if (aux as Instruccion) {
                        let trad = (aux as Instruccion).TraducirInstruccion(nuevoE);
                        if (trad == null) { continue; }
                        parteVerdadera += trad.ObtenerCodigo();
                    }
                }
                codigo.appendData(parteVerdadera);
            }

        }
        codigo.appendData(`L${indiceIncremento}:\n`);
        if (this.final != null) {
            let res = this.final.TraducirInstruccion(nuevoE);
            if (res == null) { return null; }
            codigo.appendData(res.ObtenerCodigo().toString());
        }
        codigo.appendData(`goto L${indiceloop};\n`);
        codigo.appendData(`L${indiceSalida}:\n`)
        return new Traduccion([], codigo.textContent);
    }
    linea: number;
    columna: number;
    inicio: Asignacion;
    condicion: Expresion;
    final: Asignacion;
    instrucciones: Nodo[];
    constructor(inici, condi, fin, instr, lin, col) {
        this.inicio = inici;
        this.condicion = condi;
        this.final = fin;
        this.linea = lin;
        this.columna = col;
        this.instrucciones = instr;
    }
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
        codigo.push({ data: { id: `${indice}`, name: 'CONTROL_FOR', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        let cad = ''
        let json = null;
        if (this.inicio != null) {
            cad = this.inicio.GenerarNodo(indice);
            let json = JSON.parse(cad.toString());
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);

        }
        if (this.condicion != null) {
            cad = this.condicion.GenerarNodo(indice);
            json = JSON.parse(cad.toString());
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        }
        if (this.final != null) {
            cad = this.final.GenerarNodo(indice);
            json = JSON.parse(cad.toString());
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        }

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