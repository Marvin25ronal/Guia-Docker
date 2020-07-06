"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gramatica2_js_1 = require("./Gramatica2.js");
var Analizador2 = /** @class */ (function () {
    function Analizador2() {
    }
    Analizador2.prototype.Traducir = function (c) {
        try {
            var res = Gramatica2_js_1.Gramatica2.parse(c);
            console.log(res);
            return res;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    };
    return Analizador2;
}());
exports.Analizador2 = Analizador2;
//# sourceMappingURL=Analizador2.js.map