import { Expresion } from "./Expresion";
import { TipoExp, Tipo } from "./TipoExp";
import { VarGlobal } from "../Global/VarGlobal";
import { Errores } from "../Reportes/Errores";
import { Traduccion } from "../3D/Traduccion";
import { Etiqueta } from "../3D/Etiqueta";

export class DecArray implements Expresion {
    TraducirExp(e: import("../Entorno/Entorno").Entorno): import("../3D/Traduccion").Traduccion {
        let codigo = document.createTextNode('');
        //let indicet = VarGlobal.getInstance().contadorTemporales;
        if (this.tipo.isEstruct()) {

        } else {
            let tipoexp = this.expresion.GetTipo(e);
            if (tipoexp.isInteger()) {
                let valorexp = this.expresion.TraducirExp(e);
                if (valorexp == null) { return null; }
                codigo.appendData(valorexp.ObtenerCodigo().toString());
                codigo.appendData(`t0=t${valorexp.ObtenerEtiquetas()[0].indice};\n`)
                codigo.appendData(`call marvin_201602520_CrearArray;\n`)
                let indice = VarGlobal.getInstance().contadorTemporales;
                codigo.appendData(`t${indice}=t0;\n`)
                return new Traduccion([new Etiqueta(`t${indice}`, indice)], codigo.textContent);
            } else {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `El parametro para generar el arreglo no es de tipo entero`, 3));
                return null;
            }
        }
    }
    GetTipo(e: import("../Entorno/Entorno").Entorno): import("./TipoExp").TipoExp {
        
        let tipo = new TipoExp(Tipo.ARRAY, '');
        if (this.tipo.isEstruct()) {

        } else {
            tipo.tipoarray = this.tipo.tipo;
        }
        return tipo;
    }
    expresion: Expresion
    tipo: TipoExp;
    constructor(exp, tip, line, col) {
        this.expresion = exp;
        this.tipo = tip;
        this.linea = line;
        this.columna = col;
    }
    islogical: boolean;
    isControle: boolean;
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
        codigo.push({ data: { id: `${indice}`, name: 'NUEVOARREGLO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        let tipo = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${tipo}`, name: `Tipo{${this.tipo.toString()}}`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${indice}`, target: `${tipo}`, faveColor: '#6FB1FC', strength: 90 } })
        let cad = this.expresion.GenerarNodo(indice);
        let json = JSON.parse(cad);
        codigo = codigo.concat(json.nodo);
        enlace = enlace.concat(json.enlace);
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }
}