import { Gramatica } from './Gramatica.js';
import { AST } from '../AST/AST';
import { Entorno, TipoEntorno } from '../Entorno/Entorno';
import { VarGlobal } from '../Global/VarGlobal';

export class Analizador {
    Traducir(c: string) {
        try {
            let res = Gramatica.parse(c);
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    
}