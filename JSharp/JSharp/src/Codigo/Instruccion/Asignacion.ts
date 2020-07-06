import { Instruccion } from "./Instruccion";
import { Expresion } from "../Expresion/Expresion";
import { VarGlobal } from "../Global/VarGlobal";
import { Identificador } from "../Expresion/Identificador";
import { Traduccion } from "../3D/Traduccion";
import { Errores } from "../Reportes/Errores";
import { Tipo } from "../Expresion/TipoExp";
import { Variable } from "../Entorno/Variable";
import { TipoEntorno } from "../Entorno/Entorno";

export class Asignacion extends Instruccion {
    id: Identificador
    exp: Expresion
    constructor(valor, exp, linea, columna) {
        super(linea, columna);
        this.id = valor;
        this.exp = exp;
    }
    TraducirInstruccion(e: import("../Entorno/Entorno").Entorno): Traduccion {
       //debugger;
        if (e.existe(this.id.val)) {
            let variable = e.getSimbolo(this.id.val);
            let vari = variable as Variable
            let codigo = ``;
            if (vari.ambito == TipoEntorno.GLOBAL) {
                //todas las que estan en el heap
                if (vari.modificador == Tipo.GLOBAL) {
                    let tipoex = this.exp.GetTipo(e);
                    if (tipoex == null) { return null; }
                    let valorex = this.exp.TraducirExp(e);
                    if (valorex == null) { return null; }
                    if (tipoex.isEstruct()) {

                    } else {
                        if (tipoex.sonCompatibles(vari.tipo)) {
                            if (vari.ref < 0 || vari.ref.toString() == "-0") { vari.ref = vari.ref * -1; }
                            codigo += valorex.ObtenerCodigo();
                            codigo += `Heap[t${vari.ref}]=t${valorex.ObtenerEtiquetas()[0].indice};\n`
                            // vari.tipo = tipoex;
                            return new Traduccion([], codigo);
                        } else {
                            VarGlobal.getInstance().lErrores.push(new Errores(this.linea, this.columna, "Variable incompatible de tipo " + vari.nombre, 3))
                            return null;
                        }
                        //let indice = VarGlobal.getInstance().contadorTemporales;
                    }
                } else if (vari.modificador == Tipo.CONST) {
                    VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `La Variable ${vari.nombre} es de tipo CONST no se puede modificar`, 3));
                    return null;
                } else if (vari.modificador == Tipo.VAR) {
                    //las var
                    let tipoex = this.exp.GetTipo(e);
                    if (tipoex == null) { return null; }
                    let valorex = this.exp.TraducirExp(e);
                    if (valorex == null) { return null; }
                    if (tipoex.isEstruct()) {

                    } else {
                        if (tipoex.sonCompatibles(vari.tipo)) {
                            if (vari.ref < 0 || vari.ref.toString() == "-0") { vari.ref = vari.ref * -1; }
                            codigo += valorex.ObtenerCodigo();
                            codigo += `Heap[t${vari.ref}]=t${valorex.ObtenerEtiquetas()[0].indice};\n`
                            //vari.tipo = tipoex;
                            return new Traduccion([], codigo);
                        } else {
                            VarGlobal.getInstance().lErrores.push(new Errores(this.linea, this.columna, "Variable incompatible de tipo " + vari.nombre, 3))
                            return null;
                        }
                        //let indice = VarGlobal.getInstance().contadorTemporales;

                    }
                } else if (vari.modificador == Tipo.NORMAL) {
                    let tipoex = this.exp.GetTipo(e);
                    if (tipoex == null) { return null; }
                    let valorexp = this.exp.TraducirExp(e);
                    if (valorexp == null) { return null; }
                    let tipovar = vari.tipo;
                    if (tipovar.isEstruct()) {
                        //comparacion de estructuras
                    } else {
                        if (tipoex.sonCompatibles(tipovar)) {
                            //let indice = VarGlobal.getInstance().contadorTemporales;
                            if (vari.ref < 0 || vari.ref.toString() == "-0") { vari.ref = vari.ref * -1; }
                            codigo += valorexp.ObtenerCodigo();
                            codigo += `Heap[t${vari.ref}]=t${valorexp.ObtenerEtiquetas()[0].indice};\n`
                            return new Traduccion([], codigo);
                        } else {
                            VarGlobal.getInstance().lErrores.push(new Errores(this.linea, this.columna, "Variable incompatible de tipo " + vari.nombre, 3))
                            return null;
                        }
                    }
                }
            } else {
                //son todas las que estan en la funcion 
                let tipoex = this.exp.GetTipo(e);
                if (tipoex == null) { return null; }
                let valorexp = this.exp.TraducirExp(e);
                if (valorexp == null) { return null; }
                let tipovar = vari.tipo;
                if (vari.modificador == Tipo.CONST) {
                    VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `La Variable ${vari.nombre} es de tipo CONST no se puede modificar`, 3));
                    return null;
                }
                if (tipovar.isEstruct()) {
                    //comparacion de estructuras
                } else {
                    if (tipoex.sonCompatibles(tipovar)) {
                        let indice = VarGlobal.getInstance().contadorTemporales;
                        if (vari.ref < 0 || vari.ref.toString() == "-0") { vari.ref = vari.ref * -1; }
                        codigo += valorexp.ObtenerCodigo();
                        codigo += `t${indice}=P+${vari.ref};\n`;
                        codigo += `Stack[t${indice}]=t${valorexp.ObtenerEtiquetas()[0].indice};\n`
                        return new Traduccion([], codigo);
                    } else {
                        VarGlobal.getInstance().lErrores.push(new Errores(this.linea, this.columna, "Variable incompatible de tipo " + vari.nombre, 3))
                        return null;
                    }
                }
            }

        } else {
            VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `La variable no existe ${this.id.val}`, 3));
            return null;
        }
    }
    public GenerarNodo(padre: number) {
        let codigo = []
        let enlace = []
        let indice = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${indice}`, name: 'ASIGNACION', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })

        let cad = this.id.GenerarNodo(indice);
        let json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);

        cad = this.exp.GenerarNodo(indice);
        json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }

}