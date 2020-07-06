import { Instruccion } from "../Instruccion/Instruccion";
import { Expresion } from "../Expresion/Expresion";
import { Nodo } from "../AST/Nodo";
import { VarGlobal } from "../Global/VarGlobal";
import { Etiqueta } from "../3D/Etiqueta";
import { Errores } from "../Reportes/Errores";
import { Declaracion } from "../Instruccion/Declaracion";
import { Traduccion } from "../3D/Traduccion";
import { Acceso } from "../Expresion/Acceso";
import { Return } from "../Expresion/Return";

export class ElseIF implements Instruccion {
    TraducirInstruccion(e: import("../Entorno/Entorno").Entorno): import("../3D/Traduccion").Traduccion {
        let tipocon = this.condicion.GetTipo(e);
        if (tipocon.isBoolean()) {
            this.condicion.isControle = true;
            let exp = this.condicion.TraducirExp(e);
            if (exp == null) { return null; }
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
            parteVerdadera += `goto L${this.salidaif.indice};\n`;
            let cansuperior = exp.ObtenerCodigo().replace(`t${exp.ObtenerEtiquetas()[0].indice}=1;`, `${parteVerdadera}`);
            let caninferior = cansuperior.replace(`t${exp.ObtenerEtiquetas()[0].indice}=0;`, ``);
            return new Traduccion([], caninferior);
        } else {
            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `La condicion del if no es de tipo booleana`, 3));
            return null;
        }
    }
    linea: number;
    columna: number;
    condicion: Expresion;
    instrucciones: Nodo[];
    salidaif: Etiqueta

    constructor(cond, instr, linea, columna) {
        this.condicion = cond;
        this.instrucciones = instr;
        this.linea = linea;
        this.columna = columna;
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
        codigo.push({ data: { id: `${indice}`, name: 'CONTROL_ELSEIF', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })

        let cad = this.condicion.GenerarNodo(indice);
        let json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);

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