import { Expresion } from "./Expresion";
import { Operacion } from "../Operaciones/Operacion";
import { VarGlobal } from "../Global/VarGlobal";
import { Entorno } from "../Entorno/Entorno";
import { Traduccion } from "../3D/Traduccion";
import { Signo } from "../Operaciones/Signo";
import { Errores } from "../Reportes/Errores";
import { Etiqueta } from "../3D/Etiqueta";
import { TraduccionLogica } from "../3D/TraduccionLogica";

export class Unaria extends Operacion {
    GetTipo(e: import("../Entorno/Entorno").Entorno): import("./TipoExp").TipoExp {
        return this.op1.GetTipo(e);
    }
    constructor(op1, s, linea, columna) {
        super(op1, null, s, linea, columna);
    }
    public GenerarNodo(padre: number) {
        let codigo = []
        let enlace = []
        let indice = VarGlobal.getInstance().contadorGrafo;
        let indicesigno = VarGlobal.getInstance().contadorGrafo
        codigo.push({ data: { id: `${indice}`, name: 'EXP', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })

        codigo.push({ data: { id: `${indicesigno}`, name: `${this.ObtenerSignoString()}`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${indice}`, target: `${indicesigno}`, faveColor: '#6FB1FC', strength: 90 } })
        let cad = this.op1.GenerarNodo(indice);
        let json = JSON.parse(cad);
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }
    TraducirExp(e: Entorno): Traduccion {
        let tipoA = this.op1.GetTipo(e);
        if (tipoA == null) { return null; }

        if (this.op == Signo.RESTA) {
            let traducA = this.op1.TraducirExp(e);
            if (traducA == null) { return null; }
            let codigo = "";
            if (tipoA.esNumero()) {
                codigo += traducA.ObtenerCodigo();
                let etiqueta = traducA.ObtenerEtiquetas();
                let indice = VarGlobal.getInstance().contadorTemporales;
                codigo += `t${indice}=t${etiqueta[0].indice}*-1;\n`;
                VarGlobal.getInstance().Apilar(indice);
                VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
            } else {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, "No se puede hacer negativo ese tipo ", 3));
                return null;
            }
        } else if (this.op == Signo.NOT) {
            if (tipoA.isBoolean()) {
                if (this.islogical) {
                    this.op1.islogical = true;
                    let traducA = this.op1.TraducirExp(e);
                    let TA = traducA as TraduccionLogica;
                    let encabezado = ``;
                    let codigo = ``;
                    encabezado += TA.encabezado;
                    //encabezado += B.encabezado;
                    codigo += TA.partesuperior
                    //codigo += `goto L${TA.etiquetasFalsas[0].indice};\n`;
                    //codigo += TA.etiquetasVerdaderas[0].etiqueta;
                    //codigo += B.partesuperior;
                    //codigo += `goto L${B.etiquetasFalsas[0].indice};\n`;
                    let etiquetasver = [];
                    //TA.etiquetasVerdaderas.shift();
                    etiquetasver = TA.etiquetasFalsas;
                    let etiquetasfal = [];
                    etiquetasfal = TA.etiquetasVerdaderas;
                    return new TraduccionLogica(etiquetasver, etiquetasfal, codigo, null, null, encabezado);
                } else {
                    this.op1.islogical = true;
                    let traducA = this.op1.TraducirExp(e);
                    let TA = traducA as TraduccionLogica;
                    let indice = VarGlobal.getInstance().contadorTemporales;
                    let etiSa = VarGlobal.getInstance().contadorSaltos;
                    let codigo = ``;
                    codigo += TA.encabezado;
                    codigo += TA.partesuperior;
                    codigo += `goto L${TA.etiquetasFalsas[0].indice};\n`
                    for (let i = 0; i < TA.etiquetasVerdaderas.length; i++) {
                        codigo += TA.etiquetasVerdaderas[i].etiqueta;
                    }
                    codigo += `t${indice}=0;\ngoto L${etiSa};\n`
                    for (let i = 0; i < TA.etiquetasFalsas.length; i++) {
                        codigo += TA.etiquetasFalsas[i].etiqueta;
                    }
                    codigo += `t${indice}=1;\nL${etiSa}:\n`
                    VarGlobal.getInstance().Apilar(indice);
                    if (traducA.ObtenerEtiquetas() != null) {
                        VarGlobal.getInstance().Apilar(traducA.ObtenerEtiquetas()[0].indice);
                    }
                    return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
                }
            } else {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, "No se puede hacer not a ese tipo ", 3));
                return null;
            }
        }
        return null;
    }
}