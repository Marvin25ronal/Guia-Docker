import { Expresion } from "./Expresion";
import { VarGlobal } from "../Global/VarGlobal";
import { Errores } from "../Reportes/Errores";
import { Traduccion } from "../3D/Traduccion";

export class Return implements Expresion {
    expresion: Expresion
    constructor(exp, linea, coluna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = coluna;
    }
    TraducirExp(e: import("../Entorno/Entorno").Entorno): import("../3D/Traduccion").Traduccion {
        let codigo = document.createTextNode('')
        if (this.expresion == null) {
            let etisal = e.ObtenerRetorono();
            let tiporet = e.TipoRetorno();
            if (tiporet.isVoid()) {
                codigo.appendData(`goto L${etisal.indice};\n`);
                return new Traduccion([], codigo.textContent);
            } else {
                VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `La funcion tiene que retornar algo y no tiene exrpesion`, 3));
                return null;
            }
        } else {
            let tiporet = e.TipoRetorno();
            let tipoaretornar = this.expresion.GetTipo(e);
            if (tipoaretornar == null) { return null; }
            if (tiporet.isEstruct()) {
                
            } else {
                if (tipoaretornar.sonCompatibles(tiporet)) {
                    let etisal = e.ObtenerRetorono();
                    let valorexp = this.expresion.TraducirExp(e);
                    if (valorexp == null) { return null; }
                    codigo.appendData(valorexp.ObtenerCodigo().toString());
                    let temporal = VarGlobal.getInstance().contadorTemporales;
                    codigo.appendData(`t${temporal}=P+1;\n`)
                    codigo.appendData(`Stack[t${temporal}]=t${valorexp.ObtenerEtiquetas()[0].indice};\n`)
                    codigo.appendData(`goto L${etisal.indice};\n`)
                    e.huboretorno();
                    VarGlobal.getInstance().Apilar(temporal);
                    return new Traduccion([], codigo.textContent);
                } else {
                    VarGlobal.getInstance().agregarError(new Errores(this.linea, this.columna, `El tipo de retorno no corresponde al tipo de funcion ${tipoaretornar.toString()}`, 3))
                    return null;
                }
            }

        }
        return null;
    }
    GetTipo(e: import("../Entorno/Entorno").Entorno): import("./TipoExp").TipoExp {
        if (this.expresion != null) {
            let tipo = this.expresion.GetTipo(e);
            return tipo;
        }
        return null;
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
        codigo.push({ data: { id: `${indice}`, name: 'RETURN', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        if (this.expresion != null) {
            let cad = this.expresion.GenerarNodo(indice);
            let json = JSON.parse(cad);
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        }
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }
}