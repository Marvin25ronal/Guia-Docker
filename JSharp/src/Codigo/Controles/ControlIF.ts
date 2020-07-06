import { Instruccion } from "../Instruccion/Instruccion";
import { Nodo } from "../AST/Nodo";
import { Expresion } from "../Expresion/Expresion";
import { Traduccion } from "../3D/Traduccion";
import { VarGlobal } from "../Global/VarGlobal";
import { Entorno, TipoEntorno } from "../Entorno/Entorno";
import { Etiqueta } from "../3D/Etiqueta";
import { Errores } from "../Reportes/Errores";
import { Declaracion } from "../Instruccion/Declaracion";
import { Acceso } from "../Expresion/Acceso";
import { Else } from "./Else";
import { ElseIF } from "./ElseIF";
import { Return } from "../Expresion/Return";

export class ControlIF implements Instruccion {
    TraducirInstruccion(e: import("../Entorno/Entorno").Entorno): Traduccion {

        let nuevoE = new Entorno(e, TipoEntorno.IF);
        let indiceSalida = VarGlobal.getInstance().contadorSaltos;
        let etisal = new Etiqueta(`L${indiceSalida}:\n`, indiceSalida);
        nuevoE.etiquetaSalida = etisal;
        let tipocon = this.condicion.GetTipo(nuevoE);
        if (tipocon.isBoolean()) {
            this.condicion.isControle = true;
            let exp = this.condicion.TraducirExp(nuevoE);
            if (exp == null) { return null; }
            let parteVerdadera = ``;
            let partefalsa = ``;
            if (this.instrucciones != null) {
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
                        } else if (aux instanceof Return) {
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
            }
            parteVerdadera += `goto L${etisal.indice};\n`;
            // console.log(this.Lifs);
            if (this.Lifs != null) {
                for (let i = 0; i < this.Lifs.length; i++) {
                    let aux = this.Lifs[i];
                    if (aux instanceof Else) { (aux as Else).etiquetaif = etisal; }
                    if (aux instanceof ElseIF) { (aux as ElseIF).salidaif = etisal; }
                    let nuevoE = new Entorno(e, TipoEntorno.IF);
                    let trad = aux.TraducirInstruccion(nuevoE);
                    partefalsa += trad.ObtenerCodigo();
                }
            }
            //partefalsa += `L${etisal.indice}:\n`;
            let cansuperior = exp.ObtenerCodigo().replace(`t${exp.ObtenerEtiquetas()[0].indice}=1;`, `${parteVerdadera}`);
            let caninferior = cansuperior.replace(`t${exp.ObtenerEtiquetas()[0].indice}=0;`, `${partefalsa}`);
            caninferior += `L${etisal.indice}:\n`
            return new Traduccion([], caninferior);
        } else {
            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `La condicion del if no es de tipo booleana`, 3));
            return null;
        }
        return null;
    }
    instrucciones: Nodo[]
    linea: number;
    columna: number;
    condicion: Expresion
    Lifs: Instruccion[]
    constructor(condicion, instrucciones, lifs, lines, columna) {
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.Lifs = lifs;
        this.linea = lines;
        this.columna = columna;
    }
    getLinea(): number {
        return this.linea;
    }
    getColumna(): number {
        throw new Error("Method not implemented.");
    }
    public GenerarNodo(padre: number) {
        let codigo = []
        let enlace = []
        let indice = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${indice}`, name: 'CONTROL_IF', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
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
        if (this.Lifs != null) {
            let indicelif = VarGlobal.getInstance().contadorGrafo;
            codigo.push({ data: { id: `${indicelif}`, name: 'LIFS', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
            enlace.push({ data: { source: `${indice}`, target: `${indicelif}`, faveColor: '#6FB1FC', strength: 90 } })
            for (let i = 0; i < this.Lifs.length; i++) {
                cad = this.Lifs[i].GenerarNodo(indicelif);
                json = JSON.parse(cad.toString());
                codigo = codigo.concat(json.nodo);
                enlace = enlace.concat(json.enlace);
            }
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }

}