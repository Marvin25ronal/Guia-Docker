import { Expresion } from "../Expresion/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Traduccion } from "../3D/Traduccion";
import { Etiqueta } from "../3D/Etiqueta";
import { VarGlobal } from "../Global/VarGlobal";

export class Print {
    exp: Expresion;
    constructor(exp) {
        this.exp = exp;
    }
    Imprimir(e: Entorno): Traduccion {
        let tipo = this.exp.GetTipo(e);
        if (tipo == null) { return null; }
        if (tipo.esCadena()) {
            let cadena = this.exp.TraducirExp(e);
            if (cadena == null) { return null; }
            let codigo = cadena.ObtenerCodigo().toString();
            codigo += `t0=${cadena.ObtenerEtiquetas()[0].etiqueta};\n`;
            codigo += `call marvin_201602520_printCadena;\n`;
            return new Traduccion([], codigo);
        } else if (tipo.isBoolean()) {
            let cadena = this.exp.TraducirExp(e);
            if (cadena == null) { return null; }
            let codigo = cadena.ObtenerCodigo().toString();
            codigo += `t0=${cadena.ObtenerEtiquetas()[0].etiqueta};\n`;
            codigo += `call marvin_201602520_ConvertirBooleanoString;\n`
            codigo += `call marvin_201602520_printCadena;\n`
            return new Traduccion([], codigo);
        } else if (tipo.isDouble()) {
            let cadena = this.exp.TraducirExp(e);
            if (cadena == null) { return null; }
            let codigo = document.createTextNode('');
            codigo.appendData(cadena.ObtenerCodigo().toString());
            codigo.appendData(`t0=${cadena.ObtenerEtiquetas()[0].etiqueta};\n`)
            codigo.appendData(`call marvin_201602520_PrintDouble;\n`)
            //codigo.appendData(`call marvin_201602520_printCadena;\n`);
            return new Traduccion([], codigo.textContent);
        }else if(tipo.isInteger()){
           // debugger;
            let cadena = this.exp.TraducirExp(e);
            if (cadena == null) { return null; }
            let codigo = document.createTextNode('');
            codigo.appendData(cadena.ObtenerCodigo().toString());
            codigo.appendData(`t0=${cadena.ObtenerEtiquetas()[0].etiqueta};\n`)
            codigo.appendData(`call marvin_201602520_PrintEntero;\n`)
            //codigo.appendData(`call marvin_201602520_CambiarNumeroAscii;\n`)
            //codigo.appendData(`call marvin_201602520_printCadena;\n`);
            return new Traduccion([], codigo.textContent);
        }
    }
}