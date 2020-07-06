import { Etiqueta } from "../3D/Etiqueta";
import { Entorno } from "../Entorno/Entorno";
import { Traduccion } from "../3D/Traduccion";
import { VarGlobal } from "../Global/VarGlobal";

export class AtributoLength {
    etiquetaanterior: Etiqueta
    constructor(eti: Etiqueta) {
        this.etiquetaanterior = eti;
    }
    Length(e: Entorno): Traduccion {
        let codigo = document.createTextNode('');
        let indicet = VarGlobal.getInstance().contadorTemporales;
        let indeH = VarGlobal.getInstance().contadorTemporales;
        codigo.appendData(`t${indeH}=t${this.etiquetaanterior.indice};\n`)
        codigo.appendData(`t${indicet}=Heap[t${indeH}];\n`)
        return new Traduccion([new Etiqueta(`t${indicet}`,indicet)],codigo.textContent);
    }
}