import { Expresion } from "./Expresion";
import { TipoExp } from "./TipoExp";
import { VarGlobal } from "../Global/VarGlobal";
import { Traduccion } from "../3D/Traduccion";
import { Etiqueta } from "../3D/Etiqueta";
import { TraduccionLogica } from "../3D/TraduccionLogica";

export class Literal extends Expresion {
    GetTipo(e: import("../Entorno/Entorno").Entorno): TipoExp {
        return this.tipo;
    }

    public GenerarNodo(padre) {
        let codigo = []
        let enlace = []
        let indice = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${indice}`, name: `${this.tipo.toString()}{${this.valor.toString()}}`, weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }
    valor: object;
    tipo: TipoExp;

    constructor(valor, tipo, linea, columna) {
        super(linea, columna);
        this.valor = valor;
        this.tipo = tipo;
    }
    TraducirExp(e: import("../Entorno/Entorno").Entorno): Traduccion {
        if (this.tipo.esCadena()) {
            if (this.tipo.isString()) {
                let codigo = "";
                let json = JSON.parse(VarGlobal.getInstance().GrabarCadena(this.valor.toString()));
                codigo += json.codigo;
                return new Traduccion([new Etiqueta(`t${json.indice}`, json.indice)], codigo);
            } else {
                let codigo = "";
                let json = JSON.parse(VarGlobal.getInstance().GrabarCadena(this.valor.toString()));
                codigo += json.codigo;
                return new Traduccion([new Etiqueta(`t${json.indice}`, json.indice)], codigo);
            }

        } else {
            if (this.islogical == true) {
                //parte retornamos con un if
                let LV = VarGlobal.getInstance().contadorSaltos;
                let LF = VarGlobal.getInstance().contadorSaltos;
                if (this.valor.toString() == "true") {
                    let codigo = `if(1==1)goto L${LV};\n`
                    return new TraduccionLogica([new Etiqueta(`L${LV}:\n`, LV)], [new Etiqueta(`L${LF}:\n`, LF)], codigo, null, null, "");
                } else {
                    let codigo = `if(1==0)goto L${LV};\n`
                    return new TraduccionLogica([new Etiqueta(`L${LV}:\n`, LV)], [new Etiqueta(`L${LF}:\n`, LF)], codigo, null, null, "");
                }
            }
            if (this.tipo.isBoolean()) {
                if (this.isControle) {
                    let indicet = VarGlobal.getInstance().contadorTemporales;
                    let indiceV = VarGlobal.getInstance().contadorSaltos;
                    let indiceF = VarGlobal.getInstance().contadorSaltos;
                    let Lsalida = VarGlobal.getInstance().contadorSaltos;
                    if (this.valor.toString() == "true") {
                        let codigo = `if(1==1) goto L${indiceV};\ngoto L${indiceF};\nL${indiceV}:\nt${indicet.toString()}=1;\ngoto L${Lsalida};\nL${indiceF}:\nt${indicet.toString()}=0;\nL${Lsalida}:\n`
                        return new Traduccion([new Etiqueta(`t${indicet}`, indicet)], codigo);
                    } else {
                        let codigo = `if(1==0) goto L${indiceV};\ngoto L${indiceF};\nL${indiceV}:\nt${indicet.toString()}=1;\ngoto L${Lsalida};\nL${indiceF}:\nt${indicet.toString()}=0;\nL${Lsalida}:\n`
                        return new Traduccion([new Etiqueta(`t${indicet}`, indicet)], codigo);
                    }
                }
                let indicet = VarGlobal.getInstance().contadorTemporales;
                if (this.valor.toString() == "true") {
                    let codigo = `t${indicet.toString()}=1;\n`
                    VarGlobal.getInstance().Apilar(indicet);
                    return new Traduccion([new Etiqueta(`t${indicet}`, indicet)], codigo);
                } else {
                    let codigo = `t${indicet.toString()}=0;\n`
                    VarGlobal.getInstance().Apilar(indicet);
                    return new Traduccion([new Etiqueta(`t${indicet}`, indicet)], codigo);
                }
            } else {
                let indicet = VarGlobal.getInstance().contadorTemporales;
                VarGlobal.getInstance().Apilar(indicet);
                return new Traduccion([new Etiqueta(`t${indicet}`, indicet)], `t${indicet}=${this.valor.toString()};\n`);
            }
        }
        return null;
    }


}