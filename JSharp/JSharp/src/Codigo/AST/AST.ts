import { Nodo } from "./Nodo";
import { VarGlobal } from '../Global/VarGlobal';
import { Entorno, TipoEntorno } from "../Entorno/Entorno";
import { Declaracion } from "../Instruccion/Declaracion";
import { MetodosPropios } from "./MetodosPropios";
import { DecFuncion } from "../Instruccion/DecFuncion";
import { Simbolo } from "../Entorno/Simbolo";
import { Funcion } from "../Entorno/Funcion";


export class AST {
    constructor(acciones: Nodo[]) {
        this.acciones = acciones;
    }

    private _acciones: Nodo[];
    public get acciones(): Nodo[] {
        return this._acciones;
    }
    public set acciones(value: Nodo[]) {
        this._acciones = value;
    }
    Ejecutar(e: Entorno) {
        VarGlobal.getInstance().limpiar();
        let enuevo = new Entorno(null, TipoEntorno.GLOBAL);
        //iniciamos todo
        let codigo = `var Stack[];\nvar Heap[];\nvar P=0;\nvar H=0;\nvar E=0;\n`;
        let etiqueta1 = VarGlobal.getInstance().contadorSaltos;
        //importaciones
        //Declarar variables globales
        codigo += this.DeclararGlobales(enuevo);
        codigo += `goto L${etiqueta1};\n`;
        codigo += this.DefinirMetodosPropios();
        this.DeclararMetodos(enuevo);
        codigo += this.CodigoMetodos(enuevo);
        //Reservar espacio
        codigo += this.ReservarEspacio(enuevo);
        codigo += `L${etiqueta1}:\n`
        codigo += this.MetodoBegin();
        //crear todos los temporales
        codigo = VarGlobal.getInstance().ObtenerCreacionTemporales() + codigo;
        return JSON.stringify({ code: codigo, error: VarGlobal.getInstance().lErrores });
    }
    DeclararMetodos(e): void {
        //let codigo = "";
        for (let i = 0; i < this.acciones.length; i++) {
            if (this.acciones[i] instanceof DecFuncion) {
                let fun = this.acciones[i] as DecFuncion;
                //let trad = fun.TraducirInstruccion(e);
                let declara = fun.CrearFuncion(e);
                if (declara == false) { continue; }
                //.ObtenerCodigo();
                //VarGlobal.getInstance().pilaTemporales = [];
            }
        }
        //return codigo;
    }
    CodigoMetodos(e): string {
        let codigo = '';
        let tabla = e.tabla;
        tabla.forEach((value: Simbolo, key: string) => {
            if (value instanceof Funcion) {
                let fun = value as Funcion;
                let traduc = fun.cuerpoparatraducir.TraducirInstruccion(e);
                if (traduc == null) { return; }
                codigo += traduc.ObtenerCodigo();
                VarGlobal.getInstance().pilaTemporales = [];
            }
        })
        return codigo;
    }
    MetodoBegin() {
        let codigo = "";

        // codigo = `P=P+2;\n`;
        codigo += `call FUNCION_VOID_principal;\n`
        //codigo += `P=P-2;\n`
        return codigo;
    }
    ReservarEspacio(e: Entorno): string {
        let codigo = "";
        return codigo;
    }
    DeclararGlobales(e: Entorno): string {
        let codigo = "";
        let inst = this.acciones;
        inst.forEach(function (value) {
            if (value instanceof Declaracion) {
                let dec = value as Declaracion;
                let traduc = dec.TraducirInstruccion(e);
                if (traduc == null) {
                    //sabemos que sucedio un error
                    return null;
                } else {
                    codigo += traduc.ObtenerCodigo();
                }
            }
        });
        return codigo;
    }
    DefinirMetodosPropios(): string {
        let codigo = "";
        let metodos = new MetodosPropios();
        codigo = metodos.Construir();
        return codigo;
    }
    GenerarArbol() {
        let codigo = [];
        let enlace = [];
        let indice = VarGlobal.getInstance().contadorGrafo;
        let indice2 = VarGlobal.getInstance().contadorGrafo;
        codigo.push({ data: { id: `${indice}`, name: 'INICIO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        codigo.push({ data: { id: `${indice2}`, name: 'CUERPO', weight: 100, faveColor: '#162557', faveShape: 'rectangle' } })
        enlace.push({ data: { source: `${indice}`, target: `${indice2}`, faveColor: '#6FB1FC', strength: 90 } });
        this.acciones.forEach(function (item: Nodo) {
            let cad = item.GenerarNodo(indice2);
            let json = JSON.parse(cad);
            codigo = codigo.concat(json.nodo);
            enlace = enlace.concat(json.enlace);
        });

        return JSON.stringify({ nodo: codigo, enlace: enlace });
    }
    GenerarTabla(){
        VarGlobal.getInstance().limpiar();
        let enuevo = new Entorno(null, TipoEntorno.GLOBAL);
        //iniciamos todo
        let codigo = `var Stack[];\nvar Heap[];\nvar P=0;\nvar H=0;\nvar E=0;\n`;
        let etiqueta1 = VarGlobal.getInstance().contadorSaltos;
        //importaciones
        //Declarar variables globales
        codigo += this.DeclararGlobales(enuevo);
        codigo += `goto L${etiqueta1};\n`;
        codigo += this.DefinirMetodosPropios();
        this.DeclararMetodos(enuevo);
        codigo += this.CodigoMetodos(enuevo);
        //Reservar espacio
        codigo += this.ReservarEspacio(enuevo);
        codigo += `L${etiqueta1}:\n`
        codigo += this.MetodoBegin();
        //crear todos los temporales
        codigo = VarGlobal.getInstance().ObtenerCreacionTemporales() + codigo;
        console.log(VarGlobal.getInstance().CrearTabla());
        return JSON.stringify({ code: codigo, error: VarGlobal.getInstance().lErrores ,entornos:VarGlobal.getInstance().CrearTabla()});
    }

}