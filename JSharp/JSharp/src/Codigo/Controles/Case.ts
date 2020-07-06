import { Instruccion } from "../Instruccion/Instruccion";
import { Nodo } from "../AST/Nodo";
import { Expresion } from "../Expresion/Expresion";
import { VarGlobal } from "../Global/VarGlobal";
import { TipoExp } from "../Expresion/TipoExp";
import { Etiqueta } from "../3D/Etiqueta";
import { Errores } from "../Reportes/Errores";
import { Traduccion } from "../3D/Traduccion";
import { Declaracion } from "../Instruccion/Declaracion";
import { Acceso } from "../Expresion/Acceso";
import { Return } from "../Expresion/Return";

export class Case implements Instruccion {
    TraducirInstruccion(e: import("../Entorno/Entorno").Entorno): import("../3D/Traduccion").Traduccion {
        let tipoexp = this.condicion.GetTipo(e);
        if (tipoexp == null) { return null; }
        let valorexpo = this.condicion.TraducirExp(e);
        if (valorexpo == null) { return null; }
        if (this.tiposuperior.tipo == tipoexp.tipo) {
            if (this.tiposuperior.esCadena()) {

            } else if (this.tiposuperior.isEstruct()) {

            } else {
                let codigo = document.createTextNode('');
                codigo.appendData(valorexpo.ObtenerCodigo().toString());
                let indicev = VarGlobal.getInstance().contadorSaltos;
                let indiceF = VarGlobal.getInstance().contadorSaltos;
                codigo.appendData(`if(t${this.etiquetasuperior.indice}==t${valorexpo.ObtenerEtiquetas()[0].indice}) goto L${indicev};\n`)
                codigo.appendData(`goto L${indiceF};\n`);
                codigo.appendData(`L${indicev}:\n`)
                if (this.siguientecase != null) { codigo.appendData(`L${this.siguientecase.indice}:\n`); }
                if (this.instrucciones != null) {
                    for (let i = 0; i < this.instrucciones.length; i++) {
                        let aux = this.instrucciones[i];
                        if (aux instanceof Declaracion) {
                            let traddec: Traduccion = aux.DeclararFuncion(e);
                            if (traddec == null) { continue; }
                            codigo.appendData(traddec.ObtenerCodigo().toString());
                        } else if (aux instanceof Expresion) {
                            let traduce: Traduccion = (aux as Expresion).TraducirExp(e);
                            if (traduce == null) { continue; }
                            codigo.appendData(traduce.ObtenerCodigo().toString())
                        } else if (aux instanceof Acceso) {
                            let trad = (aux as Acceso).TraducirExp(e);
                            if (trad == null) { continue; }
                            //parteVerdadera += trad.ObtenerCodigo();
                            codigo.appendData(trad.ObtenerCodigo().toString());
                        } else if (aux instanceof Return) {
                            let trad = (aux as Return).TraducirExp(e);
                            if (trad == null) { continue; }
                            codigo.appendData(trad.ObtenerCodigo().toString());
                        } else if (aux as Instruccion) {
                            let trad = (aux as Instruccion).TraducirInstruccion(e);
                            if (trad == null) { continue; }
                            //parteVerdadera += trad.ObtenerCodigo();
                            codigo.appendData(trad.ObtenerCodigo().toString());
                        }
                    }
                }
                let indinextcase = VarGlobal.getInstance().contadorSaltos;
                codigo.appendData(`goto L${indinextcase};\n`);
                codigo.appendData(`L${indiceF}:\n`);
                let eti = new Etiqueta(`L${indinextcase}:\n`, indinextcase);
                this.siguientecase = eti;
                return new Traduccion([], codigo.textContent);
            }
        } else {
            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `Los tipos no son compatibles con el case y el switch`, 3));
            return null;
        }
    }
    constructor(cond, ins, linea, columna) {
        this.condicion = cond;
        this.instrucciones = ins;
        this.linea = linea;
        this.columna = columna;
    }
    tiposuperior: TipoExp
    etiquetasuperior: Etiqueta
    linea: number;
    columna: number;
    instrucciones: Nodo[];
    condicion: Expresion
    siguientecase: Etiqueta
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
        codigo.push({ data: { id: `${indice}`, name: 'CASE', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
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