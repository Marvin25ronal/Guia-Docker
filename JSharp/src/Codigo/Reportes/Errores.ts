enum TipoE {
    SEMANTICO = "SEMANTICO",
    LEXICO = "LEXICO",
    SINTACTICO = "SINTACTICO"
}
export class Errores {
    constructor(l: number, c: number, mensaje: String, d: number) {
        this.columna = c;
        this.linea = l;
        this.mensaje = mensaje;
        if (d == 1) {
            this.tipo = TipoE.LEXICO;
        } else if (d == 2) {
            this.tipo = TipoE.SINTACTICO;
        } else {
            this.tipo = TipoE.SEMANTICO;
        }
    }
    private _linea: number;
    public get linea(): number {
        return this._linea;
    }
    public set linea(value: number) {
        this._linea = value;
    }
    columna: number;
    private _mensaje: String;
    public get mensaje(): String {
        return this._mensaje;
    }
    public set mensaje(value: String) {
        this._mensaje = value;
    }
    private _tipo: TipoE;
    public get tipo(): TipoE {
        return this._tipo;
    }
    public set tipo(value: TipoE) {
        this._tipo = value;
    }
    public getTipo() {
        return this.tipo.toString();
    }

}