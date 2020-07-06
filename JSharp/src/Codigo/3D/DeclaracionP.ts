import { Codigo } from "./Codigo";

export class DeclaracionP extends Codigo {
    Codigo(): string {
        return `var ${this.p}=${this.valor[0]};\n`
    }
    p:string
    valor:string
    constructor(p,valor) {
        super(0, 0);
        this.p = p;
        this.valor=valor
    }
}