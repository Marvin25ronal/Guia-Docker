"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var linked_list_typescript_1 = require("linked-list-typescript");
var Lista = /** @class */ (function () {
    function Lista() {
    }
    Lista.prototype.crearNuevaLinkedList = function (num) {
        switch (num) {
            case 0:
                return new linked_list_typescript_1.LinkedList();
        }
    };
    return Lista;
}());
exports.Lista = Lista;
//# sourceMappingURL=LinkedList.js.map