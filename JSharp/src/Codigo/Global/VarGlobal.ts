import { Errores } from "../Reportes/Errores";
import { Entorno } from "../Entorno/Entorno";
import { Simbolo } from "../Entorno/Simbolo";
import { Variable } from "../Entorno/Variable";
import { Funcion } from "../Entorno/Funcion";
import { Regla } from "../3D/Regla";
import { Arreglo } from "../Entorno/Arreglo";


export class VarGlobal {
    pilaEntornos: Entorno[];
    bloqueo: boolean;
    pilareglas: Regla[];
    private _pilaTemporales: number[];
    public get pilaTemporales(): number[] {
        return this._pilaTemporales;
    }
    public set pilaTemporales(value: number[]) {
        this._pilaTemporales = value;
    }
    private _lErrores: Errores[];
    public get lErrores(): Errores[] {
        return this._lErrores;
    }
    public set lErrores(value: Errores[]) {
        this._lErrores = value;
    }
    private static instance: VarGlobal;
    private _contadorGrafo: number;
    private _contadorTemporales: number;
    public get contadorTemporales(): number {
        return this._contadorTemporales++;
    }
    public set contadorTemporales(value: number) {
        this._contadorTemporales = value;
    }

    public get contadorGrafo(): number {
        return this._contadorGrafo++;
    }
    public set contadorGrafo(value: number) {
        this._contadorGrafo = value;
    }
    private _contadorSaltos: number;
    public get contadorSaltos(): number {
        return this._contadorSaltos++;
    }
    public set contadorSaltos(value: number) {
        this._contadorSaltos = value;
    }
    private constructor() {
        this.contadorGrafo = 0;
        this.contadorTemporales = 3;
        this.contadorSaltos = 0;
        this.lErrores = [];
        this.pilaTemporales = [];
        this.bloqueo = false;
        this.pilaTemporales = [];
    }
    public limpiar() {
        this._lErrores = []
        this._contadorTemporales = 3;
        this._contadorSaltos = 0;
        this.pilaEntornos = [];
    }
    public static getInstance(): VarGlobal {
        if (!VarGlobal.instance) {
            VarGlobal.instance = new VarGlobal();
        }
        return VarGlobal.instance;
    }
    public agregarError(err: Errores) {
        this._lErrores.push(err)

    }
    public GrabarCadena(cadena: String): string {
        let res = "";
        let arreglo = cadena.split('');
        console.log(cadena);
        let indice = VarGlobal.getInstance().contadorTemporales;
        res = `t${indice}=H;\n`
        for (let i = 0; i < arreglo.length; i++) {
            res += `Heap[H]=${arreglo[i].charCodeAt(0)};\n`
            res += `H=H+1;\n`
        }
        res += `Heap[H]=-1;\n`
        res += `H=H+1;\n`
        return JSON.stringify({ codigo: res, indice: indice, etiqueta: `t${indice}` });
    }
    public ObtenerCreacionTemporales() {
        let codigo = "var "
        for (let i = 0; i < this._contadorTemporales; i++) {
            codigo += `t${i},`
        }
        return codigo.substring(0, codigo.length - 1) + ";\n";
    }
    public Apilar(i: number) {
        if (this.bloqueo) {
            return;
        }
        if (this._pilaTemporales.includes(i)) {
            let indice = this.pilaTemporales.indexOf(i);
            this.pilaTemporales.splice(indice, 1);
            return;
        }
        this.pilaTemporales.push(i);
    }
    public CrearTabla() {
        let tabla: any = []
        for (let i = 0; i < this.pilaEntornos.length; i++) {
            let e = this.pilaEntornos[i];
            e.tabla.forEach((value: Simbolo, key: string) => {
                if (value instanceof Variable) {
                    tabla.push({ id: key, nombre: value.nombre, tipo: value.tipo, ambito: value.ambito, linea: value.linea, columna: value.columna, tam: 0, par: null })
                } else if (value instanceof Funcion) {
                    let valu = value as Funcion;
                    while (valu != null) {
                        tabla.push({ id: key, nombre: valu.nombre, tipo: valu.tipo, ambito: valu.ambito, linea: valu.linea, columna: valu.columna, tam: 0, par: valu.parametros })
                        valu = valu.siguiente;
                    }
                }else if(value instanceof Arreglo){
                    tabla.push({id:key,nombre:value.nombre,tipo:value.tipo,ambito:value.ambito,linea:value.linea,columna:value.columna,tam:value.ref})
                }
            });
        }
        return tabla;
    }
    public AgregarRegla(regla, linea, columna,eliminado) {
        this.pilareglas.push(new Regla(regla, linea, columna,eliminado));
    }
}