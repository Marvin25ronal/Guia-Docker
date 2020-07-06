import { Traduccion } from "./Traduccion";
import { Etiqueta } from "./Etiqueta";
import { VarGlobal } from "../Global/VarGlobal";

export class TraduccionLogica extends Traduccion {
    encabezado: string
    etiquetasVerdaderas: Etiqueta[]
    etiquetasFalsas: Etiqueta[]
    partesuperior: string;
    codigoV: string;
    codigoF: string
    constructor(verdaderas: Etiqueta[], falsas: Etiqueta[], partesuperior: string, codigoV: string, codigoF: string, encabezado: string) {
        super(null, "");
        this.etiquetasVerdaderas = verdaderas;
        this.etiquetasFalsas = falsas;
        this.partesuperior = partesuperior;
        this.codigoV = codigoV;
        this.codigoF = codigoF;
        this.encabezado = encabezado;
    }

    ObtenerCodigo() {
        // console.log(this);
        let codigo = "";
        codigo += this.partesuperior;
        let salida = VarGlobal.getInstance().contadorSaltos;
        for (let i = 0; i < this.etiquetasFalsas.length; i++) {
            codigo += this.etiquetasFalsas[i].etiqueta;
        }
        codigo += this.codigoF;
        codigo += `goto L${salida};\n`;
        for (let i = 0; i < this.etiquetasVerdaderas.length; i++) {
            codigo += this.etiquetasVerdaderas[i].etiqueta;
        }
        codigo += this.codigoV;
        codigo += `L${salida}:\n`
        return codigo;
    }
    ObtenerEtiquetas() {
        if(super.ObtenerEtiquetas()==null){
            
        }
        return super.ObtenerEtiquetas();
    }
}