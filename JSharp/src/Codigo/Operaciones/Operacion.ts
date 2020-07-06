import { Expresion } from '../Expresion/Expresion';
import { Signo } from './Signo';
import { Traduccion } from '../3D/Traduccion';


export abstract class Operacion extends Expresion {
    op1: Expresion;
    op2: Expresion;
    op: Signo;
    constructor(op1: Expresion, op2: Expresion, op: Signo, linea: number, columna: number) {
        super(linea, columna);
        this.op1 = op1;
        this.op2 = op2;
        this.op = op;
    }
    TraducirExp(e: import("../Entorno/Entorno").Entorno): Traduccion {
        throw new Error("Method not implemented.");
    }
    ObtenerSignoString(): String {
        switch (this.op) {
            case Signo.SUMA:
                return "+";
            case Signo.RESTA:
                return "-";
            case Signo.MULTIPLICACION:
                return "*";
            case Signo.DIVISION:
                return "/";
            case Signo.MODULO:
                return "%";
            case Signo.POTENCIA:
                return "^";
            case Signo.MAYOR:
                return ">";
            case Signo.MAYORI:
                return ">="
            case Signo.MENOR:
                return "<"
            case Signo.MENORI:
                return "<="
            case Signo.OR:
                return "||"
            case Signo.AND:
                return "&&"
            case Signo.NOT:
                return "!"
            case Signo.IGUAL_IGUAL:
                return "==";
            case Signo.DISTINTO:
                return "!="
            case Signo.TRIPLE_IGUAL:
                return "==="

        }
    }
}