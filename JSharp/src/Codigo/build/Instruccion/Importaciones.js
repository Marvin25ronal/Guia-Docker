"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Instruccion_1 = require("./Instruccion");
var VarGlobal_1 = require("../Global/VarGlobal");
var Importacion = /** @class */ (function (_super) {
    __extends(Importacion, _super);
    function Importacion(lis, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.lista = lis;
        return _this;
    }
    Importacion.prototype.GenerarNodo = function (padre) {
        var codigo = [];
        var enlace = [];
        var indiImpor = VarGlobal_1.VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: "" + indiImpor, name: 'IMPORTACION', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } });
        enlace.push({ data: { source: "" + padre, target: "" + indiImpor, faveColor: '#6FB1FC', strength: 90 } });
        this.lista.forEach(function (item) {
            //console.log(item.GenerarNodo())
            var res = item.GenerarNodo(indiImpor);
            var json = JSON.parse(res.toString());
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        });
        return JSON.stringify({ nodo: codigo, enlace: enlace });
    };
    Importacion.prototype.TraducirInstruccion = function (e) {
        throw new Error("Method not implemented.");
    };
    return Importacion;
}(Instruccion_1.Instruccion));
exports.Importacion = Importacion;
//# sourceMappingURL=Importaciones.js.map