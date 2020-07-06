import { Instruccion } from "./Instruccion";
import { Identificador } from "../Expresion/Identificador";
import { VarGlobal } from "../Global/VarGlobal";
import { Traduccion } from "../3D/Traduccion";
export class Importacion extends Instruccion {

    public GenerarNodo(padre: number) {
        let codigo = [];
        let enlace = [];
        let indiImpor = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${indiImpor}`, name: 'IMPORTACION', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${padre}`, target: `${indiImpor}`, faveColor: '#6FB1FC', strength: 90 } })
        this.lista.forEach(function (item: Identificador) {
            //console.log(item.GenerarNodo())
            let res = item.GenerarNodo(indiImpor);
            let json = JSON.parse(res.toString());
            codigo=codigo.concat(json.nodo);
            enlace=enlace.concat(json.enlace);
        });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }


    lista: Identificador[];
    constructor(lis, linea, columna) {
        super(linea, columna);
        this.lista = lis;
    }
    TraducirInstruccion(e: import("../Entorno/Entorno").Entorno): Traduccion {
        throw new Error("Method not implemented.");
    }

}