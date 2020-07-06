import { Expresion } from "./Expresion";
import { Signo } from "../Operaciones/Signo";
import { Traduccion } from "../3D/Traduccion";
import { Operacion } from "../Operaciones/Operacion";
import { VarGlobal } from "../Global/VarGlobal";
import { TipoExp, Tipo } from "./TipoExp";
import { Errores } from "../Reportes/Errores";
import { TraduccionLogica } from "../3D/TraduccionLogica";
import { Etiqueta } from "../3D/Etiqueta";

export class Logica extends Operacion {
    exp1: Expresion;
    exp2: Expresion;
    signo: Signo;
    constructor(exp1, exp2, signo, linea, columna) {
        super(exp1, exp2, signo, linea, columna);
    }
    GetTipo(e: import("../Entorno/Entorno").Entorno): import("./TipoExp").TipoExp {
        return new TipoExp(Tipo.BOOLEAN, null);
    }

    TraducirExp(e: import("../Entorno/Entorno").Entorno): Traduccion {
        let tipoA = this.op1.GetTipo(e);
        let tipoB = this.op2.GetTipo(e);
        if (tipoA == null || tipoB == null) { return null; }

        if (tipoA.isBoolean() && tipoB.isBoolean()) {

            this.op1.islogical = true;
            this.op2.islogical = true;
            //debugger;
            let tradA = this.op1.TraducirExp(e);
            let tradB = this.op2.TraducirExp(e);
            if (tradA == null || tradB == null) { return null; }
            if (this.op == Signo.OR) {
                return this.TraducirOR(tradA, tradB);
            } else if (this.op == Signo.AND) {
                return this.TraducirAND(tradA, tradB);
            } else if (this.op == Signo.POTENCIA) {
                return this.TraducirXOR(tradA, tradB);
            }
        } else {
            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, "No sepude hacer ese tipo de operacion logica", 3));
            return null;
        }
    }

    TraducirXOR(tradA: Traduccion, tradB: Traduccion): Traduccion {
        let A = tradA as TraduccionLogica;
        let B = tradB as TraduccionLogica;
        debugger;
        if (this.islogical == false) {
            let codigo = ``;
            codigo += A.encabezado;
            codigo += B.encabezado;
            codigo += A.partesuperior;
            codigo += `goto L${A.etiquetasFalsas[0].indice};\n`;
            codigo += A.etiquetasFalsas[0].indice;
            codigo += B.partesuperior;
            codigo += `goto L${B.etiquetasFalsas[0].indice};\n`;
            codigo += A.etiquetasVerdaderas[0].etiqueta;
            let indiceb = VarGlobal.getInstance().contadorSaltos;
            let cadaux = B.partesuperior.replace(`L${B.etiquetasVerdaderas[0].indice}`, `L${indiceb}`);
            codigo += cadaux;
            let indicebF = VarGlobal.getInstance().contadorSaltos;
            codigo += `goto L${indicebF};\n`;
            codigo += B.etiquetasVerdaderas[0].etiqueta;
            codigo += `L${indicebF}:\n`;
            let inidt = VarGlobal.getInstance().contadorTemporales;
            codigo += `t${inidt}=1;\n`;
            let salida = VarGlobal.getInstance().contadorSaltos;
            codigo += `goto L${salida};\n`;
            codigo += `L${indiceb}:\n`;
            codigo += B.etiquetasFalsas[0].etiqueta;
            codigo += `t${inidt}=0;\n`;
            codigo += `L${salida}:\n`;
            VarGlobal.getInstance().Apilar(inidt);
            return new Traduccion([new Etiqueta(`t${inidt}`, inidt)], codigo);
        } else {
            let encabezado = ``;
            let codigo = ``;
            let etiquetanueva = VarGlobal.getInstance().contadorSaltos;
            encabezado += A.encabezado;
            encabezado += B.encabezado;
            codigo += A.partesuperior
            codigo += `goto L${A.etiquetasFalsas[0].indice};\n`
            for (let i = 0; i < A.etiquetasFalsas.length; i++) {
                codigo += A.etiquetasFalsas[i].etiqueta
            }

            //codigo+=A.etiquetasFalsas[0].etiqueta
            codigo += B.partesuperior;
            codigo += `goto L${B.etiquetasFalsas[0].indice};\n`

            for (let i = 0; i < A.etiquetasVerdaderas.length; i++) {
                codigo += A.etiquetasVerdaderas[i].etiqueta
            }
            codigo += B.partesuperior.replace('L' + B.etiquetasVerdaderas[0].indice, `L${etiquetanueva}`)
            let Nueva = new Etiqueta(`L${etiquetanueva}:\n`, etiquetanueva)
            let etiverda = []
            for (let i = 0; i < B.etiquetasVerdaderas.length; i++) {
                //codigo+=B.etiquetasVerdaderas[i].etiqueta
                etiverda.push(B.etiquetasVerdaderas[i])
            }
            let etifalsa = []
            etifalsa.push(Nueva)
            etifalsa = etifalsa.concat(B.etiquetasFalsas)
            return new TraduccionLogica(etiverda, etifalsa, codigo, null, null, encabezado);
        }
    }
    TraducirAND(tradA: Traduccion, tradB: Traduccion): Traduccion {
        let A = tradA as TraduccionLogica;
        let B = tradB as TraduccionLogica;
        if (this.islogical == false) {
            let codigo = ``;
            codigo += A.encabezado;
            codigo += B.encabezado;
            codigo += A.partesuperior;
            codigo += `goto L${A.etiquetasFalsas[0].indice};\n`;
            codigo += A.etiquetasVerdaderas[0].etiqueta;
            codigo += B.partesuperior;
            codigo += `goto L${B.etiquetasFalsas[0].indice};\n`;
            codigo += B.etiquetasVerdaderas[0].etiqueta;
            let indice = VarGlobal.getInstance().contadorTemporales;
            let salida = VarGlobal.getInstance().contadorSaltos;
            codigo += `t${indice}=1;\n`;
            codigo += `goto L${salida};\n`
            for (let i = 0; i < A.etiquetasFalsas.length; i++) {
                codigo += A.etiquetasFalsas[i].etiqueta;
            }
            for (let i = 0; i < B.etiquetasFalsas.length; i++) {
                codigo += B.etiquetasFalsas[i].etiqueta;
            }
            codigo += `t${indice}=0;\n`;
            codigo += `L${salida}:\n`
            VarGlobal.getInstance().Apilar(indice);
            return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
        } else {
            let encabezado = ``;
            let codigo = ``;
            encabezado += A.encabezado;
            encabezado += B.encabezado;
            codigo += A.partesuperior
            codigo += `goto L${A.etiquetasFalsas[0].indice};\n`;
            codigo += A.etiquetasVerdaderas[0].etiqueta;
            codigo += B.partesuperior;
            //codigo += `goto L${B.etiquetasFalsas[0].indice};\n`;
            let etiquetasver = [];
            etiquetasver = B.etiquetasVerdaderas;
            let etiquetasfal = [];
            etiquetasfal = B.etiquetasFalsas.concat(A.etiquetasFalsas);
            return new TraduccionLogica(etiquetasver, etiquetasfal, codigo, null, null, encabezado);
        }
    }
    TraducirOR(tradA: Traduccion, tradB: Traduccion): Traduccion {
        let A = tradA as TraduccionLogica;
        let B = tradB as TraduccionLogica;
        //console.log(this.islogical);
        if (this.islogical == false) {
            //se traduce normal
            let codigo = ``;
            codigo += A.encabezado;
            codigo += B.encabezado;
            codigo += A.partesuperior;
            codigo += `goto L${A.etiquetasFalsas[0].indice};\n`;
            codigo += A.etiquetasFalsas[0].etiqueta;
            codigo += B.partesuperior;
            codigo += `goto L${B.etiquetasFalsas[0].indice};\n`;
            for (let i = 0; i < A.etiquetasVerdaderas.length; i++) {
                codigo += A.etiquetasVerdaderas[i].etiqueta;
            }
            for (let i = 0; i < B.etiquetasVerdaderas.length; i++) {
                codigo += B.etiquetasVerdaderas[i].etiqueta;
            }

            let indice = VarGlobal.getInstance().contadorTemporales;
            let salida = VarGlobal.getInstance().contadorSaltos;
            codigo += `t${indice}=1;\n`;
            codigo += `goto L${salida};\n`
            for (let i = 1; i < A.etiquetasFalsas.length; i++) {
                codigo += A.etiquetasFalsas[i].etiqueta;
            }
            for (let i = 0; i < B.etiquetasFalsas.length; i++) {
                codigo += B.etiquetasFalsas[i].etiqueta;
            }
            codigo += `t${indice}=0;\n`;
            codigo += `L${salida}:\n`
            VarGlobal.getInstance().Apilar(indice);
            return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
        } else {
            let encabezado = ``;
            let codigo = ``;
            encabezado += A.encabezado;
            encabezado += B.encabezado;
            codigo += A.partesuperior
            codigo += `goto L${A.etiquetasFalsas[0].indice};\n`;
            for (let i = 0; i < A.etiquetasFalsas.length; i++) {
                codigo += A.etiquetasFalsas[i].etiqueta;
            }
            codigo += B.partesuperior;
            //codigo += `goto L${B.etiquetasFalsas[0].indice};\n`;
            let etiquetasver = [];
            etiquetasver = B.etiquetasVerdaderas.concat(A.etiquetasVerdaderas);
            let etiquetasfal = [];
            etiquetasfal = B.etiquetasFalsas;
            return new TraduccionLogica(etiquetasver, etiquetasfal, codigo, null, null, encabezado);
            //codigo += B.etiquetasFalsas[0].etiqueta;
        }
        return null;
    }
    public GenerarNodo(padre: number) {
        let codigo = []
        let enlace = []
        let indice = VarGlobal.getInstance().contadorGrafo;
        let indicesigno = VarGlobal.getInstance().contadorGrafo
        codigo.push({ data: { id: `${indice}`, name: 'EXP', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })

        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })

        let cad = this.op1.GenerarNodo(indice);
        let json = JSON.parse(cad);
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);

        codigo.push({ data: { id: `${indicesigno}`, name: `${this.ObtenerSignoString()}`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${indice}`, target: `${indicesigno}`, faveColor: '#6FB1FC', strength: 90 } })
        cad = this.op2.GenerarNodo(indice);
        json = JSON.parse(cad);
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }

}