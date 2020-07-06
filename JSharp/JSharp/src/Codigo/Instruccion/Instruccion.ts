import { Nodo } from "../AST/Nodo";
import { Entorno } from "../Entorno/Entorno";
import { Traduccion } from "../3D/Traduccion";

export abstract class Instruccion extends Nodo {
    abstract TraducirInstruccion(e: Entorno): Traduccion;
}