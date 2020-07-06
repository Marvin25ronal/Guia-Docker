%{
    var cadena="";
    var tam=0;
%}
/* lexical grammar */
%lex
%options case-insensitive

%x INITIAL
%s string
%s char

GOTO "goto"
VAR "var"
MAS "+"
MENOS "-"
POR "*"
MENOS "-"
MAYOR ">"
MENOR "<"
MAYOR_IGUAL ">="
MENOR_IGUAL "<="
IGUAL_IGUAL "=="
MODULO "%"
IGUAL "="
DIV "/"
BEGIN "begin"
PROC "proc"
END "end"
STACK "Stack"
HEAP "Heap"
CALL  "call"
PRINT "print"
COMA ","
IF "if"
DISTINTO "<>"
PAR_A "("
PAR_C ")"
COR_A "["
COR_C "]"
PYCOMA ";"
DOSPUNTOS ":"
COMILLA "\""
COMILLACHAR "'"
BARRA_COMILLA "\\\""
DOBLE_BARRA "\\\\"
BARRA_ENE "\\n"
BARRA_ERRE "\\r"
BARRA_T "\\t"
BARRA_0 "\\0"
COMENTARIO1 "#".*
COMENTARIO2 [#][*][^*]*[*]+([^#*][^*]*[*]+)*[#]
SPACE (\s \t\f\t)
ENTER (\r|\n|\r\n)
DECIMAL [0-9]+("."[0-9]+)\b
ENTERO [0-9]+\b
ETIQUETA "L"[0-9]+
ID [A-Za-zñÑ_][_0-9A-Za-zñÑ]*
%%
<INITIAL>\s+                %{/*naa*/%}
<INITIAL>{COMENTARIO1}      %{/*NAAA*/%}
<INITIAL>{COMENTARIO2}      %{/*NAAA*/%}
<INITIAL>{GOTO}             %{ return "GOTO";%}
<INITIAL>{STACK}             %{ return "STACK";%}
<INITIAL>{PROC}              %{ return "PROC";%}
<INITIAL>{END}              %{ return "END";%}
<INITIAL>{PRINT}             %{ return "PRINT";%}
<INITIAL>{HEAP}             %{ return "HEAP";%}
<INITIAL>{BEGIN}             %{ return "BEGIN";%}
<INITIAL>{CALL}             %{ return "CALL";%}
<INITIAL>{IF}             %{ return "IF";%}
<INITIAL>{VAR}      %{return "VAR";%}
<INITIAL>{COMILLA}          %{cadena="";this.begin("string");%}
<INITIAL>{MAS}              %{ return "MAS";%}
<INITIAL>{MODULO}              %{ return "MODULO";%}
<INITIAL>{MENOS}              %{ return "MENOS";%}
<INITIAL>{POR}              %{ return "POR";%}
<INITIAL>{DIV}              %{ return "DIV";%}
<INITIAL>{IGUAL_IGUAL}              %{ return "IGUAL_IGUAL";%}
<INITIAL>{DISTINTO}              %{ return "DISTINTO";%}
<INITIAL>{MAYOR_IGUAL}              %{ return "MAYOR_IGUAL";%}
<INITIAL>{MENOR_IGUAL}              %{ return "MENOR_IGUAL";%}
<INITIAL>{MAYOR}              %{ return "MAYOR";%}
<INITIAL>{MENOR}              %{ return "MENOR";%}
<INITIAL>{IGUAL}              %{ return "IGUAL";%}
<INITIAL>{DOSPUNTOS}              %{ return "DOSPUNTOS";%}
<INITIAL>{PYCOMA}              %{ return "PYCOMA";%}
<INITIAL>{IGUAL}              %{ return "IGUAL";%}
<INITIAL>{COMA}              %{ return "COMA";%}
<INITIAL>{COR_A}              %{ return "COR_A";%}
<INITIAL>{PAR_A}              %{ return "PAR_A";%}
<INITIAL>{PAR_C}              %{ return "PAR_C";%}
<INITIAL>{COR_C}              %{ return "COR_C";%}

<INITIAL>{DECIMAL}          %{ return "DECIMAL";%}
<INITIAL>{ENTERO}           %{ return "ENTERO";%}
<INITIAL>{ETIQUETA}               %{ return "ETIQUETA";%}
<INITIAL>{ID}               %{ return "ID";%}
<INITIAL>{ENTER}            %{/*Enter*/%}
<INITIAL>{SPACE}            %{/*Espacios en blanco*/%}


<string>{COMILLA}           %{this.begin("INITIAL");yytext=cadena;return "STRING";%}
<string>{BARRA_COMILLA}     %{cadena+="\"";%}
<string>{DOBLE_BARRA}       %{cadena+="\\";%}
<string>{BARRA_ENE}         %{cadena+="\n";%}
<string>{BARRA_ERRE}        %{cadena+="\r";%}
<string>{BARRA_T}           %{cadena+="\t";%}
<string>\s+                 %{cadena+=" ";%}
<string>.                   %{cadena+=yytext;%}
<string>{ENTER}             %{this.begin("INITIAL");/*String sin finalizar reportar error*/%}
<string><<EOF>>             %{this.begin("INITIAL");/*String sin finalizar*/%}
<<EOF>>                     %{return "EOF";%}
.                           %{var nuevo=new ERRORES(yylloc.first_line,yylloc.first_column+1,"Caracter invalido: "+yytext,1); lista_errores.push(nuevo);%}
/lex
%{
    var lista_errores=[];
    const ERRORES=require('../build/Reportes/Errores.js').Errores;
    const SALTO=require('../build/3D/Salto.js').Salto;
    const DECLARACION=require('../build/3D/Declaracion.js').Declaracion;
    const METODO=require('../build/3D/Metodo.js').Metodo;
    const LLAMADA=require('../build/3D/Llamada.js').Llamada;
    const IF=require('../build/3D/IF.js').IF;
    const CODIGOETIQUETA=require('../build/3D/CodigoEtiqueta.js').CodigoEtiqueta;
    const PRINT=require('../build/3D/Print.js').Print;
    const DECLARACIONPILA=require('../build/3D/Declaracionpila.js').Declaracionpila;
    const DECLARACIONP=require('../build/3D/DeclaracionP.js').DeclaracionP;
    const Asignacion3D=require('../build/3D/Asignacion3D.js').Asignacion3D;
    
%}
%start INICIAL
%% /* language grammar */
INICIAL
    :CUERPO EOF{return $1;}
    |EOF{return null}
    ;
CUERPO:
    DECLARACION{$$=[$1]}
    |CUERPO DECLARACION{$1.push($2);$$=$1}
    |SALTO{$$=[$1]}
    |CUERPO SALTO{$1.push($2);$$=$1}
    |LLAMADA{$$=[$1]}
    |CUERPO LLAMADA{$1.push($2);$$=$1}
    |DEFINICIONMETODO{$$=[$1]}
    |CUERPO DEFINICIONMETODO{$1.push($2);$$=$1}
    |ASIGNACION{$$=[$1]}
    |CONIF{$$=[$1]}
    |CUERPO CONIF{$1.push($2);$$=$1}
    |CUERPO ASIGNACION{$1.push($2);$$=$1}
    |ETIQUETA DOSPUNTOS{$$=[new CODIGOETIQUETA($1,@1.first_line,@1.first_column+1)]}
    |CUERPO ETIQUETA DOSPUNTOS{$1.push(new CODIGOETIQUETA($2,@2.first_line,@2.first_column+1));$$=$1}
    |INSPRINT{$$=[$1]}
    |CUERPO INSPRINT{$1.push($2);$$=$1}
    ;
INSPRINT:
    PRINT PAR_A STRING COMA TERMINAL PAR_C PYCOMA{$$=new PRINT($3,$5,@1.first_line,@1.first_column+1);}
    ;
CONIF:
   IF PAR_A EXP PAR_C GOTO ETIQUETA PYCOMA{$$=new IF($6,$3[0],$3[2],$3[1],@1.first_line,@1.first_column+1)}
   ; 
ASIGNACION:
    STACK COR_A ID COR_C IGUAL TERMINAL PYCOMA{$$=new Asignacion3D(`Stack[${$3}]`,$6,null,null,@1.first_line,@1.first_column+1);}
    |HEAP COR_A ID COR_C IGUAL TERMINAL PYCOMA{$$=new Asignacion3D(`Heap[${$3}]`,$6,null,null,@1.first_line,@1.first_column+1);}
    |ID IGUAL EXP PYCOMA{$$=new Asignacion3D($1,$3[0],$3[2],$3[1],@1.first_line,@1.first_column+1)}
    |ID IGUAL HEAP COR_A ID COR_C PYCOMA{$$=new Asignacion3D($1,`Heap[${$5}]`,null,null,@1.first_line,@1.first_column+1)}
    |ID IGUAL STACK COR_A ID COR_C PYCOMA{$$=new Asignacion3D($1,`Stack[${$5}]`,null,null,@1.first_line,@1.first_column+1)}
    ;
EXP:
    TERMINAL MAS TERMINAL{$$=[$1,$2,$3]}
    |TERMINAL MENOS TERMINAL{$$=[$1,$2,$3]}
    |TERMINAL POR TERMINAL{$$=[$1,$2,$3]}
    |TERMINAL DIV TERMINAL{$$=[$1,$2,$3]}
    |TERMINAL MODULO TERMINAL{$$=[$1,$2,$3]}
    |TERMINAL IGUAL_IGUAL TERMINAL{$$=[$1,$2,$3]}
    |TERMINAL DISTINTO TERMINAL{$$=[$1,$2,$3]}
    |TERMINAL MENOR TERMINAL{$$=[$1,$2,$3]}
    |TERMINAL MAYOR TERMINAL{$$=[$1,$2,$3]}
    |TERMINAL MAYOR_IGUAL TERMINAL{$$=[$1,$2,$3]}
    |TERMINAL MENOR_IGUAL TERMINAL{$$=[$1,$2,$3]}
    |TERMINAL{$$=[$1,null,null]}
    ;
TERMINAL:
    ID{$$=$1}
    |ENTERO{$$=$1}
    |DECIMAL{$$=$1}
    |MENOS ID{$$=`-${$2}`}
    |MENOS ENTERO{$$=`-${$2}`}
    |MENOS DECIMAL{$$=`-${$2}`}
    ;
SALTO:
    GOTO ETIQUETA PYCOMA{$$=new SALTO($2,@1.first_line,@1.first_column+1);}
    ;
LLAMADA:
    CALL ID PYCOMA{$$=new LLAMADA($2,@1.first_line,@1.first_column+1);}
    ;
DEFINICIONMETODO:
    PROC ID BEGIN CUERPO END{$$=new METODO($2,$4,@1.first_line,@1.first_column+1)}
    |PROC ID BEGIN END{$$=new Metodo($2,null,@1.first_line,@1.first_column+1)}
    ;
DECLARACION:
    VAR STACK COR_A COR_C PYCOMA{$$=new DECLARACIONPILA(true,@1.first_line,@1.first_column+1)}
    |VAR HEAP COR_A COR_C PYCOMA{$$=new DECLARACIONPILA(false,@1.first_line,@1.first_column+1)}
    |VAR LID PYCOMA{$$=new DECLARACION($2,@1.first_line,@1.first_column+1);}
    |VAR LID IGUAL EXP PYCOMA{$$=new DECLARACIONP($2[0],$4);}
    ;
LID:
    ID{$$=[$1]}
    |ID COMA LID{$3.unshift($1);$$=$3;}
    ;