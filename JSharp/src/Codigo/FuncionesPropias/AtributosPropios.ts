import { AccesoAtributo } from "../Expresion/AccesoAtributo";
import { Etiqueta } from "../3D/Etiqueta";
import { TipoExp, Tipo } from "../Expresion/TipoExp";
import { Entorno } from "../Entorno/Entorno";
import { VarGlobal } from "../Global/VarGlobal";
import { Errores } from "../Reportes/Errores";
import { AtributoLength } from "./AtributoLength";

export class AtributosPropios {
    acceso: AccesoAtributo
    etiquetaanterior: Etiqueta
    tipoanterior: TipoExp
    tiposintetizado: TipoExp
    constructor(acc, ant, tipo) {
        this.acceso = acc;
        this.etiquetaanterior = ant;
        this.tipoanterior = tipo;
    }
    Generar(e: Entorno) {
        //let codigo=``
        let linea = this.acceso.getLinea();
        let columna = this.acceso.getColumna();
        if (this.acceso.id.val.toLowerCase() == "length") {
            if (this.tipoanterior.isArray()) {
                let atributo = new AtributoLength(this.etiquetaanterior);
                let traduc = atributo.Length(e);
                this.tiposintetizado = new TipoExp(Tipo.INTEGER, null);
                return traduc;
            } else {
                VarGlobal.getInstance().agregarError(new Errores(linea, columna, `El atributo length solo esta disponible para ARRAY no de tipo ${this.tipoanterior.tipo.toString()}`, 3))
                return null;
            }
        }

    }
}