export class TipoExp {
    tipo: Tipo;
    public tipoarray: Tipo;
    estructname: string
    constructor(t, id) {
        this.tipo = t;
        this.estructname = id;
    }
    getTipo() {
        return this.tipo;
    }
    toString() {
        return this.tipo;
    }
    esCadena() {
        return this.tipo == Tipo.STRING || this.tipo == Tipo.CHAR
    }
    isString() {
        return this.tipo == Tipo.STRING;
    }
    isChar() {
        return this.tipo == Tipo.CHAR;
    }
    isBoolean() {
        return this.tipo == Tipo.BOOLEAN;
    }
    esNumero() {
        return this.tipo == Tipo.INTEGER || this.tipo == Tipo.DOUBLE;
    }
    isInteger() {
        return this.tipo == Tipo.INTEGER;
    }
    isDouble() {
        return this.tipo == Tipo.DOUBLE;
    }
    isEstruct() {
        return this.tipo == Tipo.STRUCT;
    }
    isVar() {
        return this.tipo == Tipo.VAR;
    }
    isGlobal() {
        return this.tipo == Tipo.GLOBAL;
    }
    isConst() {
        return this.tipo == Tipo.CONST;
    }
    isVoid() {
        return this.tipo == Tipo.VOID;
    }
    isArray() {
        return this.tipo == Tipo.ARRAY;
    }
    sonCompatibles(Objetivo: TipoExp): boolean {
        if (this.isArray() && Objetivo.isArray()) {
            let tipo1 = new TipoExp(this.tipoarray, this.estructname);
            let tipo2 = new TipoExp(Objetivo.tipoarray, Objetivo.estructname);
            return tipo1.sonCompatibles(tipo2);
        }
        if (Objetivo.tipo == this.tipo) {
            return true;
        }
        if (this.isChar()) {
            console.log('este')
            if (Objetivo.esNumero()) {
                return true;
            } else if (Objetivo.isChar()) {
                return true;
            }
        } else if (this.isInteger()) {
            if (Objetivo.isInteger() || Objetivo.isDouble()) {
                return true;
            }
        }
        return false;
    }
}
export enum Tipo {
    INTEGER = "INTEGER",
    DOUBLE = "DOUBLE",
    BOOLEAN = "BOOLEAN",
    CHAR = "CHAR",
    STRING = "STRING",
    VAR = "VAR",
    CONST = "CONST",
    STRUCT = "STRUCT",
    GLOBAL = "GLOBAL",
    NORMAL = "NORMAL",
    VOID = "VOID",
    ARRAY = "ARRAY"
}