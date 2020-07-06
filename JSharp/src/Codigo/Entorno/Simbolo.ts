import { Tipo, TipoExp } from "../Expresion/TipoExp";

export abstract class Simbolo{
    linea:number;
    columna:number;
    tipo:TipoExp
    constructor(tipo,linea,columna){
        this.linea=linea;
        this.columna=columna;
        this.tipo=tipo;
    }
    getTipoPrimario(){
        return this.tipo.tipo;
    }
    getTipoSecundario(){
        return this.tipo.estructname;
    }
}