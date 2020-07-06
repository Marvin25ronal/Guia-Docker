import { Gramatica2 } from './Gramatica2.js';
export class Analizador2 {
    constructor() { }
    Traducir(c: string) {
        try {
            let res = Gramatica2.parse(c);
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }


}