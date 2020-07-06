import { Expresion } from "./Expresion";
import { Identificador } from "./Identificador";
import { VarGlobal } from "../Global/VarGlobal";
import { Nodo } from "../AST/Nodo";
import { Traduccion } from "../3D/Traduccion";
import { Funcion } from "../Entorno/Funcion";
import { Entorno } from "../Entorno/Entorno";
import { Errores } from "../Reportes/Errores";
import { Etiqueta } from "../3D/Etiqueta";
import { Acceso } from "./Acceso";

export class AccesoFuncion implements Expresion {
    idfun: Identificador;
    param: Expresion[];
    constructor(id, par, linea, columna) {
        this.idfun = id;
        this.param = par;
        this.linea = linea;
        this.columna = columna;
    }
    isControle: boolean;
    isControl: boolean;
    islogical: boolean;
    funcionAllamar: Funcion
    TraducirExp(e: import("../Entorno/Entorno").Entorno): Traduccion {
      //  debugger;
        let codigo = document.createTextNode('');

        //guardar temporales en stack
        //debugger;
        VarGlobal.getInstance().pilaTemporales.sort();
        //guardamos el contador de los temporales
        let contadortemp = e.correlativovar;
        let contadoraux = e.GetPosicionStackVar();
        //guardar los parametros
        VarGlobal.getInstance().bloqueo = true;
        for (let i = 0; i < VarGlobal.getInstance().pilaTemporales.length; i++) {

            let indicet = VarGlobal.getInstance().contadorTemporales;
            //let indice = e.GetPosicionStackVar();
            //debugger;
            e.getPos();
            codigo.appendData(`t${indicet}=P+${contadoraux};\n`)
            codigo.appendData(`Stack[t${indicet}]=t${VarGlobal.getInstance().pilaTemporales[i]};\n`)
            contadoraux++;
            //array.push(indicet);
            //VarGlobal.getInstance().Apilar(indicet);
        }

        //e.correlativovar = contadoraux-1;
        //cambio de ambito simulado y grabar variables
        if (this.param != null) {
            //paso de parametros
            //creacion de parametros
            //  codigo.appendData('paso\n')
            let aux = VarGlobal.getInstance().pilaTemporales;
            VarGlobal.getInstance().pilaTemporales = [];
            if (this.parametrosCorrectos(e)) {
                //codigo.appendData(`grabarparam\n`)
                let indice = VarGlobal.getInstance().contadorTemporales;
                let contaux = e.correlativovar;

                //  let numeroentorno = e.correlativovar;
                // console.log(VarGlobal.getInstance().pilaTemporales);
                //codigo.appendData(`Iniio paso`)
                let contadorEntorno=e.correlativovar;
                for (let i = 0; i < this.param.length; i++) {
                    let par = this.param[i];
                    if(par instanceof Acceso){
                       // debugger;
                        e.correlativovar+=i;
                    }
                    let trad = par.TraducirExp(e);
                    if (trad == null) { return null }
                    codigo.appendData(trad.ObtenerCodigo().toString());
                    codigo.appendData(`t${indice}=P+${e.GetPosicionStackVar() + 2};\n`);
                    e.getPos();
                    codigo.appendData(`Stack[t${indice}]=t${trad.ObtenerEtiquetas()[0].indice};\n`)
                    //console.log(VarGlobal.getInstance().pilaTemporales);
                    VarGlobal.getInstance().Apilar(trad.ObtenerEtiquetas()[0].indice);
                    if(par instanceof Acceso){
                        e.correlativovar-=i;
                    }
                    //console.log(VarGlobal.getInstance().pilaTemporales);
                }
                //codigo.appendData(`termino paso`)
                console.log(VarGlobal.getInstance().pilaTemporales);
                // codigo.appendData(`terminoparam\n`)
                VarGlobal.getInstance().pilaTemporales = aux;
                e.correlativovar = contaux;
            } else {
                VarGlobal.getInstance().bloqueo = false;
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `Error en los parametros de la funcion ${this.idfun.val}`, 3))
                return null;
            }
        }
        //cambio de ambito
        let siguientepos = e.GetPosicionStackVar();
        codigo.appendData(`P=P+${siguientepos};\n`);
        codigo.appendData(`call ${this.funcionAllamar.nombre};\n`);
        //regresar todos los valores 
        let eti = VarGlobal.getInstance().contadorTemporales;
        codigo.appendData(`t${eti}=P+1;\n`);
        let ret = VarGlobal.getInstance().contadorTemporales;
        codigo.appendData(`t${ret}=Stack[t${eti}];\n`)
        let etiret = new Etiqueta(`t${ret}`, ret);
        codigo.appendData(`P=P-${siguientepos};\n`);
        e.correlativovar = contadortemp;
        contadoraux = e.GetPosicionStackVar();
        //console.log(VarGlobal.getInstance().pilaTemporales);
        for (let i = 0; i < VarGlobal.getInstance().pilaTemporales.length; i++) {
            let indicet = VarGlobal.getInstance().contadorTemporales;
            codigo.appendData(`t${indicet}=P+${contadoraux};\n`)
            codigo.appendData(`t${VarGlobal.getInstance().pilaTemporales[i]}=Stack[t${indicet}];\n`)
            e.getPos();
            contadoraux++;
        }
        e.correlativovar = contadortemp;
        VarGlobal.getInstance().bloqueo = false;
        return new Traduccion([etiret], codigo.textContent);

    }
    parametrosCorrectos(e: Entorno) {
        let parfun = this.funcionAllamar.parametros;
        let parametrosmetiendo = this.param;
        if (parfun == null) { return false; }
        if (parfun.length == parametrosmetiendo.length) {
            for (let i = 0; i < parfun.length; i++) {
                let item1fun = parfun[i];
                let itempar = parametrosmetiendo[i];
                if (itempar.GetTipo(e).sonCompatibles(item1fun.tipo)) {
                    continue;
                } else {
                    VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `No se puede meter ese tipo en ${itempar.GetTipo(e).toString()} en ${item1fun.tipo.toString()} funcion ${this.idfun.val}`, 3));
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    GetTipo(e: import("../Entorno/Entorno").Entorno): import("./TipoExp").TipoExp {
        throw new Error("Method not implemented.");
    }

    linea: number;
    columna: number;
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
        codigo.push({ data: { id: `${indice}`, name: 'ACCESOFUNCION', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })

        let cad = this.idfun.GenerarNodo(indice);
        let json = JSON.parse(cad.toString());
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);

        if (this.param != null) {
            let indicepar = VarGlobal.getInstance().contadorGrafo;
            codigo.push({ data: { id: `${indicepar}`, name: 'PARAMETROS', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
            enlace.push({ data: { source: `${indice}`, target: `${indicepar}`, faveColor: '#6FB1FC', strength: 90 } })
            this.param.forEach(function (item: Nodo) {
                let cad = item.GenerarNodo(indicepar);
                let json = JSON.parse(cad);
                codigo = codigo.concat(json.nodo);
                enlace = enlace.concat(json.enlace);
            });
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }

}