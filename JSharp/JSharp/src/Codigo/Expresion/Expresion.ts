import { Nodo } from '../AST/Nodo';
import { Entorno } from '../Entorno/Entorno';
import { Traduccion } from '../3D/Traduccion';
import { TipoExp } from './TipoExp';

export abstract class Expresion extends Nodo {
    abstract TraducirExp(e: Entorno): Traduccion;
    abstract GetTipo(e: Entorno): TipoExp;
    islogical:boolean=false;
    isControle:boolean=false;
}