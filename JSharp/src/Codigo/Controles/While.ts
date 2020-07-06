import { Instruccion } from "../Instruccion/Instruccion";
import { Expresion } from "../Expresion/Expresion";
import { VarGlobal } from "../Global/VarGlobal";
import { Errores } from "../Reportes/Errores";
import { Entorno, TipoEntorno } from "../Entorno/Entorno";
import { Etiqueta } from "../3D/Etiqueta";
import { Declaracion } from "../Instruccion/Declaracion";
import { Traduccion } from "../3D/Traduccion";
import { Acceso } from "../Expresion/Acceso";
import { Return } from "../Expresion/Return";

export class While implements Instruccion {
    TraducirInstruccion(e: import("../Entorno/Entorno").Entorno): import("../3D/Traduccion").Traduccion {
        let nuevoE = new Entorno(e, TipoEntorno.CICLO);
        let indiceSalida = VarGlobal.getInstance().contadorSaltos;
        let etisal = new Etiqueta(`L${indiceSalida}:\n`, indiceSalida);
        let indiceContinue = VarGlobal.getInstance().contadorSaltos;
        let eticontinue = new Etiqueta(`L${indiceContinue}:\n`, indiceContinue);
        nuevoE.etiquetaSalida = etisal;
        nuevoE.etiquetaContinue = eticontinue;
        let tipocon = this.condicion.GetTipo(nuevoE);
        if (tipocon.isBoolean()) {
            this.condicion.isControle = true;
            let exp = this.condicion.TraducirExp(nuevoE);
            if (exp == null) { return null; }
            let parteVerdadera = ``;
            let partefalsa = `goto L${indiceSalida};\n`;
            //parteVerdadera += `L${eticontinue}:\n`;
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
                    parteVerdadera += `goto L${eticontinue.indice};\n`;
                    let cansuperior = exp.ObtenerCodigo().replace(`t${exp.ObtenerEtiquetas()[0].indice}=1;`, `${parteVerdadera}`);
                    cansuperior = `L${indiceContinue}:\n` + cansuperior;
                    let caninferior = cansuperior.replace(`t${exp.ObtenerEtiquetas()[0].indice}=0;`, `${partefalsa}`);
                    caninferior += `L${etisal.indice}:\n`
                    console.log(VarGlobal.getInstance().pilaTemporales)
                    return new Traduccion([], caninferior);
                }
            }

        } else {
            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `La condicion del while tiene que ser de tipo booleana`, 3));
            return null;
        }
    }
    linea: number;
    columna: number;
    condicion: Expresion;
    instrucciones: Instruccion[];
    getLinea(): number {
        return this.linea;
    }
    getColumna(): number {
        return this.columna;
    }
    constructor(con, inst, linea, columna) {
        this.condicion = con;
        this.instrucciones = inst;
        this.linea = linea;
        this.columna = columna;
    }
    public GenerarNodo(padre: number) {
        let codigo = []
        let enlace = []
        let indice = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${indice}`, name: 'CONTROL_WHILE', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
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