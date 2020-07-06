import { Expresion } from "./Expresion";
import { Nodo } from "../AST/Nodo";
import { VarGlobal } from "../Global/VarGlobal";
import { Tipo } from "./TipoExp";
import { TipoExp } from "./TipoExp"
import { Errores } from "../Reportes/Errores";
import { Traduccion } from "../3D/Traduccion";
import { Etiqueta } from "../3D/Etiqueta";
export class ArregloValor implements Expresion {
    TraducirExp(e: import("../Entorno/Entorno").Entorno): import("../3D/Traduccion").Traduccion {
        let tam = this.valores.length;
        let codigo = document.createTextNode(``);
        let indice = VarGlobal.getInstance().contadorTemporales;
        let indicearreglo = VarGlobal.getInstance().contadorTemporales;
        let inicioarreglo = VarGlobal.getInstance().contadorTemporales;
        let iterador = VarGlobal.getInstance().contadorTemporales;
        codigo.appendData(`t${indice}=${tam};\n`)
        codigo.appendData(`t0=t${indice};\n`)
        codigo.appendData(`call marvin_201602520_crearArray;\n`)
        codigo.appendData(`t${indicearreglo}=t0;\n`)
        codigo.appendData(`t${inicioarreglo}=t${indicearreglo}+1;\n`);
        codigo.appendData(`t${iterador}=t${inicioarreglo};\n`)
        for (let i = 0; i < tam; i++) {
            let valor = this.valores[i].TraducirExp(e);
            if (valor == null) { return null; }
            VarGlobal.getInstance().Apilar(valor.ObtenerEtiquetas()[0].indice);
            codigo.appendData(valor.ObtenerCodigo().toString());
            codigo.appendData(`Heap[t${iterador}]=t${valor.ObtenerEtiquetas()[0].indice};\n`)
            codigo.appendData(`t${iterador}=t${iterador}+1;\n`);
        }
        return new Traduccion([new Etiqueta(`t${indicearreglo}`, indicearreglo)], codigo.textContent);
    }
    GetTipo(e: import("../Entorno/Entorno").Entorno): import("./TipoExp").TipoExp {
        let tipo = new TipoExp(Tipo.ARRAY, null);
        if (this.valores != null) {
            let tipoaux = null;
            for (let i = 0; i < this.valores.length; i++) {
                let tipoexp = this.valores[i].GetTipo(e);
                if (tipoexp == null) { return null; }
                if (tipoaux == null) { tipoaux = tipoexp; }
                else {
                    if (tipoexp.sonCompatibles(tipoaux)) {
                        tipoaux = tipoexp;
                    } else {
                        VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `Los datos no son del mismo tipo`, 3));
                        return null;
                    }
                }
            }
            tipo.tipoarray = tipoaux;
            return tipo;
        }
        tipo.tipoarray = Tipo.INTEGER;
        return null;
    }
    islogical: boolean;
    isControle: boolean;
    linea: number;
    columna: number;
    valores: Expresion[];
    constructor(valores, linea, columna) {
        this.valores = valores;
        this.linea = linea;
        this.columna = columna;
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
        codigo.push({ data: { id: `${indice}`, name: 'ARRAY', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        this.valores.forEach(function (item: Nodo) {
            console.log(item);
            let cad = item.GenerarNodo(indice);
            let json = JSON.parse(cad);
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }

}