import { Codigo } from "./Codigo"

export class Bloque {
    private _etiqueta: string;
    public get etiqueta(): string {
        return this._etiqueta;
    }
    public set etiqueta(value: string) {
        this._etiqueta = value;
    }
    lista: Codigo[]
    constructor(etiqueta) {
        this.etiqueta = etiqueta;
        this.lista=[];
    }
    insertar(a: Codigo) {
        this.lista.push(a);
    }
}