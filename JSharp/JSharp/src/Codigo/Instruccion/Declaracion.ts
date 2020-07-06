
import { Instruccion } from "./Instruccion";
import { TipoExp, Tipo } from "../Expresion/TipoExp";
import { Identificador } from "../Expresion/Identificador";
import { Expresion } from "../Expresion/Expresion";
import { VarGlobal } from "../Global/VarGlobal";
import { Entorno, TipoEntorno } from "../Entorno/Entorno";
import { Traduccion } from "../3D/Traduccion";
import { Variable } from "../Entorno/Variable";
import { Errores } from "../Reportes/Errores";
import { IdentificadorArray } from "../Expresion/IdentificadorArray";
import { Arreglo } from "../Entorno/Arreglo";

export class Declaracion extends Instruccion {
    tipo: TipoExp;
    id: Identificador[];
    exp: Expresion;
    constructor(t: TipoExp, id: Identificador[], exp: Expresion, linea, columna) {
        super(linea, columna);
        this.tipo = t;
        this.id = id;
        this.exp = exp;
    }
    DeclararFuncion(e: Entorno): Traduccion {
        let codigo = "";
        if (this.tipo.isGlobal()) {
            //asignar valor a global
        } else if (this.tipo.isConst()) {
            return this.TraducirFuncionDeclaracionValorCONST(e);
        } else if (this.tipo.isVar()) {
            return this.TraducirFuncionDeclarionValorVAR(e);
        } else {
            if (this.exp != null) {
                //declaracion con valor
                return this.TraducirFuncionDeclarionValor(e);
            } else {
                return this.TraducirFuncionDeclaracionSinValor(e);
            }
        }
        return null;
    }
    TraducirFuncionDeclaracionValorCONST(e: Entorno) {
        let codigo = "";
        let tipoexp: TipoExp = this.exp.GetTipo(e);
        //          console.log(tipoexp);
        if (tipoexp == null) { return null; }
        let valor = this.exp.TraducirExp(e);
        //            console.log(valor);
        if (valor == null) { return null }
        for (let i = 0; i < this.id.length; i++) {
            let value: Identificador = this.id[i];
            if (e.existeEntorno(value.val)) {
                VarGlobal.getInstance().lErrores.push(new Errores(this.linea, this.columna, "Variable declarada " + value.val, 3));
                return null;
            } else {
                let nueva = new Variable(value.val, Tipo.CONST, TipoEntorno.FUNCION, tipoexp, this.linea, this.columna);
                codigo += valor.ObtenerCodigo();
                let indice = e.GetPosicionStackVar();
                nueva.setRef(indice);
                e.insertar(nueva, value.val);
                let indiceP = VarGlobal.getInstance().contadorTemporales;
                codigo += `t${indiceP}=P+${indice};\n`;
                codigo += `Stack[t${indiceP}]=${valor.ObtenerEtiquetas()[0].etiqueta};\n`;
                e.correlativovar++;
            }
        }
        return new Traduccion([], codigo);
    }
    TraducirFuncionDeclaracionSinValor(e: Entorno) {
        let codigo = "";
        for (let i = 0; i < this.id.length; i++) {
            let value = this.id[i] as Identificador;
            if (e.existeEntorno(value.val)) {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `Variable ya declarada`, 3));
                return null;
            } else {
                let nueva = new Variable(value.val, Tipo.NORMAL, TipoEntorno.FUNCION, this.tipo, this.linea, this.columna);
                let indice = e.GetPosicionStackVar();
                nueva.setRef(indice * -1);
                e.insertar(nueva, value.val);
                let indiceP = VarGlobal.getInstance().contadorTemporales;
                codigo += `t${indiceP}=P+${indice};\n`
                codigo += `Stack[t${indiceP}]=-1;\n`
                e.correlativovar++;
            }
        }
        return new Traduccion([], codigo);
    }
    TraducirFuncionDeclarionValor(e: Entorno) {
        let codigo = "";
        let tipoexp: TipoExp = this.exp.GetTipo(e);
        //          console.log(tipoexp);
        if (tipoexp == null) { return null; }
        let valor = this.exp.TraducirExp(e);
        //            console.log(valor);
        if (valor == null) { return null }
        for (let i = 0; i < this.id.length; i++) {
            let value: Identificador = this.id[i];
            if (e.existeEntorno(value.val)) {
                VarGlobal.getInstance().lErrores.push(new Errores(this.linea, this.columna, "Variable declarada " + value.val, 3));
                return null;
            } else {
                if (tipoexp.sonCompatibles(this.tipo)) {
                    //cambio de tipo por si se cambia
                    tipoexp.tipo = this.tipo.tipo;
                    tipoexp.estructname = this.tipo.estructname;
                    let nueva = new Variable(value.val, Tipo.NORMAL, TipoEntorno.FUNCION, tipoexp, this.linea, this.columna);

                    codigo += valor.ObtenerCodigo();
                    //agregamos el codigo de la variable
                    //obtenemos el indice de la variable
                    let indice = e.GetPosicionStackVar();
                    //  e.getPos();
                    nueva.setRef(indice);
                    e.insertar(nueva, value.val);
                    let indiceP = VarGlobal.getInstance().contadorTemporales;
                    /*let indiceP1 = VarGlobal.getInstance().contadorTemporales;
                    let indiceP2 = VarGlobal.getInstance().contadorTemporales;
                    let indiceP3 = VarGlobal.getInstance().contadorTemporales;*/
                    codigo += `t${indiceP}=P+${indice};\n`;
                    codigo += `Stack[t${indiceP}]=${valor.ObtenerEtiquetas()[0].etiqueta};\n`;

                    /*codigo += `t${indiceP1}=P+${indice+1};\n`;
                    codigo += `Stack[t${indiceP}]=${valor.ObtenerEtiquetas()[0].etiqueta};\n`;*/

                    //guarda global
                    //gruardar ref-valor
                    //tipo
                    e.correlativovar++;
                } else {
                    VarGlobal.getInstance().lErrores.push(new Errores(this.linea, this.columna, "Variable incompatible de tipo " + value.val, 3))
                    console.log(VarGlobal.getInstance().lErrores)
                    return null;
                }
            }
        }
        return new Traduccion([], codigo);
    }
    TraducirFuncionDeclarionValorVAR(e: Entorno) {
        let codigo = "";
        let tipoexp: TipoExp = this.exp.GetTipo(e);
        //          console.log(tipoexp);
        if (tipoexp == null) { return null; }
        let valor = this.exp.TraducirExp(e);
        //            console.log(valor);
        if (valor == null) { return null }
        for (let i = 0; i < this.id.length; i++) {
            let value: Identificador = this.id[i];
            if (e.existeEntorno(value.val)) {
                VarGlobal.getInstance().lErrores.push(new Errores(this.linea, this.columna, "Variable declarada " + value.val, 3));
                return null;
            } else {
                let nueva = new Variable(value.val, Tipo.NORMAL, TipoEntorno.FUNCION, tipoexp, this.linea, this.columna);
                codigo += valor.ObtenerCodigo();
                let indice = e.GetPosicionStackVar();
                nueva.setRef(indice);
                e.insertar(nueva, value.val);
                let indiceP = VarGlobal.getInstance().contadorTemporales;
                codigo += `t${indiceP}=P+${indice};\n`;
                codigo += `Stack[t${indiceP}]=${valor.ObtenerEtiquetas()[0].etiqueta};\n`;
                e.correlativovar++;
            }
        }
        return new Traduccion([], codigo);
    }
    TraducirInstruccion(e: import("../Entorno/Entorno").Entorno): Traduccion {
        //dividimos las variables en las globales
        //entorno global ya que es la primera
        let codigo = "";
        if (this.tipo.isGlobal()) {
            //globales solo tienen una
            let id = this.id[0];
            if (e.existeGlobal(id.val)) {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, "Variable global ya declarada", 3));
                return null;
            }
            let tipo = this.exp.GetTipo(e);
            if (tipo == null) { return null; }
            let exp = this.exp.TraducirExp(e);
            if (exp == null) { return }
            let nueva = new Variable(id.val, Tipo.GLOBAL, TipoEntorno.GLOBAL, tipo, this.linea, this.columna);
            nueva.setRef(e.getPos());
            e.insertar(nueva, id.val);
            codigo += exp.ObtenerCodigo();
            //agregamos el codigo de la variable
            let indice = VarGlobal.getInstance().contadorTemporales;
            codigo += `t${indice}=H;\n`;
            nueva.setRef(indice);
            codigo += `Heap[t${indice}]=${exp.ObtenerEtiquetas()[0].etiqueta};\n`
            codigo += "H=H+1;\n"
        } else if (this.tipo.isVar()) {
            let id = this.id[0];
            if (e.existeGlobal(id.val)) {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, "Variable global ya declarada " + id.val, 3));
                return null;
            }
            let tipo = this.exp.GetTipo(e);
            if (tipo == null) { return null; }
            let exp = this.exp.TraducirExp(e);
            if (exp == null) { return }
            let nueva = new Variable(id.val, Tipo.VAR, TipoEntorno.GLOBAL, tipo, this.linea, this.columna);
            nueva.setRef(e.getPos());
            e.insertar(nueva, id.val);
            codigo += exp.ObtenerCodigo();
            //agregamos el codigo de la variable
            let indice = VarGlobal.getInstance().contadorTemporales;
            codigo += `t${indice}=H;\n`;
            nueva.setRef(indice);
            codigo += `Heap[t${indice}]=${exp.ObtenerEtiquetas()[0].etiqueta};\n`
            codigo += "H=H+1;\n"
        } else if (this.tipo.isConst()) {
            let id = this.id[0];
            if (e.existeGlobal(id.val)) {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, "Variable global ya declarada " + id.val, 3));
                return null;
            }
            let tipo = this.exp.GetTipo(e);
            if (tipo == null) { return null; }
            let exp = this.exp.TraducirExp(e);
            if (exp == null) { return }
            let nueva = new Variable(id.val, Tipo.CONST, TipoEntorno.GLOBAL, tipo, this.linea, this.columna);
            nueva.setRef(e.getPos());
            e.insertar(nueva, id.val);
            codigo += exp.ObtenerCodigo();
            //agregamos el codigo de la variable
            let indice = VarGlobal.getInstance().contadorTemporales;
            codigo += `t${indice}=H;\n`;
            nueva.setRef(indice);
            codigo += `Heap[t${indice}]=${exp.ObtenerEtiquetas()[0].etiqueta};\n`
            codigo += "H=H+1;\n"
        } else if (this.tipo.isEstruct()) {
            //la logica de los struct
        } else {
            //parte en donde se declara 
            return this.Declarar2(e);
        }
        return new Traduccion([], codigo);
    }
    private Declarar2(e: Entorno): Traduccion {
        let codigo = "";
        if (this.exp == null) {
            //variables sin valor
            let tipo = this.tipo;
            let contador = 0;
            for (let i = 0; i < this.id.length; i++) {
                //debugger;
                if (this.tipo.isArray()) {
                    let value = this.id[i] as Identificador;
                    if (e.existeGlobal(value.val)) {
                        VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, "Variable global ya declarada " + value.val, 3));
                        return null;
                    } else {
                        //let tipoarray = new TipoExp(Tipo.ARRAY, '');
                        let nueva = new Arreglo(value.val, Tipo.NORMAL, TipoEntorno.GLOBAL, this.tipo, this.linea, this.columna);
                        let indice = VarGlobal.getInstance().contadorTemporales;
                        codigo += `t${indice}=H;\n`
                        codigo += `H=H+1;\n`
                        e.getPos();
                        nueva.ref = -1 * indice;
                        e.insertar(nueva, value.val);
                        contador++;
                    }
                } else {
                    let value: Identificador = this.id[i];
                    if (e.existeGlobal(value.val)) {
                        VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, "Variable global ya declarada " + value.val, 3));
                        return null;
                    } else {
                        let nueva = new Variable(value.val, Tipo.NORMAL, TipoEntorno.GLOBAL, tipo, this.linea, this.columna);
                        let indice = VarGlobal.getInstance().contadorTemporales;
                        codigo += `t${indice}=H;\n`
                        codigo += `H=H+1;\n`
                        e.getPos();
                        nueva.setRef(-1 * indice);
                        e.insertar(nueva, value.val);
                        // let indice = VarGlobal.getInstance().contadorTemporales;
                        //codigo+=`t${indice}=H;\n`
                        //codigo+=`H=H+1;\n`
                        contador++;
                    }
                }
            }
            codigo += `H=H+${contador};\n`

        } else {

            let tipoexp: TipoExp = this.exp.GetTipo(e);
            //          console.log(tipoexp);
            if (tipoexp == null) { return null; }
            let valor = this.exp.TraducirExp(e);
            //            console.log(valor);
            if (valor == null) { return null }
            for (let i = 0; i < this.id.length; i++) {
                if (this.tipo.isArray()) {

                    let indicador = this.id[i] as Identificador;

                    if (tipoexp.isArray()) {
                        if (!tipoexp.sonCompatibles(this.tipo)) {
                            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `El tipo no es el mismo del array`, 3));
                            return null;
                        }

                        codigo += valor.ObtenerCodigo();
                        //  let tam = valor.ObtenerEtiquetas()[1];
                        //let pos = valor.ObtenerEtiquetas()[0];
                        let nueva = new Arreglo(indicador.val, Tipo.NORMAL, TipoEntorno.GLOBAL, tipoexp, this.linea, this.columna);
                        nueva.ref = e.getPos();
                        e.insertar(nueva, indicador.val);
                        //codigo += valor.ObtenerCodigo();
                        let indice = VarGlobal.getInstance().contadorTemporales;
                        codigo += `t${indice}=H;\n`;
                        nueva.ref = indice;
                        codigo += `Heap[t${indice}]=${valor.ObtenerEtiquetas()[0].etiqueta};\n`
                        codigo += "H=H+1;\n"
                    } else {
                        VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `El valor no es un arreglo`, 3))
                        return null;
                    }

                } else {
                    let value: Identificador = this.id[i];
                    if (e.existeGlobal(value.val)) {
                        VarGlobal.getInstance().lErrores.push(new Errores(this.linea, this.columna, "Variable global ya declarada " + value.val, 3));
                        return null;
                    } else {
                        if (tipoexp.sonCompatibles(this.tipo)) {

                            //cambio de tipo por si se cambia
                            tipoexp.tipo = this.tipo.tipo;
                            tipoexp.estructname = this.tipo.estructname;
                            let nueva = new Variable(value.val, Tipo.NORMAL, TipoEntorno.GLOBAL, tipoexp, this.linea, this.columna);
                            e.getPos();
                            e.insertar(nueva, value.val);
                            codigo += valor.ObtenerCodigo();
                            //agregamos el codigo de la variable
                            let indice = VarGlobal.getInstance().contadorTemporales;
                            codigo += `t${indice}=H;\n`;
                            nueva.setRef(indice);
                            //debugger;
                            codigo += `Heap[t${indice}]=${valor.ObtenerEtiquetas()[0].etiqueta};\n`
                            codigo += "H=H+1;\n"
                            if (tipoexp.esCadena()) {
                                nueva.setRef(indice);
                            }
                        } else {
                            VarGlobal.getInstance().lErrores.push(new Errores(this.linea, this.columna, "Variable incompatible de tipo " + value.val, 3))
                            console.log(VarGlobal.getInstance().lErrores)
                            return null;
                        }
                    }
                }

            }
        }
        return new Traduccion([], codigo);
    }

    public GenerarNodo(padre: number) {
        let indiceDec = VarGlobal.getInstance().contadorGrafo;
        let indiceTipo = VarGlobal.getInstance().contadorGrafo;

        let codigo = []
        let enlace = []
        codigo.push({ data: { id: `${indiceDec}`, name: 'DECLARACION', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        codigo.push({ data: { id: `${indiceTipo}`, name: `TIPO{${this.tipo.toString()}}`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indiceDec}`, faveColor: '#6FB1FC', strength: 90 } })
        enlace.push({ data: { source: `${indiceDec}`, target: `${indiceTipo}`, faveColor: '#6FB1FC', strength: 90 } })
        for (let i = 0; i < this.id.length; i++) {
            let cad = this.id[i].GenerarNodo(indiceDec);
            let json = JSON.parse(cad.toString());
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        }

        if (this.exp != null) {
            let cad = this.exp.GenerarNodo(indiceDec);
            let json = JSON.parse(cad);
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }
}