import { Instruccion } from "./Instruccion";
import { TipoExp, Tipo } from "../Expresion/TipoExp";
import { Identificador } from "../Expresion/Identificador";
import { Parametros } from "./Parametros";
import { VarGlobal } from "../Global/VarGlobal";
import { Entorno, TipoEntorno } from "../Entorno/Entorno";
import { Errores } from "../Reportes/Errores";
import { Funcion } from "../Entorno/Funcion";
import { Traduccion } from "../3D/Traduccion";
import { Etiqueta } from "../3D/Etiqueta";
import { Declaracion } from "./Declaracion";
import { Expresion } from "../Expresion/Expresion";
import { Nodo } from "../AST/Nodo";
import { Acceso } from "../Expresion/Acceso";
import { Variable } from "../Entorno/Variable";
import { Return } from "../Expresion/Return";


export class DecFuncion implements Instruccion {
    tipo: TipoExp;
    id: Identificador;
    listaParametros: Parametros[];
    instrucciones: Nodo[];
    public CrearFuncion(e: Entorno): boolean {
        //console.log('eeee')
        let llave = this.GenerarLlave();
        //console.log(llave)
        if (e.existeGlobal(`FUNCION_` + llave)) {
            console.log('e')
            let simbolo = e.getSimbolo(`FUNCION_` + llave);
            let funcion = simbolo as Funcion;
            let nombre = this.GenerarNombre(e);
            if (this.ExisteFuncion(funcion, nombre)) {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `Funcion ya declarada ${llave}`, 3));
                return false;
            }
            let aux: DecFuncion = this;
            let nueva = new Funcion(nombre, this.listaParametros, this.tipo, aux, this.linea, this.columna);
            this.InsertarFuncion(funcion, nueva);
            return true;
        } else {
            if (this.ParametrosNoCorrectos()) {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `Funcion con parametros incorrectos `, 3));
                return false;
            }
            let nombre = this.GenerarNombre(e);
            let aux: DecFuncion = this;
            let nueva = new Funcion(nombre, this.listaParametros, this.tipo, aux, this.linea, this.columna);
            e.insertarGlobal(nueva, `FUNCION_` + llave);
            return true;
        }
    }
    InsertarFuncion(fun: Funcion, nueva: Funcion) {
        let a = fun;
        console.log(a);
        while (a.siguiente != null) {
            a = a.siguiente;
        }
        a.siguiente = nueva;
    }
    ExisteFuncion(fun: Funcion, nombre) {
        let a = fun;
        while (a != null) {
            if (a.nombre == nombre) {
                return true;
            }
            a = a.siguiente;
        }
        return false;
    }
    TraducirInstruccion(e: import("../Entorno/Entorno").Entorno): import("../3D/Traduccion").Traduccion {
        let nuevoE = new Entorno(e, TipoEntorno.FUNCION);
        nuevoE.tipoFuncion = this.tipo;
        //debugger;
        if (this.listaParametros != null) {
            for (let i = 0; i < this.listaParametros.length; i++) {
                let aux = this.listaParametros[i];
                let id = aux.id.val;
                let tipo = aux.tipo;
                let vari: Variable = new Variable(id, Tipo.NORMAL, TipoEntorno.FUNCION, tipo, this.linea, this.columna);
                vari.setRef(nuevoE.GetPosicionStackVar());
                nuevoE.insertar(vari, id);
                nuevoE.correlativovar++;
            }
        }
        return this.TraducirFuncion(nuevoE);
    }
    private TraducirFuncion(e: Entorno): Traduccion {
        let codigo = ``;
        let indicesalida = VarGlobal.getInstance().contadorSaltos;
        e.etiquetaSalida = new Etiqueta(`L${indicesalida}:\n`, indicesalida);
        codigo += `proc ${this.GenerarNombre(e)} begin\n`;
        if (this.instrucciones != null) {
            for (let i = 0; i < this.instrucciones.length; i++) {
            
                let aux = this.instrucciones[i];
                if (aux instanceof Declaracion) {
                    let traddec: Traduccion = aux.DeclararFuncion(e);
                    if (traddec == null) { continue; }
                    codigo += traddec.ObtenerCodigo();
                } else if (aux instanceof Expresion) {
                    let traduce: Traduccion = (aux as Expresion).TraducirExp(e);
                    if (traduce == null) { continue; }
                    codigo += traduce.ObtenerCodigo();
                } else if (aux instanceof Acceso) {
                    let trad = (aux as Acceso).TraducirExp(e);
                    if (trad == null) { continue; }
                    codigo += trad.ObtenerCodigo();
                } else if (aux instanceof Return) {
                    let renuevo=new Entorno(e,TipoEntorno.IF);
                    let trad = (aux as Return).TraducirExp(renuevo);
                    if (trad == null) { continue; }
                    codigo += trad.ObtenerCodigo();
                } else if (aux as Instruccion) {
                    let trad = (aux as Instruccion).TraducirInstruccion(e);
                    if (trad == null) { continue; }
                    codigo += trad.ObtenerCodigo();
                }
            }
        }
        codigo += `${e.etiquetaSalida.etiqueta}`;
        codigo += `end\n`
        return new Traduccion(null, codigo);
    }
    ParametrosNoCorrectos(): boolean {
        let nombres = []
        if (this.listaParametros != null) {
            for (let i = 0; i < this.listaParametros.length; i++) {
                let aux: Parametros = this.listaParametros[i];
                if (aux.tipo.isEstruct()) {
                    //cuando son struct
                } else {
                    let par = this.listaParametros[i];
                    if (nombres.includes(par.id.val)) {
                        return true;
                    }
                    nombres.push(par.id.val);
                }
            }
        }
        return false;
    }
    linea: number;
    columna: number;
    isarray: boolean;
    constructor(tipo, identificador, lista, ins, isarray, linea, columna) {
        this.tipo = tipo;
        this.id = identificador;
        this.listaParametros = lista;
        this.instrucciones = ins;
        this.linea = linea;
        this.columna = columna;
        this.isarray = isarray;
    }
    getLinea(): number {
        return this.linea;
    }
    getColumna(): number {
        return this.columna;
    }
    public GenerarLlave(): string {
        let llave = '';
        if (this.tipo.tipo == Tipo.STRUCT) {
            //cuando sean struck
        } else {
            llave += `${this.id.val}`;
        }
        return llave;
    }
    public GenerarLlave2(): string {
        let llave = '';
        if (this.tipo.tipo == Tipo.STRUCT) {
            //cuando sean struck
        } else {
            llave += this.tipo.toString().toLowerCase() + `_${this.id.val}`;
        }
        return llave;
    }
    GenerarNombre(e: Entorno) {
        let cad = ''
        if (this.listaParametros != null) {
            for (let i = 0; i < this.listaParametros.length; i++) {
                let aux = this.listaParametros[i];
                if (aux.tipo.esNumero()) {
                    cad += `NUMERO`;
                } else if (aux.tipo.isEstruct()) {

                } else {
                    cad += aux.tipo.toString();
                }
            }
            return `FUNCION_${this.tipo.toString()}_${this.id.val}_` + cad;
        }
        return `FUNCION_${this.tipo.toString()}_${this.id.val}`;
    }


    public GenerarNodo(padre: number) {
        let indiceDec = VarGlobal.getInstance().contadorGrafo;
        let indiceTipo = VarGlobal.getInstance().contadorGrafo;
        let indiceparametros = VarGlobal.getInstance().contadorGrafo;
        let codigo = []
        let enlace = []
        codigo.push({ data: { id: `${indiceDec}`, name: 'DECLARACIONFUNCION', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        codigo.push({ data: { id: `${indiceTipo}`, name: `TIPO{${this.tipo.toString()}}`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indiceDec}`, faveColor: '#6FB1FC', strength: 90 } })
        enlace.push({ data: { source: `${indiceDec}`, target: `${indiceTipo}`, faveColor: '#6FB1FC', strength: 90 } })
        let json4 = this.id.GenerarNodo(indiceDec);
        let json = JSON.parse(json4);
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        codigo.push({ data: { id: `${indiceparametros}`, name: `Parametros`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${indiceDec}`, target: `${indiceparametros}`, faveColor: '#6FB1FC', strength: 90 } })
        if (this.listaParametros != null) {
            for (let i = 0; i < this.listaParametros.length; i++) {
                let cad = this.listaParametros[i].ConstruirNodo(indiceparametros);
                let json = JSON.parse(cad.toString());
                codigo = codigo.concat(json.nodo);
                enlace = enlace.concat(json.enlace);
            }
        }
        //console.log(this.instrucciones);
        let indiceCuerpo = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${indiceCuerpo}`, name: `CUERPO`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${indiceDec}`, target: `${indiceCuerpo}`, faveColor: '#6FB1FC', strength: 90 } })
        if (this.instrucciones != null) {
            for (let i = 0; i < this.instrucciones.length; i++) {
                let cad = this.instrucciones[i].GenerarNodo(indiceCuerpo);
                let json = JSON.parse(cad.toString());
                codigo = codigo.concat(json.nodo);
                enlace = enlace.concat(json.enlace);
            }
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }
}


