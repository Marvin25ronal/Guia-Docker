import { VarGlobal } from "../Global/VarGlobal";
const nombre = "proc marvin_201602520";
export class MetodosPropios {
    constructor() {
    }
    Construir() {
        let codigo = this.MetodoImprimirCadena();
        codigo += this.MetodoSumarCadenas();
        codigo += this.MetodoConvertirBooleanoString();
        codigo += this.MetodoConvertirIntegertoString();
        codigo += this.MetodoCambiarEnteroporchar();
        codigo += this.MetodoPotencia();
        codigo += this.MetodoToEqualsString();
        codigo += this.MetodoConvertirDoubletoString();
        codigo += this.MetodoPrintEntero();
        codigo += this.MetodoPrintDouble();
        codigo += this.MetodoCrearArray();
        codigo += this.MetodoLengthString();
        codigo += this.MetodoToCharArray();
        codigo += this.MetodoToUpperCase();
        codigo += this.MetodoTolowerCase();
        codigo += this.MetodoLinial();
        return codigo + '\n';
    }
    MetodoImprimirCadena() {
        let codigo = "\n";
        let indicet100 = VarGlobal.getInstance().contadorTemporales;
        let indicet101 = VarGlobal.getInstance().contadorTemporales;
        let etiqueta1 = VarGlobal.getInstance().contadorSaltos;
        let etiqueta2 = VarGlobal.getInstance().contadorSaltos;
        codigo += `${nombre}_printCadena begin\nt${indicet100}=t0;\nL${etiqueta1}:\nt${indicet101}=Heap[t${indicet100}];\nif (t${indicet101} == -1) goto L${etiqueta2};\n`;
        codigo += `print("%c",t${indicet101});\nt${indicet100}=t${indicet100}+1;\ngoto L${etiqueta1};\nL${etiqueta2}:\nprint("%c",10);\nend\n`;
        return codigo;
    }
    MetodoSumarCadenas() {
        let codigo = '\n';
        let inidice100 = VarGlobal.getInstance().contadorTemporales;
        let inidice200 = VarGlobal.getInstance().contadorTemporales;
        let inidice1100 = VarGlobal.getInstance().contadorTemporales;
        let inidice2200 = VarGlobal.getInstance().contadorTemporales;
        let inidicetnuevo = VarGlobal.getInstance().contadorTemporales;
        let inidicetnuevo2 = VarGlobal.getInstance().contadorTemporales;
        let L0 = VarGlobal.getInstance().contadorSaltos;
        let L1 = VarGlobal.getInstance().contadorSaltos;
        let L2 = VarGlobal.getInstance().contadorSaltos;
        let L3 = VarGlobal.getInstance().contadorSaltos;
        codigo += `${nombre}_SumarCadena begin \nt${inidice100}=t1;\nt0=H;\nL${L0}:\nt${inidice200}=Heap[t${inidice100}];\nt${inidicetnuevo}=H;\nif(t${inidice200}==-1) goto L${L1};\nHeap[t${inidicetnuevo}]=t${inidice200};\n`;
        codigo += `t${inidice100}=t${inidice100}+1;\nH=H+1;\ngoto L${L0};\nL${L1}:\nt${inidice1100}=t2;\n`;
        codigo += `L${L2}:\nt${inidice2200}=Heap[t${inidice1100}];\nt${inidicetnuevo2}=H;\nif(t${inidice2200}==-1) goto L${L3};\nHeap[t${inidicetnuevo2}]=t${inidice2200};\n`;
        codigo += `t${inidice1100}=t${inidice1100}+1;\nH=H+1;\ngoto L${L2};\nL${L3}:\nt${inidicetnuevo2}=H;\nHeap[t${inidicetnuevo2}]=-1;\nH=H+1;\nend\n`;
        return codigo;
    }
    MetodoConvertirBooleanoString() {
        let codigo = '\n';
        let t1 = VarGlobal.getInstance().contadorTemporales;
        let L0 = VarGlobal.getInstance().contadorSaltos;
        let tauxprimero = VarGlobal.getInstance().contadorTemporales;
        let taux = VarGlobal.getInstance().contadorTemporales;
        let L2 = VarGlobal.getInstance().contadorSaltos;
        let strue = "true";
        let sfalse = "false";
        codigo += `${nombre}_ConvertirBooleanoString begin\nt${t1}=t0;\nif(t${t1}==0) goto L${L0};\nt${tauxprimero}=H;\nt${taux}=H;\nHeap[t${taux}]=${strue.charCodeAt(0)};\n`;
        codigo += `H=H+1;\nt${taux}=H;\nHeap[t${taux}]=${strue.charCodeAt(1)};\n`;
        codigo += `H=H+1;\nt${taux}=H;\nHeap[t${taux}]=${strue.charCodeAt(2)};\n`;
        codigo += `H=H+1;\nt${taux}=H;\nHeap[t${taux}]=${strue.charCodeAt(3)};\n`;
        codigo += `H=H+1;\nt${taux}=H;\nHeap[t${taux}]=-1;\n`;
        codigo += `H=H+1;\ngoto L${L2};\nL${L0}:\nt${tauxprimero}=H;\nt${taux}=H;\nHeap[t${taux}]=${sfalse.charCodeAt(0)};\n`;
        codigo += `H=H+1;\nt${taux}=H;\nHeap[t${taux}]=${sfalse.charCodeAt(1)};\n`;
        codigo += `H=H+1;\nt${taux}=H;\nHeap[t${taux}]=${sfalse.charCodeAt(2)};\n`;
        codigo += `H=H+1;\nt${taux}=H;\nHeap[t${taux}]=${sfalse.charCodeAt(3)};\n`;
        codigo += `H=H+1;\nt${taux}=H;\nHeap[t${taux}]=${sfalse.charCodeAt(4)};\n`;
        codigo += `H=H+1;\nt${taux}=H;\nHeap[t${taux}]=-1;\n`;
        codigo += `H=H+1;\nL${L2}:\nt0=t${tauxprimero};\nend\n`;
        return codigo;
    }
    MetodoConvertirDoubletoString() {
        let codigo = document.createTextNode('');
        let tentero = VarGlobal.getInstance().contadorTemporales;
        let tnumero = VarGlobal.getInstance().contadorTemporales;
        let tdecimal = VarGlobal.getInstance().contadorTemporales;
        let tref = VarGlobal.getInstance().contadorTemporales;
        let taux = VarGlobal.getInstance().contadorTemporales;
        let th = VarGlobal.getInstance().contadorTemporales;
        let L0 = VarGlobal.getInstance().contadorSaltos;
        let L1 = VarGlobal.getInstance().contadorSaltos;
        let L2 = VarGlobal.getInstance().contadorSaltos;
        let presisi = VarGlobal.getInstance().contadorSaltos;
        codigo.appendData(`${nombre}_DoubleToString begin\n`);
        codigo.appendData(`t${tnumero}=t0;\n`);
        codigo.appendData(`t${tdecimal}=t${tnumero}%1;\n`);
        codigo.appendData(`t${tentero}=t${tnumero}-t${tdecimal};\n`);
        codigo.appendData(`t0=t${tentero};\n`);
        codigo.appendData(`call marvin_201602520_ConvertirIntegertoString;\n`);
        codigo.appendData(`call marvin_201602520_CambiarNumeroAscii;\n`);
        codigo.appendData(`t${tref}=t0;\n`);
        codigo.appendData(`H=H-1;\n`);
        codigo.appendData(`t${th}=H;\n`);
        codigo.appendData(`Heap[t${th}]=46;\n`);
        codigo.appendData(`H=H+1;\n`);
        codigo.appendData(`t${presisi}=0;\n`)
        codigo.appendData(`L${L0}:\n`);
        codigo.appendData(`t${taux}=t${tdecimal}%1;\n`);
        codigo.appendData(`if(t${presisi}>6) goto L${L2};\n`)
        codigo.appendData(`if(t${taux}<>0) goto L${L1};\n`);
        codigo.appendData(`goto L${L2};\n`);
        codigo.appendData(`L${L1}:\n`);
        codigo.appendData(`t${presisi}=t${presisi}+1;\n`)
        codigo.appendData(`t${tdecimal}=t${tdecimal}*10;\n`);
        codigo.appendData(`goto L${L0};\n`);
        codigo.appendData(`L${L2}:\n`);
        codigo.appendData(`t0=t${tdecimal};\n`);
        codigo.appendData(`call marvin_201602520_ConvertirIntegertoString;\n`);
        codigo.appendData(`call marvin_201602520_CambiarNumeroAscii;\n`);
        codigo.appendData(`t0=t${tref};\n`)
        codigo.appendData('end\n');
        return codigo.textContent;
    }
    MetodoConvertirIntegertoString() {
        let codigo = "\n";
        let t1 = VarGlobal.getInstance().contadorTemporales;
        let tcontador = VarGlobal.getInstance().contadorTemporales;
        let tdef = VarGlobal.getInstance().contadorTemporales;
        let torigen = VarGlobal.getInstance().contadorTemporales;
        let th = VarGlobal.getInstance().contadorTemporales;
        let taux = VarGlobal.getInstance().contadorTemporales;
        let L0 = VarGlobal.getInstance().contadorSaltos;
        let L1 = VarGlobal.getInstance().contadorSaltos;
        let L2 = VarGlobal.getInstance().contadorSaltos;
        let L3 = VarGlobal.getInstance().contadorSaltos;
        let L4 = VarGlobal.getInstance().contadorSaltos;
        let L5 = VarGlobal.getInstance().contadorSaltos;
        let L6 = VarGlobal.getInstance().contadorSaltos;
        let L7 = VarGlobal.getInstance().contadorSaltos;
        let L8 = VarGlobal.getInstance().contadorSaltos;
        let L9 = VarGlobal.getInstance().contadorSaltos;
        let L10 = VarGlobal.getInstance().contadorSaltos;
        let L11 = VarGlobal.getInstance().contadorSaltos;
        let L12 = VarGlobal.getInstance().contadorSaltos;
        let L100 = VarGlobal.getInstance().contadorSaltos;
        let L101 = VarGlobal.getInstance().contadorSaltos;
        let L200 = VarGlobal.getInstance().contadorSaltos;
        let L201 = VarGlobal.getInstance().contadorSaltos;
        let Lsalida = VarGlobal.getInstance().contadorSaltos;
        let salidaultima = VarGlobal.getInstance().contadorSaltos;
        let tbandaera = VarGlobal.getInstance().contadorTemporales;
        codigo += `${nombre}_ConvertirIntegertoString begin\nt${t1}=t0;\nt${tbandaera}=0;\nif(t${t1}<0) goto L${L200};\ngoto L${L201};\nL${L200}:\nt${t1}=t${t1}*-1;\nt${tbandaera}=1;\nt${th}=H;\nHeap[t${th}]=45;\nH=H+1;\nL${L201}:\n`
        codigo += `if(t${t1}==0) goto L${L100};\ngoto L${L101};\nL${L100}:\nt${taux}=H;\nHeap[t${taux}]=0;\nH=H+1;\nt${torigen}=t${taux};\ngoto L${L12};\nL${L101}:\nt${tcontador}=0; \nt${tdef}=1; \nt${torigen}=H; \nL${L0}: \nif(t${tdef} < t${t1}) goto L${L1}; \n`;
        codigo += `goto L${L2}; \nL${L1}: \nt${tdef}=t${tdef}* 10; \ngoto L${L0}; \nL${L2}: \nif(t${tdef} <> t${t1}) goto L${L3}; \ngoto L${L4}; \nL${L3}: \nt${tdef}=t${tdef} /10;\n`;
        codigo += `L${L4}:\nL${L5}:\nif(t${tdef}>0) goto L${L6};\ngoto L${L7};\nL${L6}:\nif (t${t1}==0) goto L${L7};\nt${t1}=t${t1}-t${tdef};\nt${tcontador}=t${tcontador}+1;\n`
        codigo += `if(t${t1}<t${tdef}) goto L${L8};\ngoto L${L9};\nL${L8}:\nt${th}=H;\nHeap[t${th}]=t${tcontador};\nH=H+1;\nt${tcontador}=0;\nt${tdef}=t${tdef}/10;\nL${L9}:\ngoto L${L5};\n`;
        codigo += `L${L7}:\nL${L10}:\nif (t${tdef}>0) goto L${L11};\ngoto L${L12};\nL${L11}:\nif(t${tdef}<1)goto L${L12};\nt${th}=H;\nHeap[t${th}]=0;\nt${tdef}=t${tdef}/10;\nH=H+1;\ngoto L${L10};\nL${L12}:\n`;
        codigo += `t${th}=H;\nHeap[t${th}]=-1;\nH=H+1;\nt0=t${torigen};\nif(t${tbandaera}<>1)goto L${Lsalida};\nt${torigen}=t${torigen}-1;t0=t${torigen};\nL${Lsalida}:\nend\n`;
        return codigo;
    }
    MetodoCambiarEnteroporchar() {
        let t100 = VarGlobal.getInstance().contadorTemporales;
        let t101 = VarGlobal.getInstance().contadorTemporales;
        let torigen = VarGlobal.getInstance().contadorTemporales;
        let L0 = VarGlobal.getInstance().contadorSaltos;
        let L1 = VarGlobal.getInstance().contadorSaltos;
        let L2 = VarGlobal.getInstance().contadorSaltos;
        let L3 = VarGlobal.getInstance().contadorSaltos;
        let L4 = VarGlobal.getInstance().contadorSaltos;
        let L5 = VarGlobal.getInstance().contadorSaltos;
        let L6 = VarGlobal.getInstance().contadorSaltos;
        let L7 = VarGlobal.getInstance().contadorSaltos;
        let L8 = VarGlobal.getInstance().contadorSaltos;
        let L9 = VarGlobal.getInstance().contadorSaltos;
        let L10 = VarGlobal.getInstance().contadorSaltos;
        let L306 = VarGlobal.getInstance().contadorSaltos;
        let Lfinal = VarGlobal.getInstance().contadorSaltos;
        let codigo = '';
        codigo += `${nombre}_CambiarNumeroAscii begin\nt${t100}=t0;\nL${L0}:\nt${t101}=Heap[t${t100}];\nif(t${t101}==-1) goto L${L1};\nif(t${t101}<>0) goto L${L2};\nt${torigen}=48;\ngoto L${Lfinal};\n`;
        codigo += `L${L2}:\nif(t${t101}<>1)goto L${L3};\nt${torigen}=49;\ngoto L${Lfinal};\n`
        codigo += `L${L3}:\nif(t${t101}<>2)goto L${L4};\nt${torigen}=50;\ngoto L${Lfinal};\n`
        codigo += `L${L4}:\nif(t${t101}<>3)goto L${L5};\nt${torigen}=51;\ngoto L${Lfinal};\n`
        codigo += `L${L5}:\nif(t${t101}<>4)goto L${L6};\nt${torigen}=52;\ngoto L${Lfinal};\n`
        codigo += `L${L6}:\nif(t${t101}<>5)goto L${L7};\nt${torigen}=53;\ngoto L${Lfinal};\n`
        codigo += `L${L7}:\nif(t${t101}<>6)goto L${L8};\nt${torigen}=54;\ngoto L${Lfinal};\n`
        codigo += `L${L8}:\nif(t${t101}<>7)goto L${L9};\nt${torigen}=55;\ngoto L${Lfinal};\n`
        codigo += `L${L9}:\nif(t${t101}<>8)goto L${L10};\nt${torigen}=56;\ngoto L${Lfinal};\n`
        codigo += `L${L10}:\nif(t${t101}<>9)goto L${L306};\nt${torigen}=57; \ngoto L${Lfinal};\n`
        codigo += `L${L306}:\nt${torigen}=t${t101};\n`
        codigo += `L${Lfinal}:\nHeap[t${t100}]=t${torigen};\nt${t100}=t${t100}+1;\ngoto L${L0};\nL${L1}:\nend\n`;
        return codigo;
    }
    MetodoPotencia() {
        let tbase = VarGlobal.getInstance().contadorTemporales;
        let televar = VarGlobal.getInstance().contadorTemporales;
        let tresul = VarGlobal.getInstance().contadorTemporales;
        let L0 = VarGlobal.getInstance().contadorSaltos;
        let Lprueba1 = VarGlobal.getInstance().contadorSaltos;
        let Lpruebafallida = VarGlobal.getInstance().contadorSaltos;
        let L1 = VarGlobal.getInstance().contadorSaltos;
        let L2 = VarGlobal.getInstance().contadorSaltos;
        let L3 = VarGlobal.getInstance().contadorSaltos;
        let L4 = VarGlobal.getInstance().contadorSaltos;
        let codigo = '\n';
        codigo += `${nombre}_Potencia begin\nt${tbase}=t1;\nt${televar}=t2;\nt${tresul}=1;\nif(t${tbase}<>0)goto L${Lprueba1};\nif(t${televar}==0)goto L${Lpruebafallida};\nL${Lprueba1}:\nif (t${televar}>=0) goto L${L0};\nL${Lpruebafallida}:\nE=1;\ngoto L${L1};\nL${L0}:\nL${L2}:\nif(t${televar}>=1) goto L${L3};\ngoto L${L4};\nL${L3}:\nt${tresul}=t${tresul}*t${tbase};\nt${televar}=t${televar}-1;\n`;
        codigo += `goto L${L2};\nL${L4}:\nL${L1}:\nt0=t${tresul};\nend\n`;
        return codigo;
    }
    MetodoToEqualsString() {
        let ta = VarGlobal.getInstance().contadorTemporales;
        let tb = VarGlobal.getInstance().contadorTemporales;
        let taux1 = VarGlobal.getInstance().contadorTemporales;
        let taux2 = VarGlobal.getInstance().contadorTemporales;
        let tres = VarGlobal.getInstance().contadorTemporales;
        let L0 = VarGlobal.getInstance().contadorSaltos;
        let SalidaA = VarGlobal.getInstance().contadorSaltos;
        let SalidaB = VarGlobal.getInstance().contadorSaltos;
        let incre = VarGlobal.getInstance().contadorSaltos;
        let Falso = VarGlobal.getInstance().contadorSaltos;
        let Iguales = VarGlobal.getInstance().contadorSaltos;
        let Salida = VarGlobal.getInstance().contadorSaltos;
        let codigo = `\n`;
        codigo += `${nombre}_ToStringEquals begin\nt${ta}=t1;\nt${tb}=t2;\nL${L0}:\nt${taux1}=Heap[t${ta}];\nt${taux2}=Heap[t${tb}];\n`;
        codigo += `t${tres}=0;\nif(t${taux1}==-1)goto L${SalidaA};\nif(t${taux2}==-1)goto L${SalidaB};\nif(t${taux1}==t${taux2})goto L${incre};\n`
        codigo += `goto L${Falso};\nL${incre}:\nt${ta}=t${ta}+1;\nt${tb}=t${tb}+1;\ngoto L${L0};\nL${SalidaA}:\nif(t${taux2}==-1)goto L${Iguales};\n`
        codigo += `goto L${Falso};\nL${SalidaB}:\nif(t${taux1}==-1)goto L${Iguales};\ngoto L${Falso};\nL${Iguales}:\nt${tres}=1;\ngoto L${Salida};\nL${Falso}:\nt${tres}=0;\nL${Salida}:\nt0=t${tres};\nend\n`;
        return codigo;
    }
    MetodoPrintEntero() {
        let ta = VarGlobal.getInstance().contadorTemporales;
        let codigo = '\n';
        codigo += `${nombre}_PrintEntero begin\n`;
        codigo += `t${ta}=t0;\nprint("%i",t${ta});\nprint("%c",10);\n`
        codigo += `end\n`;
        return codigo;
    }
    MetodoPrintDouble() {
        let ta = VarGlobal.getInstance().contadorTemporales;
        let codigo = '\n';
        codigo += `${nombre}_PrintDouble begin\n`;
        codigo += `t${ta}=t0;\nprint("%d",t${ta});\nprint("%c",10);\n`
        codigo += `end\n`;
        return codigo;
    }
    MetodoCrearArray() {
        let tvalor = VarGlobal.getInstance().contadorTemporales;
        let tref = VarGlobal.getInstance().contadorTemporales;
        let L0 = VarGlobal.getInstance().contadorSaltos;
        let th = VarGlobal.getInstance().contadorTemporales;
        let salida = VarGlobal.getInstance().contadorSaltos;
        let codigo = document.createTextNode('\n');
        let tinicio = VarGlobal.getInstance().contadorTemporales;
        codigo.appendData(`${nombre}_CrearArray begin\n`)
        codigo.appendData(`t${tinicio}=H;\n`)
        codigo.appendData(`Heap[t${tinicio}]=t0;\n`)
        codigo.appendData(`H=H+1;\n`)
        codigo.appendData(`t${tvalor}=t0;\n`)
        codigo.appendData(`t${tref}=H;\n`)
        codigo.appendData(`L${L0}:\n`)
        codigo.appendData(`if(t${tvalor}<=0) goto L${salida};\n`)
        codigo.appendData(`t${th}=H;\n`)
        codigo.appendData(`Heap[t${th}]=-1;\n`)
        codigo.appendData(`H=H+1;\n`)
        codigo.appendData(`t${tvalor}=t${tvalor}-1;\n`)
        codigo.appendData(`goto L${L0};\n`)
        codigo.appendData(`L${salida}:\n`)
        codigo.appendData(`t0=t${tinicio};\n`)
        codigo.appendData(`end\n`)
        return codigo.textContent;
    }
    MetodoLengthString() {
        let tcadena = VarGlobal.getInstance().contadorTemporales;
        let tcontador = VarGlobal.getInstance().contadorTemporales;
        let taux = VarGlobal.getInstance().contadorTemporales;
        let L0 = VarGlobal.getInstance().contadorSaltos;
        let salida = VarGlobal.getInstance().contadorSaltos;
        let codigo = document.createTextNode('\n');
        codigo.appendData(`${nombre}_StringLength begin\n`)
        codigo.appendData(`t${tcadena}=t0;\n`)
        codigo.appendData(`t${tcontador}=0;\n`)
        codigo.appendData(`L${L0}:\n`)
        codigo.appendData(`t${taux}=Heap[t${tcadena}];\n`)
        codigo.appendData(`if(t${taux}==-1) goto L${salida};\n`)
        codigo.appendData(`t${tcontador}=t${tcontador}+1;\n`)
        codigo.appendData(`t${tcadena}=t${tcadena}+1;\n`)
        codigo.appendData(`goto L${L0};\n`)
        codigo.appendData(`L${salida}:\n`)
        codigo.appendData(`t0=t${tcontador};\n`)
        codigo.appendData(`end\n`);
        return codigo.textContent;
    }
    MetodoToCharArray() {
        let tcadena = VarGlobal.getInstance().contadorTemporales;
        let ttamcadena = VarGlobal.getInstance().contadorTemporales;
        let tposnuevoArray = VarGlobal.getInstance().contadorTemporales;
        let tpunteros = VarGlobal.getInstance().contadorTemporales;
        let telementosnuevoarray = VarGlobal.getInstance().contadorTemporales;
        let tchar = VarGlobal.getInstance().contadorTemporales;
        let L0 = VarGlobal.getInstance().contadorSaltos;
        let Salida = VarGlobal.getInstance().contadorSaltos;
        let codigo = document.createTextNode('\n')
        codigo.appendData(`${nombre}_ToCharArray begin \n`)
        codigo.appendData(`t${tcadena}=t0;\n`)
        codigo.appendData(`call marvin_201602520_StringLength;\n`)
        codigo.appendData(`t${ttamcadena}=t0;\n`)
        codigo.appendData(`call marvin_201602520_CrearArray;\n`)
        codigo.appendData(`t${tposnuevoArray}=t0;\n`)
        codigo.appendData(`t${tpunteros}=t${tposnuevoArray}+1;\n`)
        codigo.appendData(`t${telementosnuevoarray}=t${tpunteros}+t${ttamcadena};\n`)
        codigo.appendData(`L${L0}:\n`)
        codigo.appendData(`if(t${ttamcadena}==0) goto L${Salida};\n`)
        codigo.appendData(`t${tchar}=Heap[t${tcadena}];\n`)
        codigo.appendData(`Heap[t${tpunteros}]=t${telementosnuevoarray};\n`)
        codigo.appendData(`Heap[t${telementosnuevoarray}]=t${tchar};\n`)
        codigo.appendData(`t${telementosnuevoarray}=t${telementosnuevoarray}+1;\n`)
        codigo.appendData(`Heap[t${telementosnuevoarray}]=-1;\n`)
        codigo.appendData(`t${telementosnuevoarray}=t${telementosnuevoarray}+1;\n`)
        codigo.appendData(`t${ttamcadena}=t${ttamcadena}-1;\n`)
        codigo.appendData(`t${tcadena}=t${tcadena}+1;\n`)
        codigo.appendData(`t${tpunteros}=t${tpunteros}+1;\n`)
        codigo.appendData(`goto L${L0};\n`)
        codigo.appendData(`L${Salida}:\n`)
        codigo.appendData(`t0=t${tposnuevoArray};\n`)
        codigo.appendData(`end\n`)
        return codigo.textContent;
    }
    MetodoToUpperCase() {
        let tcadena = VarGlobal.getInstance().contadorTemporales;
        let tnuevo = VarGlobal.getInstance().contadorTemporales;
        let th = VarGlobal.getInstance().contadorTemporales;
        let tchar = VarGlobal.getInstance().contadorTemporales;
        let tnueva = VarGlobal.getInstance().contadorTemporales;
        let L0 = VarGlobal.getInstance().contadorSaltos;
        let L1 = VarGlobal.getInstance().contadorSaltos;
        let nocambiar = VarGlobal.getInstance().contadorSaltos;
        let meter = VarGlobal.getInstance().contadorSaltos;
        let iterar = VarGlobal.getInstance().contadorSaltos;
        let salida = VarGlobal.getInstance().contadorSaltos;
        let codigo = document.createTextNode('\n')
        codigo.appendData(`${nombre}_toUpperCase begin\n`)
        codigo.appendData(`t${tcadena}=t0;\n`)
        codigo.appendData(`t${tnuevo}=H;\n`)
        codigo.appendData(`L${L0}:\n`)
        codigo.appendData(`t${th}=H;\n`)
        codigo.appendData(`t${tchar}=Heap[t${tcadena}];\n`)
        codigo.appendData(`if(t${tchar}==-1) goto L${salida};\n`)
        codigo.appendData(`if(t${tchar}>=97)goto L${L1};\n`)
        codigo.appendData(`goto L${nocambiar};\n`)
        codigo.appendData(`L${L1}:\n`)
        codigo.appendData(`if(t${tchar}<=122) goto L${meter};\n`)
        codigo.appendData(`goto L${nocambiar};\n`)
        codigo.appendData(`L${nocambiar}:\n`)
        codigo.appendData(`Heap[t${th}]=t${tchar};\n`)
        codigo.appendData(`goto L${iterar};\n`)
        codigo.appendData(`L${meter}:\n`)
        codigo.appendData(`t${tnueva}=t${tchar}-32;\n`)
        codigo.appendData(`Heap[t${th}]=t${tnueva};\n`)
        codigo.appendData(`L${iterar}:\n`)
        codigo.appendData(`t${tcadena}=t${tcadena}+1;\n`)
        codigo.appendData(`H=H+1;\n`)
        codigo.appendData(`goto L${L0};\n`)
        codigo.appendData(`L${salida}:\n`)
        codigo.appendData(`t${th}=H;\n`)
        codigo.appendData(`Heap[t${th}]=-1;\n`)
        codigo.appendData(`H=H+1;\n`)
        codigo.appendData(`t0=t${tnuevo};\n`)
        codigo.appendData(`end\n`)
        return codigo.textContent;
    }
    MetodoTolowerCase() {
        let tcadena = VarGlobal.getInstance().contadorTemporales;
        let tnuevo = VarGlobal.getInstance().contadorTemporales;
        let th = VarGlobal.getInstance().contadorTemporales;
        let tchar = VarGlobal.getInstance().contadorTemporales;
        let tnueva = VarGlobal.getInstance().contadorTemporales;
        let L0 = VarGlobal.getInstance().contadorSaltos;
        let L1 = VarGlobal.getInstance().contadorSaltos;
        let nocambiar = VarGlobal.getInstance().contadorSaltos;
        let meter = VarGlobal.getInstance().contadorSaltos;
        let iterar = VarGlobal.getInstance().contadorSaltos;
        let salida = VarGlobal.getInstance().contadorSaltos;
        let codigo = document.createTextNode('\n')
        codigo.appendData(`${nombre}_toLowerCase begin\n`)
        codigo.appendData(`t${tcadena}=t0;\n`)
        codigo.appendData(`t${tnuevo}=H;\n`)
        codigo.appendData(`L${L0}:\n`)
        codigo.appendData(`t${th}=H;\n`)
        codigo.appendData(`t${tchar}=Heap[t${tcadena}];\n`)
        codigo.appendData(`if(t${tchar}==-1) goto L${salida};\n`)
        codigo.appendData(`if(t${tchar}>=65)goto L${L1};\n`)
        codigo.appendData(`goto L${nocambiar};\n`)
        codigo.appendData(`L${L1}:\n`)
        codigo.appendData(`if(t${tchar}<=90) goto L${meter};\n`)
        codigo.appendData(`goto L${nocambiar};\n`)
        codigo.appendData(`L${nocambiar}:\n`)
        codigo.appendData(`Heap[t${th}]=t${tchar};\n`)
        codigo.appendData(`goto L${iterar};\n`)
        codigo.appendData(`L${meter}:\n`)
        codigo.appendData(`t${tnueva}=t${tchar}+    32;\n`)
        codigo.appendData(`Heap[t${th}]=t${tnueva};\n`)
        codigo.appendData(`L${iterar}:\n`)
        codigo.appendData(`t${tcadena}=t${tcadena}+1;\n`)
        codigo.appendData(`H=H+1;\n`)
        codigo.appendData(`goto L${L0};\n`)
        codigo.appendData(`L${salida}:\n`)
        codigo.appendData(`t${th}=H;\n`)
        codigo.appendData(`Heap[t${th}]=-1;\n`)
        codigo.appendData(`H=H+1;\n`)
        codigo.appendData(`t0=t${tnuevo};\n`)
        codigo.appendData(`end\n`)
        return codigo.textContent;
    }
    MetodoLinial() {
        let tarr = VarGlobal.getInstance().contadorTemporales;
        let ttam = VarGlobal.getInstance().contadorTemporales;
        let tnuevo = VarGlobal.getInstance().contadorTemporales;
        let tindinuevo = VarGlobal.getInstance().contadorTemporales;
        let tindiviejo = VarGlobal.getInstance().contadorTemporales;
        let tcontador = VarGlobal.getInstance().contadorTemporales;
        let tvalor = VarGlobal.getInstance().contadorTemporales;
        let L0 = VarGlobal.getInstance().contadorSaltos;
        let salida = VarGlobal.getInstance().contadorSaltos;
        let codigo = document.createTextNode(`\n`)
        codigo.appendData(`${nombre}_Linealize begin\n`)
        codigo.appendData(`t${tarr}=t0;\n`)
        codigo.appendData(`t${ttam}=Heap[t${tarr}];\n`)
        codigo.appendData(`t0=t${ttam};\n`)
        codigo.appendData(`call marvin_201602520_CrearArray;\n`)
        codigo.appendData(`t${tnuevo}=t0;\n`)
        codigo.appendData(`Heap[t${tnuevo}]=t${ttam};\n`)
        codigo.appendData(`t${tindinuevo}=t${tnuevo}+1;\n`)
        codigo.appendData(`t${tindiviejo}=t${tarr}+1;\n`)
        codigo.appendData(`t${tcontador}=0;\n`)
        codigo.appendData(`L${L0}:\n`)
        codigo.appendData(`if(t${tcontador}==t${ttam}) goto L${salida};\n`)
        codigo.appendData(`t${tvalor}=Heap[t${tindiviejo}];\n`)
        codigo.appendData(`Heap[t${tindinuevo}]=t${tvalor};\n`)
        codigo.appendData(`t${tindinuevo}=t${tindinuevo}+1;\n`)
        codigo.appendData(`t${tindiviejo}=t${tindiviejo}+1;\n`)
        codigo.appendData(`t${tcontador}=t${tcontador}+1;\n`)
        codigo.appendData(`goto L${L0};\n`)
        codigo.appendData(`L${salida}:\n`)
        codigo.appendData(`t0=t${tnuevo};\n`)
        codigo.appendData(`end\n`)
        return codigo.textContent

    }
}