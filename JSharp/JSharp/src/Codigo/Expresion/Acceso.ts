import { Expresion } from "./Expresion";
import { VarGlobal } from "../Global/VarGlobal";
import { Nodo } from "../AST/Nodo";
import { Traduccion } from "../3D/Traduccion";
import { TipoExp, Tipo } from "./TipoExp";
import { AccesoArray } from "./AccesoArray";
import { AccesoAtributo } from "./AccesoAtributo";
import { AccesoFuncion } from "./AccesoFuncion";
import { Entorno } from "../Entorno/Entorno";
import { Errores } from "../Reportes/Errores";
import { FuncionesPropias } from "../FuncionesPropias/FuncionesPropias";
import { Etiqueta } from "../3D/Etiqueta";
import { Funcion } from "../Entorno/Funcion";
import { Parametros } from "../Instruccion/Parametros";
import { Identificador } from "./Identificador";
import { AtributosPropios } from "../FuncionesPropias/AtributosPropios";
import { AccesoVariable } from "./AccesoVariable";

export class Acceso implements Expresion {
    accesos: object[];
    puntero: number
    TraducirExp(e: import("../Entorno/Entorno").Entorno): Traduccion {
        let codigo = "";
        let traduccion: Traduccion = null;
        let eti: Etiqueta = null;
        let tipo: TipoExp;

        for (let i = 0; i < this.accesos.length; i++) {
            if (this.accesos[i] instanceof AccesoArray) {
                let acceso = this.accesos[i] as AccesoArray;
                if (eti != null) {
                    VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `El arreglo no es de tipo atributo`, 3));
                    return null
                }
                let trad = acceso.TraducirExp(e);
                this.puntero = acceso.apuntador;
                if (trad == null) { return null }
                codigo += trad.ObtenerCodigo();
                eti = trad.ObtenerEtiquetas()[0];
            } else if (this.accesos[i] instanceof AccesoAtributo) {
                let acceso = this.accesos[i] as AccesoAtributo;
                if (this.AtributoPropio(acceso.id.val)) {
                    let atributo = new AtributosPropios(this.accesos[i], eti, tipo);
                    traduccion = atributo.Generar(e);
                    tipo = atributo.tiposintetizado;
                    if (traduccion == null) { return null }
                    if (traduccion.ObtenerEtiquetas().length > 0) {
                        eti = traduccion.ObtenerEtiquetas()[0]
                    } else {
                        eti = null
                    }
                    codigo += traduccion.ObtenerCodigo();
                }
            } else if (this.accesos[i] instanceof AccesoVariable) {
                let acceso = this.accesos[i] as AccesoAtributo;
                traduccion = acceso.TraducirExp(e);
                if (traduccion == null) { return null }
                tipo = acceso.GetTipo(e)
                eti = traduccion.ObtenerEtiquetas()[0];
                codigo += traduccion.ObtenerCodigo();
            } else if (this.accesos[i] instanceof AccesoFuncion) {
                let acceso = this.accesos[i] as AccesoFuncion;
                if (this.FuncionesPropias(acceso.idfun.val)) {
                    let funcion = new FuncionesPropias(this.accesos[i], eti, tipo);
                    traduccion = funcion.Generar(e);
                    tipo = funcion.tiposintetizado;
                    if (traduccion == null) { return null; }
                    if (traduccion.ObtenerEtiquetas().length > 0) {
                        eti = traduccion.ObtenerEtiquetas()[0];
                    } else {
                        eti = null;
                    }
                    codigo += traduccion.ObtenerCodigo();
                }
                else if (e.existeGlobal(`FUNCION_${acceso.idfun.val}`)) {
                    //guardar parametros estan en el stack
                    //guardar temporales en el stack
                    //cambio de ambito simulado
                    //llamamos funcion
                    let simobolo = e.getSimbolo(`FUNCION_${acceso.idfun.val}`);
                    let llamada = this.accesos[i] as AccesoFuncion;
                    let funcion = simobolo as Funcion;
                    let nombrellamada = this.generarNombre(llamada.param, funcion.tipo, llamada.idfun, e);
                    if (llamada.param != null) {
                        //se busca la llave
                        let llam = funcion.obtenerFuncion(nombrellamada);
                        if (llam == null) {
                            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `No se encontro la funcion con parametros ${nombrellamada}`, 3));
                            return null;
                        }
                        if (eti == null) {
                            //et fun = this.ObtenersinparFun(funcion);
                            llamada.funcionAllamar = funcion;
                            let trad = llamada.TraducirExp(e);
                            if (trad == null) { return null; }
                            codigo += trad.ObtenerCodigo();
                            eti = trad.ObtenerEtiquetas()[0]
                        } else {
                            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `La funcion no es atributo de algo ${acceso.idfun.val}`, 3))
                            return null;
                        }
                    } else {
                        //la llamada no tiene parametros y tenemos que buscar la que no tiene parametros
                        if (this.existeSinparFun(funcion)) {
                            if (eti == null) {
                                let fun = this.ObtenersinparFun(funcion);
                                llamada.funcionAllamar = fun;
                                let trad = llamada.TraducirExp(e);
                                if (trad == null) { return null; }
                                codigo += trad.ObtenerCodigo();
                                eti = trad.ObtenerEtiquetas()[0]
                            } else {
                                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `La funcion no es atributo de algo ${acceso.idfun.val}`, 3))
                                return null;
                            }
                        } else {
                            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `No se encontro la funcion sin parametros ${funcion.nombre}`, 3));
                            return null;
                        }
                    }

                } else {
                    VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `No existe la funcion ${acceso.idfun.val}`, 3))
                    return null;
                }
            }
        }
        return new Traduccion([eti], codigo);
    }
    private existeSinparFun(funcion: Funcion) {
        let aux = funcion;
        while (aux != null) {
            if (aux.parametros == null) { return true; }
            aux = aux.siguiente;
        }
        return false;
    }
    private ObtenersinparFun(funcion: Funcion) {
        let aux = funcion;
        while (aux != null) {
            if (aux.parametros == null) { return aux; }
            aux = aux.siguiente;
        }
        return null;
    }
    generarNombre(parametros: Expresion[], tipo: TipoExp, id: Identificador, e: Entorno) {
        let cad = ''
        if (parametros != null) {
            for (let i = 0; i < parametros.length; i++) {
                let aux = parametros[i];
                if (aux.GetTipo(e).esNumero()) {
                    cad += `NUMERO`;
                } else if (aux.GetTipo(e).isEstruct()) {

                } else {
                    cad += aux.GetTipo(e).toString();
                }
            }
            return `FUNCION_${tipo.toString()}_${id.val}_` + cad;
        }
        return `FUNCION_${tipo.toString()}_${id.val}`;
    }

    linea: number;
    columna: number;
    constructor(accesos, linea, columna) {
        this.accesos = accesos;
        this.linea = linea;
        this.columna = columna;
    }
    isControle: boolean;
    isControl: boolean;
    islogical: boolean;
    tipooculto: TipoExp
    GetTipo(e: import("../Entorno/Entorno").Entorno): import("./TipoExp").TipoExp {
        let tipo: TipoExp = null;
        for (let i = 0; i < this.accesos.length; i++) {
            if (this.accesos[i] instanceof AccesoArray) {
                tipo = (this.accesos[i] as AccesoArray).GetTipo(e);
            } else if (this.accesos[i] instanceof AccesoAtributo) {
                let acceso = this.accesos[i] as AccesoAtributo;
                if (this.AtributoPropio(acceso.id.val)) {
                    tipo = this.TipoAtributoPropio(acceso.id.val);
                }
            } else if (this.accesos[i] instanceof AccesoVariable) {
                let acceso = this.accesos[i] as AccesoAtributo;
                tipo = acceso.GetTipo(e)
            } else if (this.accesos[i] instanceof AccesoFuncion) {
                let acceso = this.accesos[i] as AccesoFuncion;
                if (this.FuncionesPropias(acceso.idfun.val)) {
                    this.tipooculto = tipo;
                    tipo = this.TipoFuncionesPropias(acceso.idfun.val);

                }
                else if (e.existeGlobal(`FUNCION_${acceso.idfun.val}`)) {
                    let simobolo = e.getSimbolo(`FUNCION_${acceso.idfun.val}`);
                    tipo = (simobolo as Funcion).tipo;
                } else {
                    VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `No se encontro la funcion ${acceso.idfun.val}`, 3));
                    return null
                }
            }
        }
        return tipo;
    }
    TipoFuncionesPropias(s: string): TipoExp {
        switch (s.toLowerCase()) {
            case 'print':
                return new TipoExp(Tipo.VOID, null);
            case 'tochararray':
                let aux = new TipoExp(Tipo.ARRAY, null);
                aux.tipoarray = Tipo.CHAR;
                return aux;
            case 'length':
                return new TipoExp(Tipo.INTEGER, null);
            case 'touppercase':
                return new TipoExp(Tipo.STRING, null);
            case "tolowercase":
                return new TipoExp(Tipo.STRING, null);
            case "charat":
                return new TipoExp(Tipo.CHAR, null);
            case "linealize":
                return this.tipooculto;


        }
    }
    TipoAtributoPropio(s: string): TipoExp {
        switch (s.toLowerCase()) {
            case 'length':
                return new TipoExp(Tipo.INTEGER, null);
        }
    }
    FuncionesPropias(s: string): boolean {
        
        switch (s.toLowerCase()) {
            case 'print':
                return true;
            case "tochararray":
                return true;
            case "length":
                return true;
            case "touppercase":
                return true;
            case "tolowercase":
                return true;
            case "charat":
                return true;
            case "linealize":
                return true;

        }
    }
    AtributoPropio(s: string) {
        switch (s.toLowerCase()) {
            case 'length':
                return true;
        }
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
        codigo.push({ data: { id: `${indice}`, name: 'ACCESO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        this.accesos.forEach(function (item: Nodo) {
            console.log(item);
            let cad = item.GenerarNodo(indice);
            let json = JSON.parse(cad);
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }

}