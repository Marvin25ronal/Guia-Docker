import { Etiqueta } from "./Etiqueta";

export class Traduccion {
    private Etiquetas: Etiqueta[]
    private codigo: String
    etiquetaSalida: string
    constructor(et: Etiqueta[], codigo: string) {
        this.Etiquetas = et;
        this.codigo = codigo;
    }
    ObtenerEtiquetas() {
        return this.Etiquetas;
    }
    ObtenerCodigo() {
        return this.codigo;
    }
    setEtiquetaSalida(Salida: string) {
        this.etiquetaSalida = Salida;
    }
}