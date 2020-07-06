import { Operacion } from './Operacion';
import { Entorno } from '../Entorno/Entorno';
import { Expresion } from '../Expresion/Expresion';
import { Signo } from './Signo';
import { VarGlobal } from '../Global/VarGlobal';
import { Traduccion } from '../3D/Traduccion';
import { TipoExp, Tipo } from '../Expresion/TipoExp';
import { Errores } from '../Reportes/Errores';
import { Etiqueta } from '../3D/Etiqueta';
import { TraduccionLogica } from '../3D/TraduccionLogica';

export class Aritmetica extends Operacion {

    GetTipo(e: Entorno): TipoExp {
        return this.maxTipo(e);
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
    constructor(op1: Expresion, op2: Expresion, s: Signo, linea: number, columna: number) {
        super(op1, op2, s, linea, columna);
    }
    TraducirExp(e: Entorno): Traduccion {
        let codigo = "";
        let tipoA = this.op1.GetTipo(e);
        let tipoB = this.op2.GetTipo(e);
        if (tipoA == null || tipoB == null) { return null; }
        let traducA = this.op1.TraducirExp(e);
        let traducB = this.op2.TraducirExp(e);
        if (traducA == null || traducB == null) { return null; }
        let tipomax = this.maxTipo(e);
        if (tipomax == null) { return null; }
        if (tipomax.esCadena()) {
            //regla de cadenas
            if (this.op == Signo.SUMA) {
                //evaluar que tipo es cada uno
                if (tipoA.esCadena()) {
                    codigo += traducA.ObtenerCodigo();
                    codigo += traducB.ObtenerCodigo();
                    let indice = VarGlobal.getInstance().contadorTemporales;
                    let etiquetaA = traducA.ObtenerEtiquetas();
                    let etiquetaB = traducB.ObtenerEtiquetas();
                    if (tipoB.esCadena()) {
                        codigo += `t1=t${etiquetaA[0].indice};\n`
                        codigo += `t2=t${etiquetaB[0].indice};\n`
                        codigo += "call marvin_201602520_SumarCadena;\n"
                        codigo += `t${indice}=t0;\n`
                        VarGlobal.getInstance().Apilar(indice);
                        VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                        VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                        return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
                    } else if (tipoB.isBoolean()) {
                        let indice2 = VarGlobal.getInstance().contadorTemporales;
                        codigo += `t0=t${etiquetaB[0].indice};\n`;
                        codigo += "call marvin_201602520_ConvertirBooleanoString;\n";
                        codigo += `t${indice}=t0;\n`
                        //parte en donde se suman
                        codigo += `t1=t${etiquetaA[0].indice};\n`
                        codigo += `t2=t${indice};\n`
                        codigo += "call marvin_201602520_SumarCadena;\n"
                        codigo += `t${indice2}=t0;\n`
                        VarGlobal.getInstance().Apilar(indice);
                        VarGlobal.getInstance().Apilar(indice2);
                        VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                        VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                        return new Traduccion([new Etiqueta(`t${indice2}`, indice2)], codigo);
                    } else if (tipoB.isInteger()) {
                        codigo += `t0=t${etiquetaB[0].indice};\n`;
                        codigo += "call marvin_201602520_ConvertirIntegertoString;\n"
                        codigo += `t${indice}=t0;\n`;
                        codigo += `call marvin_201602520_CambiarNumeroAscii;\n`
                        codigo += `t${indice}=t0;\n`;
                        let indice2 = VarGlobal.getInstance().contadorTemporales;
                        codigo += `t1=t${etiquetaA[0].indice};\n`;
                        codigo += `t2=t${indice};\n`;
                        codigo += "call marvin_201602520_SumarCadena;\n"
                        codigo += `t${indice2}=t0;\n`
                        VarGlobal.getInstance().Apilar(indice);
                        VarGlobal.getInstance().Apilar(indice2);
                        VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                        VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                        return new Traduccion([new Etiqueta(`t${indice2}`, indice2)], codigo);
                    }else if(tipoB.isDouble()){
                        codigo += `t0=t${etiquetaB[0].indice};\n`;
                        codigo += "call marvin_201602520_DoubleToString;\n"
                        codigo += `t${indice}=t0;\n`;
                        let indice2 = VarGlobal.getInstance().contadorTemporales;
                        codigo += `t1=t${etiquetaA[0].indice};\n`;
                        codigo += `t2=t${indice};\n`;
                        codigo += "call marvin_201602520_SumarCadena;\n"
                        codigo += `t${indice2}=t0;\n`
                        VarGlobal.getInstance().Apilar(indice2);
                        VarGlobal.getInstance().Apilar(indice);
                        VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                        VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                        return new Traduccion([new Etiqueta(`t${indice2}`, indice2)], codigo);
                    }
                } else if (tipoB.esCadena()) {
                    codigo += traducA.ObtenerCodigo();
                    codigo += traducB.ObtenerCodigo();
                    let indice = VarGlobal.getInstance().contadorTemporales;
                    let etiquetaA = traducA.ObtenerEtiquetas();
                    let etiquetaB = traducB.ObtenerEtiquetas();
                    if (tipoA.esCadena()) {
                        codigo += `t1=t${etiquetaA[0].indice};\n`
                        codigo += `t2=t${etiquetaB[0].indice};\n`
                        codigo += "call marvin_201602520_SumarCadena;\n"
                        codigo += `t${indice}=t0;\n`
                        VarGlobal.getInstance().Apilar(indice);
                        VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                        VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                        return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
                    } else if (tipoA.isBoolean()) {
                        let indice2 = VarGlobal.getInstance().contadorTemporales;
                        codigo += `t0=t${etiquetaA[0].indice};\n`;
                        codigo += "call marvin_201602520_ConvertirBooleanoString;\n";
                        codigo += `t${indice}=t0;\n`

                        //parte en donde se suman
                        codigo += `t2=t${etiquetaB[0].indice};\n`
                        codigo += `t1=t${indice};\n`
                        codigo += "call marvin_201602520_SumarCadena;\n"
                        codigo += `t${indice2}=t0;\n`
                        VarGlobal.getInstance().Apilar(indice);
                        VarGlobal.getInstance().Apilar(indice2);
                        VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                        VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                        return new Traduccion([new Etiqueta(`t${indice2}`, indice2)], codigo);
                    } else if (tipoA.isInteger()) {
                        codigo += `t0=t${etiquetaA[0].indice};\n`;
                        codigo += "call marvin_201602520_ConvertirIntegertoString;\n"
                        codigo += `t${indice}=t0;\n`;
                        codigo += `call marvin_201602520_CambiarNumeroAscii;\n`
                        codigo += `t${indice}=t0;\n`;
                        let indice2 = VarGlobal.getInstance().contadorTemporales;
                        codigo += `t2=t${etiquetaB[0].indice};\n`;
                        codigo += `t1=t${indice};\n`;
                        codigo += "call marvin_201602520_SumarCadena;\n"
                        codigo += `t${indice2}=t0;\n`
                        VarGlobal.getInstance().Apilar(indice);
                        VarGlobal.getInstance().Apilar(indice2);
                        VarGlobal.getInstance().Apilar(etiquetaA[0].indice);
                        VarGlobal.getInstance().Apilar(etiquetaB[0].indice);
                        return new Traduccion([new Etiqueta(`t${indice2}`, indice2)], codigo);
                    }
                }
            } else {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, "Las cadenas no se pueden operar con esos operadores", 3));
                return null;
            }
        } else {
            //console.log('yea')
            codigo += traducA.ObtenerCodigo();
            codigo += traducB.ObtenerCodigo();
            let indice = VarGlobal.getInstance().contadorTemporales;
            let etiquetaA = traducA.ObtenerEtiquetas();
            let etiquetaB = traducB.ObtenerEtiquetas();
            if (this.op1.GetTipo(e).isChar()) {
                //quiere decir que es char y lo tenemos que sacar del heap
                let taux = VarGlobal.getInstance().contadorTemporales;
                codigo += `t${taux}=${etiquetaA[0].etiqueta};\n`;
                codigo += `${etiquetaA[0].etiqueta}=Heap[t${taux}];\n`
            }
            if (this.op2.GetTipo(e).isChar()) {
                let taux = VarGlobal.getInstance().contadorTemporales;
                codigo += `t${taux}=${etiquetaB[0].etiqueta};\n`;
                codigo += `${etiquetaB[0].etiqueta}=Heap[t${taux}];\n`
            }
            if (this.op == Signo.SUMA) {
                codigo += `t${indice}=${etiquetaA[0].etiqueta}+${etiquetaB[0].etiqueta};\n`
                VarGlobal.getInstance().Apilar(indice);
                VarGlobal.getInstance().Apilar(etiquetaA[0].indice)
                VarGlobal.getInstance().Apilar(etiquetaB[0].indice)
                return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
            } else if (this.op == Signo.RESTA) {
                VarGlobal.getInstance().Apilar(indice);
                codigo += `t${indice}=${etiquetaA[0].etiqueta}-${etiquetaB[0].etiqueta};\n`
                VarGlobal.getInstance().Apilar(indice);
                VarGlobal.getInstance().Apilar(etiquetaA[0].indice)
                VarGlobal.getInstance().Apilar(etiquetaB[0].indice)
                return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
            } else if (this.op == Signo.MULTIPLICACION) {
                codigo += `t${indice}=${etiquetaA[0].etiqueta}*${etiquetaB[0].etiqueta};\n`
                VarGlobal.getInstance().Apilar(indice);
                VarGlobal.getInstance().Apilar(etiquetaA[0].indice)
                VarGlobal.getInstance().Apilar(etiquetaB[0].indice)
                return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
            } else if (this.op == Signo.DIVISION) {
                let Lno = VarGlobal.getInstance().contadorSaltos;
                let lSalida = VarGlobal.getInstance().contadorSaltos;
                codigo += `if (${etiquetaB[0].etiqueta}<>0) goto L${Lno};\nE=1;\ngoto L${lSalida};\nL${Lno}:\n`
                codigo += `t${indice}=${etiquetaA[0].etiqueta}/${etiquetaB[0].etiqueta};\n`
                codigo += `L${lSalida}:\n`
                VarGlobal.getInstance().Apilar(indice);
                VarGlobal.getInstance().Apilar(etiquetaA[0].indice)
                VarGlobal.getInstance().Apilar(etiquetaB[0].indice)
                return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
            } else if (this.op == Signo.MODULO) {
                codigo += `t${indice}=${etiquetaA[0].etiqueta}%${etiquetaB[0].etiqueta};\n`
                VarGlobal.getInstance().Apilar(indice);
                VarGlobal.getInstance().Apilar(etiquetaA[0].indice)
                VarGlobal.getInstance().Apilar(etiquetaB[0].indice)
                return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
            } else if (this.op == Signo.POTENCIA) {
                //esta pisado la potencia   
                if (tipoA.isBoolean() && tipoB.isBoolean()) {
                    this.op1.islogical = true;
                    this.op2.islogical = true;
                    let a = this.op1.TraducirExp(e);
                    let b = this.op2.TraducirExp(e);
                    return this.TraducirXOR(a, b);
                }
                let indice = VarGlobal.getInstance().contadorTemporales;
                codigo += `t1=${etiquetaA[0].etiqueta};\n`;
                codigo += `t2=${etiquetaB[0].etiqueta};\n`;
                codigo += "call marvin_201602520_Potencia;\n"
                codigo += `t${indice}=t0;\n`;
                VarGlobal.getInstance().Apilar(indice);
                VarGlobal.getInstance().Apilar(etiquetaA[0].indice)
                VarGlobal.getInstance().Apilar(etiquetaB[0].indice)
                return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo);
            }
        }
        return null;
    }
    private maxTipo(e: Entorno): TipoExp {
        switch (this.op) {
            case Signo.SUMA:
                return this.ReglasSuma(e);
            case Signo.RESTA:
                return this.ReglasResta(e);
            case Signo.MULTIPLICACION:
                return this.ReglasResta(e);
            case Signo.DIVISION:
                return this.ReglasResta(e);
            case Signo.MODULO:
                return this.ReglasPotencia(e);
            case Signo.POTENCIA:
                return this.ReglasPotencia(e);

        }
        return null;
    }
    private ReglasPotencia(e: Entorno): TipoExp {
        let tipoA = this.op1.GetTipo(e);
        let tipoB = this.op2.GetTipo(e);
        if (tipoA == null || tipoB == null) { return null; }
        if (tipoA.isInteger() && tipoB.isInteger()) {
            console.log('EEEEe')
            return new TipoExp(Tipo.INTEGER, null)
        } else if (tipoA.isBoolean() && tipoB.isBoolean()) {
            return new TipoExp(Tipo.BOOLEAN, null);
        }
        let nuevo = new Errores(this.linea, this.columna, `No se pueden hacer esa operacion con ${this.op} ese tipo de objetos`, 3);
        VarGlobal.getInstance().agregarError(nuevo);
        return null;
    }
    TraducirXOR(tradA: Traduccion, tradB: Traduccion): Traduccion {
        let A = tradA as TraduccionLogica;
        let B = tradB as TraduccionLogica;
        if (this.islogical == false) {
            let codigo = ``;
            codigo += A.encabezado;
            codigo += B.encabezado;
            codigo += A.partesuperior;
            codigo += `goto L${A.etiquetasFalsas[0].indice};\n`;
            codigo += A.etiquetasFalsas[0].etiqueta;
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
            debugger;
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
            etifalsa=etifalsa.concat(B.etiquetasFalsas)
            return new TraduccionLogica(etiverda, etifalsa, codigo, null, null, encabezado);
        }
    }
    private ReglasSuma(e: Entorno): TipoExp {
        let tipoa = this.op1.GetTipo(e);
        let tipob = this.op2.GetTipo(e);
        if (tipoa == null || tipob == null) { return null; }
        if (tipoa.isEstruct() || tipob.isEstruct()) {
            //Es un error
            let nuevo = new Errores(this.linea, this.columna, "No se pueden sumar ese tipo de objetos", 3);
            VarGlobal.getInstance().agregarError(nuevo);
            return null;
        } else if (tipoa.isString() || tipob.isString()) {
            return new TipoExp(Tipo.STRING, null);
        } else if (tipoa.isInteger()) {
            if (tipob.isInteger()) {
                return new TipoExp(Tipo.INTEGER, null);
            } else if (tipob.isDouble()) {
                return new TipoExp(Tipo.DOUBLE, null)
            } else if (tipob.isChar()) {
                return new TipoExp(Tipo.INTEGER, null);
            }
        } else if (tipoa.isDouble()) {
            if (tipob.esNumero()) {
                return new TipoExp(Tipo.DOUBLE, null);
            } else if (tipob.isChar()) {
                return new TipoExp(Tipo.DOUBLE, null);
            }
        } else if (tipoa.isChar()) {
            if (tipob.isChar()) {
                return new TipoExp(Tipo.STRING, null);
            } else if (tipob.isDouble()) {
                return new TipoExp(Tipo.DOUBLE, null);
            } else if (tipob.isInteger()) {
                return new TipoExp(Tipo.INTEGER, null);
            }
        } else if (tipoa.isBoolean()) {
            if (tipob.isBoolean()) {
                if (this.op == Signo.POTENCIA) {
                    return new TipoExp(Tipo.BOOLEAN, null);
                }
            }
        }
        let nuevo = new Errores(this.linea, this.columna, `No se pueden hacer esa operacion con ${this.op} ese tipo de objetos`, 3);
        VarGlobal.getInstance().agregarError(nuevo);
        return null;
    }
    private ReglasResta(e: Entorno): TipoExp {
        let tipoA = this.op1.GetTipo(e);
        let tipoB = this.op2.GetTipo(e);
        if (tipoA == null || tipoB == null) { return null; }
        if (tipoA.isInteger()) {
            if (tipoB.isInteger()) {
                return new TipoExp(Tipo.INTEGER, null);
            } else if (tipoB.isDouble()) {
                return new TipoExp(Tipo.DOUBLE, null);
            } else if (tipoB.isChar()) {
                return new TipoExp(Tipo.INTEGER, null);
            }
        } else if (tipoA.isDouble()) {
            if (tipoB.isChar()) {
                return new TipoExp(Tipo.DOUBLE, null);
            } else if (tipoB.esNumero()) {
                return new TipoExp(Tipo.DOUBLE, null);
            }
        } else if (tipoA.isChar()) {
            if (tipoB.isInteger()) {
                return new TipoExp(Tipo.INTEGER, null);
            } else if (tipoB.isDouble()) {
                return new TipoExp(Tipo.DOUBLE, null);
            } else if (tipoB.isChar()) {
                return new TipoExp(Tipo.INTEGER, null);
            }
        }
        let nuevo = new Errores(this.linea, this.columna, `No se pueden hacer esa operacion con ${this.op} ese tipo de objetos`, 3);
        VarGlobal.getInstance().agregarError(nuevo);
        return null;
    }
}