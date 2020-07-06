"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gramatica_js_1 = require("./Gramatica.js");
var Analizador = /** @class */ (function () {
    function Analizador() {
    }
    Analizador.prototype.Traducir = function (c) {
        try {
            var res = Gramatica_js_1.Gramatica.parse(c);
            console.log(res);
            return res;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    };
    return Analizador;
}());
exports.Analizador = Analizador;
//# sourceMappingURL=Analizador.js.map