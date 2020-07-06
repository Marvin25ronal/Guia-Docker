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

//TOKENS
NULL "null"
IMPORT "import"
TRUE "true"
FALSE "false"
SWITCH "switch"
CONTINUE "continue"
DEFINE "define"
TRY "try"
INTEGER "integer"
VAR "var"
CASE "case"
RETURN "return"
VOID "void"
AS "as"
CATCH "catch"
DOUBLE "double"
CONST "const"
IF "if"
DEFAULT "default"
//PRINT "print"
FOR "for"
STRC "strc"
THROW "throw"
CHARACTER "char"  
GLOBAL "global"
ELSE "else"
BREAK "break"
WHILE "while"
DO "do"
BOOLEAN "boolean"
COMILLA "\""
COMILLACHAR "'"
BARRA_COMILLA "\\\""
DOBLE_BARRA "\\\\"
BARRA_ENE "\\n"
BARRA_ERRE "\\r"
BARRA_T "\\t"
BARRA_0 "\\0"
SPACE (\s \t\f\t)
ENTER (\r|\n|\r\n)
COMENTARIO1 "//".*
COMENTARIO2 [/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	

DECIMAL [0-9]+("."[0-9]+)\b
ENTERO [0-9]+\b

//sIGNOS
MAS_MAS "++"
MAS "+"
MENOS_MENOS "--"
MENOS "-"
DIV "/"
POR "*"
COMA ","
LLAV_A "{"
LLAV_C "}"
COR_JUNTOS "[]"
COR_A "["
COR_C "]"
PAR_A "("
PAR_C ")"
IGUAL "="
MAYOR_IGUAL ">="
MENOR_IGUAL "<="
MAYOR ">"
MENOR "<"
IGUAL_IGUAL "=="
TRIPLE_IGUAL "==="
DISTINTO "!="
NOT "!"
AND "&&"
OR "||"
DOSPUNTOS_IGUAL ":="
DOSPUNTOS ":"
POTENCIA "^^"
XOR "^"
MODULO "%"
PUNTO "."
PYCOMA ";"
ARCHIVO ([a-zA-Z0-9_\\.\-\(\):])+(."j")
ID [A-Za-zñÑ_][_0-9A-Za-zñÑ]*
%%
<INITIAL>\s+                %{/*espacios*/%}
<INITIAL>{COMENTARIO2}      %{/* COMENTARIO 2*/%}
<INITIAL>{COMENTARIO1}      %{/*cOMENTARIO*/%}



<INITIAL>{COMILLA}          %{cadena=""; this.begin("string");%}
/*<INITIAL>{}%{ return %}*/
<INITIAL>{CHARACTER}        %{ return "CHARACTER";%}
<INITIAL>{DOSPUNTOS_IGUAL}  %{ return "DOSPUNTOS_IGUAL";%}
<INITIAL>{DOSPUNTOS}        %{ return "DOSPUNTOS";%}
<INITIAL>{COMILLACHAR}      %{ cadena="";this.begin("char");%}
<INITIAL>{PYCOMA}           %{ return "PYCOMA";%}
<INITIAL>{PUNTO}            %{ return "PUNTO";%}
<INITIAL>{MODULO}           %{ return "MODULO";%}
<INITIAL>{POTENCIA}         %{ return "POTENCIA";%}
<INITIAL>{XOR}         %{ return "XOR";%}
<INITIAL>{OR}               %{ return "OR";%}
<INITIAL>{AND}              %{ return "AND";%}
<INITIAL>{TRIPLE_IGUAL}     %{ return "TRIPLE_IGUAL";%}
<INITIAL>{DISTINTO}         %{ return "DISTINTO";%}
<INITIAL>{NOT}              %{ return "NOT";%}
<INITIAL>{IGUAL_IGUAL}      %{ return "IGUAL_IGUAL";%}
<INITIAL>{MENOR_IGUAL}      %{ return "MENOR_IGUAL";%}
<INITIAL>{MAYOR_IGUAL}      %{ return "MAYOR_IGUAL";%}
<INITIAL>{MENOR}            %{ return "MENOR";%}
<INITIAL>{MAYOR}            %{ return "MAYOR";%}
<INITIAL>{IGUAL}            %{ return "IGUAL";%}
<INITIAL>{COR_JUNTOS}       %{ return "COR_JUNTOS";%}
<INITIAL>{COR_A}            %{ return "COR_A";%}
<INITIAL>{COR_C}            %{ return "COR_C";%}
<INITIAL>{LLAV_C}           %{ return "LLAV_C";%}
<INITIAL>{LLAV_A}           %{ return "LLAV_A";%}
<INITIAL>{PAR_A}            %{ return "PAR_A";%}
<INITIAL>{PAR_C}            %{ return "PAR_C";%}
<INITIAL>{COMA}             %{ return "COMA";%}
<INITIAL>{POR}              %{ return "POR";%}
<INITIAL>{DIV}              %{ return "DIV";%}
<INITIAL>{MENOS_MENOS}      %{ return "MENOS_MENOS";%}
<INITIAL>{MENOS}            %{ return "MENOS";%}
<INITIAL>{MAS_MAS}          %{ return "MAS_MAS";%}
<INITIAL>{MAS}              %{ return "MAS";%}

<INITIAL>{BOOLEAN}          %{ return "BOOLEAN";%}
<INITIAL>{DO}               %{ return "DO";%}
<INITIAL>{WHILE}            %{ return "WHILE";%}
<INITIAL>{BREAK}            %{ return "BREAK";%}
<INITIAL>{ELSE}             %{ return "ELSE";%}
<INITIAL>{GLOBAL}           %{ return "GLOBAL";%}
<INITIAL>{CHAR}             %{ return "CHAR";%}
<INITIAL>{THROW}            %{ return "THROW";%}
<INITIAL>{STRC}             %{ return "STRC";%}
<INITIAL>{FOR}              %{ return "FOR";%}
//<INITIAL>{PRINT}            %{ return "PRINT";%}
<INITIAL>{DEFAULT}          %{ return "DEFAULT";%}
<INITIAL>{IF}               %{ return "IF";%}
<INITIAL>{CONST}            %{ return "CONST";%}
<INITIAL>{DOUBLE}           %{ return "DOUBLE";%}
<INITIAL>{CATCH}            %{ return "CATCH";%}
<INITIAL>{AS}               %{ return "AS";%}
<INITIAL>{VOID}             %{ return "VOID";%}
<INITIAL>{RETURN}           %{ return "RETURN";%}
<INITIAL>{CASE}             %{ return "CASE";%}
<INITIAL>{VAR}              %{ return "VAR";%}
<INITIAL>{INTEGER}          %{ return "INTEGER";%}
<INITIAL>{TRY}              %{ return "TRY";%}
<INITIAL>{DEFINE}           %{ return "DEFINE";%}
<INITIAL>{CONTINUE}         %{ return "CONTINUE";%}
<INITIAL>{SWITCH}           %{ return "SWITCH";%}
<INITIAL>{FALSE}            %{ return "FALSE";%}
<INITIAL>{TRUE}             %{ return "TRUE";%}
<INITIAL>{IMPORT}           %{ return "IMPORT";%}
<INITIAL>{NULL}             %{ return "NULL"; %}
<INITIAL>{DECIMAL}          %{ return "DECIMAL";%}
<INITIAL>{ENTERO}           %{ return "ENTERO";%}
<INITIAL>{ID}               %{ return "ID";%}
<INITIAL>{ARCHIVO}          %{ return "ARCHIVO";%}
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

<char>{COMILLACHAR}         %{this.begin("INITIAL");if(tam==1){tam=0;yytext=cadena;return "CHAR";}else{var nuevo=new ERRORES(yylloc.first_line,yylloc.first_column+1,"Formato incorrecto para char",1);lista_errores.push(nuevo);}%}
<char>{BARRA_COMILLA}       %{cadena+='\"';tam++;%}
<char>{DOBLE_BARRA}         %{cadena+='\\';tam++;%}
<char>{BARRA_ENE}           %{cadena+='\n';tam++;%}
<char>{BARRA_T}             %{cadena+='\t';tam++;%}
<char>{BARRA_ERRE}          %{cadena+='\r';tam++;%}
<char>{BARRA_0}             %{cadena+='\0';tam++;%}
<char>.                     %{cadena+=yytext;tam++;%}
<char>{ENTER}               %{this.begin("INITIAL");/*Char sin finalizar*/%}
<char><<EOF>>               %{this.begin("INITIAL");/*Char sin finalizar*/%}
<<EOF>>                     %{return "EOF";%}
.                           %{var nuevo=new ERRORES(yylloc.first_line,yylloc.first_column+1,"Caracter invalido: "+yytext,1); lista_errores.push(nuevo);%}
/lex

%{
    var lista_errores=[];
    const ERRORES=require('../build/Reportes/Errores.js').Errores;
    const LITERAL=require('../build/Expresion/Literal.js').Literal;
    const IDENTIFICADOR=require('../build/Expresion/Identificador.js').Identificador;
    const IDENTIFICADORARRAY=require('../build/Expresion/IdentificadorArray.js').IdentificadorArray;
    const IMPORTACION=require('../build/Instruccion/Importaciones.js').Importacion;
    const LINKEDLIST=require('../build/Global/LinkedList.js').Lista;
    const AST=require('../build/AST/AST.js').AST;
    const ARITMETICA=require('../build/Operaciones/Aritmetica.js').Aritmetica;
    const SIGNO=require('../build/Operaciones/Signo.js').Signo;
    const TIPOEXP=require('../build/Expresion/TipoExp.js').TipoExp;
    const TIPO=require('../build/Expresion/TipoExp.js').Tipo;
    const DECLARACION=require('../build/Instruccion/Declaracion.js').Declaracion;
    const ASIGNACION=require('../build/Instruccion/Asignacion.js').Asignacion;
    const ASIGNACIONDECIC=require('../build/Instruccion/AsignacionDECIC.js').AsignacionDECIC;
    const ASIGNACIONARRAY=require('../build/Instruccion/AsignacionArray.js').AsignacionArray;
    const ASIGNACIONLLAMADA=require('../build/Instruccion/AsignacionLlamada.js').AsignacionLlamada;
    const ACCESOARRAY=require('../build/Expresion/AccesoArray.js').AccesoArray;
    const ACCESOVARIABLE=require('../build/Expresion/AccesoVariable.js').AccesoVariable;
    const ACCESO=require('../build/Expresion/Acceso.js').Acceso;
    const ACCESOFUNCION=require('../build/Expresion/AccesoFuncion.js').AccesoFuncion;
    const ACCESOATRIBUTO=require('../build/Expresion/AccesoAtributo.js').AccesoAtributo;
    const UNARIAS=require('../build/Expresion/Unaria.js').Unaria;
    const LOGICAS=require('../build/Expresion/Logicas.js').Logica;
    const RELACIONALES=require('../build/Expresion/Relacionales.js').Relacionales;
    const INCREDECRE=require('../build/Expresion/IncreDecre.js').IncreDecre;
    const CASTEO=require('../build/Expresion/Casteo.js').Casteo;
    const DECFUNCION=require('../build/Instruccion/DecFuncion.js').DecFuncion;
    const PARAMETROS=require('../build/Instruccion/Parametros.js').Parametros;
    const CONTROLIF=require('../build/Controles/ControlIF.js').ControlIF;
    const ELSE=require('../build/Controles/Else.js').Else;
    const ELSEIF=require('../build/Controles/ElseIF.js').ElseIF;
    const WHILE=require('../build/Controles/While.js').While;
    const DO_WHILE=require('../build/Controles/Do_While.js').Do_While;
    const SWITCH=require('../build/Controles/Switch.js').Switch;
    const CASE=require('../build/Controles/Case.js').Case;
    const DEFAULT=require('../build/Controles/Default.js').Default;
    const FOR=require('../build/Controles/For.js').For;
    const BREAK=require('../build/Controles/Break.js').Break;
    const CONTINUE=require('../build/Controles/Continue.js').Continue;
    const RETURN=require('../build/Expresion/Return.js').Return;
    const DECARRAY=require('../build/Expresion/DecArray.js').DecArray;
    const ARREGLOVALOR=require('../build/Expresion/ArregloValor.js').ArregloValor;
%}  
%right 'IGUAL'
%left 'MAS_MAS'  'MENOS_MENOS'
%left 'XOR'
%left 'OR'
%left 'AND'
%left 'IGUAL_IGUAL' 'DISTINTO' 'TRIPLE_IGUAL'
%nonassoc 'MENOR' 'MENOR_IGUAL' 'MAYOR' 'MAYOR_IGUAL'
%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'MODULO'
%left 'POTENCIA'
%right 'NOT'
%right UMENOS
%left 'COR_A' 'COR_C' 
%left 'PAR_A' 'PAR_C'

%start INICIAL
%% /* language grammar */
INICIAL
    : CUERPO EOF { var arbol=new AST($1); var a= {'errores':lista_errores,'arbol':arbol}; lista_errores=[];return a;}
    |EOF {var a= {'errores':lista_errores}; lista_errores=[];return a;}
    ;

CUERPO:
    CUERPO IMPORTACIONES{$1.push($2);$$=$1;}
    |IMPORTACIONES{$$=[$1];}
    |CUERPO DECLARACION{$1.push($2);$$=$1;}
    |CUERPO DECLARACION PYCOMA{$1.push($2);$$=$1;}
    |DECLARACION{$$=[$1];}
    |DECLARACION PYCOMA{$$=[$1];}
    |DECFUNCION{$$=[$1];}
    |CUERPO DECFUNCION{$1.push($2);$$=$1;}
    |DECSTRUCT{$$=[$1];}
    |CUERPO DECSTRUCT{$1.push($2);$$=$1;}
    |error PYCOMA{var nuevo=new ERRORES(@1.first_line,@1.first_column+1,"Error con  "+yytext,2); lista_errores.push(nuevo);$$=null}
    |error LLAV_C{var nuevo=new ERRORES(@1.first_line,@1.first_column+1,"Error con  "+yytext,2); lista_errores.push(nuevo);$$=null}
    ;

CUERPOINTERNO:
    CUERPOINTERNO DECLARACION{$1.push($2);$$=$1;}
    |DECLARACION{$$=[$1];}
    |CUERPOINTERNO DECLARACION PYCOMA{$1.push($2);$$=$1;}
    |DECLARACION PYCOMA{$$=[$1];}
    |ASIGNACION{$$=[$1];}
    |ASIGNACION PYCOMA{$$=[$1];}
    |CUERPOINTERNO ASIGNACION{$1.push($2);$$=$1;}
    |CUERPOINTERNO ASIGNACION PYCOMA{$1.push($2);$$=$1;}
    |CUERPOINTERNO CONTROLES{$1.push($2);$$=$1;}
    |CONTROLES{$$=[$1];}
    |TRANSFERENCIAS{$$=[$1];}
    |CUERPOINTERNO TRANSFERENCIAS{$1.push($2);$$=$1;}
    |LLAMADA{$$=[$1];}
    |LLAMADA PYCOMA{$$=[$1];}
    |CUERPOINTERNO LLAMADA{$1.push($2);$$=$1;}
    |CUERPOINTERNO LLAMADA PYCOMA{$1.push($2);$$=$1;}
    |TRY_CATCH{$$=[$1];}
    |CUERPOINTERNO TRY_CATCH{$1.push($2);$$=$1;}
    |DECSTRUCT{$$=[$1];}
    |CUERPOINTERNO DECSTRUCT{$1.push($2);$$=$1;}
    |error PYCOMA{var nuevo=new ERRORES(@1.first_line,@1.first_column+1,"Error con  "+yytext,2); lista_errores.push(nuevo);$$=null}
    |error LLAV_C{var nuevo=new ERRORES(@1.first_line,@1.first_column+1,"Error con  "+yytext,2); lista_errores.push(nuevo);$$=null}
    ;

ASIGNACION:
    ID IGUAL EXP{$$=new ASIGNACION(new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1),$3,this._$.first_line,this._$.first_column+1);}
    |ID MAS_MAS{$$=new ASIGNACIONDECIC(new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1),true,this._$.first_line,this._$.first_column+1);}
    |ID MENOS_MENOS{$$=new ASIGNACIONDECIC(new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1),false,this._$.first_line,this._$.first_column+1);}
    |LLAMADA IGUAL EXP{$$=new ASIGNACIONLLAMADA($1,$3,this._$.first_line,this._$.first_column+1);}
    //|ID COR_A EXP COR_C IGUAL EXP{$$=new ASIGNACIONARRAY(new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1),$3,$6);}
    ;

LLAMADA:
    ID LLAMADAS1{$2.unshift(new ACCESOVARIABLE(new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1),this._$.first_line,this._$.first_column+1));$$=new ACCESO($2,this._$.first_line,this._$.first_column+1);}
    |ID PAR_A PAR_C LLAMADAS1{$4.unshift(new ACCESOFUNCION(new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1),null,this._$.first_line,this._$.first_column+1));$$=new ACCESO($4,this._$.first_line);}
    |ID PAR_A LISTAPAR PAR_C LLAMADAS1{$5.unshift(new ACCESOFUNCION(new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1),$3,this._$.first_line,this._$.first_column+1));$$=new ACCESO($5,this._$.first_line,this._$.first_column+1);}
    |ID PAR_A PAR_C{$$=new ACCESO([new ACCESOFUNCION(new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1),null,this._$.first_line,this._$.first_column)],this._$.first_line,this._$.first_column+1)}
    |ID PAR_A LISTAPAR PAR_C{$$=new ACCESO([new ACCESOFUNCION(new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1),$3,this._$.first_line,this._$.first_column)],this._$.first_line,this._$.first_column+1);}
    |ID COR_A EXP COR_C{$$=new ACCESO([new ACCESOARRAY(new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1),$3,this._$.first_line,this._$.first_column+1)],this._$.first_line,this._$.first_column+1);}
    |ID COR_A EXP COR_C LLAMADAS1{$5.unshift(new ACCESOARRAY(new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1),$3,this._$.first_line,this._$.first_column+1));$$=new ACCESO($5,this._$.first_line,this._$.first_column+1);}
    ;
LLAMADAS1:
    PUNTO ID LLAMADAS1{$3.unshift(new ACCESOATRIBUTO(new IDENTIFICADOR($2,this._$.first_line,this._$.first_column),this._$.first_line,this._$.first_column));$$=$3;}
    |PUNTO ID PAR_A PAR_C{$$=[new ACCESOFUNCION(new IDENTIFICADOR($2,this._$.first_line,this._$.first_column+1),null,this._$.first_line,this._$.first_column+1)];}
    |PUNTO ID PAR_A  PAR_C LLAMADAS1{$5.unshift(new ACCESOFUNCION(new IDENTIFICADOR($2,this._$.first_line,this._$.first_column+1),null,this._$.first_line,this._$.first_column+1));$$=$5;}
    |PUNTO ID PAR_A LISTAPAR PAR_C{$$=[new ACCESOFUNCION(new IDENTIFICADOR($2,this._$.first_line,this._$.first_column+1),$4,this._$.first_line,this._$.first_column+1)];}
    |PUNTO ID PAR_A LISTAPAR PAR_C LLAMADAS1{$6.unshift(new ACCESOFUNCION(new IDENTIFICADOR($2,this._$.first_line,this._$.first_column+1),$4,this._$.first_line,this._$.first_column+1));$$=$6;}
    |PUNTO ID COR_A EXP COR_C{$$=[new ACCESOARRAY(new IDENTIFICADOR($2,this._$.first_line,this._$.first_column+1),$4,this._$.first_line,this._$.first_column+1)];}
    |PUNTO ID COR_A EXP COR_C LLAMADAS1{$6.unshift(new ACCESOARRAY(new IDENTIFICADOR($2,this._$.first_line,this._$.first_column+1),$4,this._$.first_line,this._$.first_column));$$=$6;}
    |PUNTO ID  {$$=[new ACCESOATRIBUTO(new IDENTIFICADOR($2,this._$.first_line,this._$.first_column),this._$.first_line,this._$.first_column)];}
    ;

LISTAPAR:
    EXP COMA LISTAPAR{$3.unshift($1);$$=$3;}
    |EXP{$$=[$1];}
    ;

IMPORTACIONES:
    IMPORT LARCHIVOS PYCOMA{$$=new IMPORTACION($2,this._$.first_line,this._$.first_column+1);}
    |IMPORT LARCHIVOS{$$=new IMPORTACION($2,this._$.first_line,this._$.first_column+1);}
    ;

LARCHIVOS:
    ARCHIVO {$$=[new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1)];}
    |ARCHIVO COMA LARCHIVOS {$3=$3.concat(new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1));$$=$3;}
    ;

DECLARACION:
    VAR ID DOSPUNTOS_IGUAL EXP{$$=new DECLARACION(new TIPOEXP(TIPO.VAR),[new IDENTIFICADOR($2,this._$.first_line,this._$.first_column+1)],$4,this._$.first_line,this._$.first_column+1);}
    |CONST ID DOSPUNTOS_IGUAL EXP{$$=new DECLARACION(new TIPOEXP(TIPO.CONST),[new IDENTIFICADOR($2,this._$.first_line,this._$.first_column+1)],$4,this._$.first_line,this._$.first_column+1);}
    |GLOBAL ID DOSPUNTOS_IGUAL EXP{$$=new DECLARACION(new TIPOEXP(TIPO.GLOBAL),[new IDENTIFICADOR($2,this._$.first_line,this._$.first_column+1)],$4,this._$.first_line,this._$.first_column+1);}
    |TIPO LISTA_ID IGUAL EXP{$$=new DECLARACION($1,$2,$4,this._$.first_line,this._$.first_column+1);}
    |TIPO LISTA_ID{$$=new DECLARACION($1,$2,null,this._$.first_line,this._$.first_column+1);}
    ;

LISTA_ID:
    LISTA_ID COMA ID{$1.push(new IDENTIFICADOR($3,this._$.first_line,this._$.first_column+1));$$=$1;}
    |ID{$$=[new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1)];}
    //|ID COR_A COR_C{$$=[new IDENTIFICADORARRAY($1,this._$.first_line,this._$.first_column+1)];}
    //|LISTA_ID COMA ID COR_A COR_C{$1.push(new IDENTIFICADORARRAY($3,this._$.first_line,this._$.first_column+1));$$=$1;}
    ;

TIPO:
    INTEGER{$$=new TIPOEXP(TIPO.INTEGER);}
    |INTEGER COR_JUNTOS{var tipo=new TIPOEXP(TIPO.ARRAY);tipo.tipoarray=TIPO.INTEGER;$$=tipo;}
    |DOUBLE{$$=new TIPOEXP(TIPO.DOUBLE);}
    |DOUBLE COR_JUNTOS{var tipo=new TIPOEXP(TIPO.ARRAY);tipo.tipoarray=TIPO.DOUBLE;$$=tipo;}
    |CHARACTER COR_JUNTOS{var tipo=new TIPOEXP(TIPO.ARRAY);tipo.tipoarray=TIPO.DOUBLE;$$=tipo;}
    |CHARACTER {$$=new TIPOEXP(TIPO.CHAR);}
    |ID COR_JUNTOS{if($1.toString().toLowerCase()=="string"){var tipo=new TIPOEXP(TIPO.ARRAY);tipo.tipoarray=TIPO.STRING;$$=tipo;}else{var tipo=new TIPOEXP(TIPO.ARRAY);tipo.tipoarray=TIPO.STRUCT;$$=tipo;}}
    |ID{if($1.toString().toLowerCase()=="string"){$$=new TIPOEXP(TIPO.STRING);}else{$$=new TIPOEXP(TIPO.STRUCT,$1);}}
    |BOOLEAN COR_JUNTOS{var tipo=new TIPOEXP(TIPO.ARRAY);tipo.tipoarray=TIPO.BOOLEAN;$$=tipo;}
    |BOOLEAN{$$=new TIPOEXP(TIPO.BOOLEAN);}
    ;

EXP:
    MENOS EXP %prec UMENOS {$$=new UNARIAS($2,SIGNO.RESTA,this._$.first_line,this._$.first_column+1);}
    |EXP MAS EXP{$$=new ARITMETICA($1,$3,SIGNO.SUMA,this._$.first_line,this._$.first_column+1);}
    |EXP MENOS EXP{$$=new ARITMETICA($1,$3,SIGNO.RESTA,this._$.first_line,this._$.first_column+1);}
    |EXP POTENCIA EXP{$$=new ARITMETICA($1,$3,SIGNO.POTENCIA,this._$.first_line,this._$.first_column+1);}
    |EXP XOR EXP{$$=new ARITMETICA($1,$3,SIGNO.POTENCIA,this._$.first_line,this._$.first_column+1);}
    |EXP POR EXP{$$=new ARITMETICA($1,$3,SIGNO.MULTIPLICACION,this._$.first_line,this._$.first_column+1);}
    |EXP DIV EXP{$$=new ARITMETICA($1,$3,SIGNO.DIVISION,this._$.first_line,this._$.first_column+1);}
    |EXP MODULO EXP{$$=new ARITMETICA($1,$3,SIGNO.MODULO,this._$.first_line,this._$.first_column+1);}
    |NOT EXP{$$=new UNARIAS($2,SIGNO.NOT,this._$.first_line,this._$.first_column+1);}
    |EXP OR EXP{$$=new LOGICAS($1,$3,SIGNO.OR,this._$.first_line,this._$.first_column+1);}
    |EXP AND EXP{$$=new LOGICAS($1,$3,SIGNO.AND,this._$.first_line,this._$.first_column+1);}
    |EXP MENOR EXP{$$=new RELACIONALES($1,$3,SIGNO.MENOR,this._$.first_line,this._$.first_column+1);}
    |EXP MAYOR EXP{$$=new RELACIONALES($1,$3,SIGNO.MAYOR,this._$.first_line,this._$.first_column+1);}
    |EXP MENOR_IGUAL EXP{$$=new RELACIONALES($1,$3,SIGNO.MENORI,this._$.first_line,this._$.first_column+1);}
    |EXP MAYOR_IGUAL EXP{$$=new RELACIONALES($1,$3,SIGNO.MAYORI,this._$.first_line,this._$.first_column+1);}
    |EXP IGUAL_IGUAL EXP{$$=new RELACIONALES($1,$3,SIGNO.IGUAL_IGUAL,this._$.first_line,this._$.first_column+1);}
    |EXP TRIPLE_IGUAL EXP{$$=new RELACIONALES($1,$3,SIGNO.TRIPLE_IGUAL,this._$.first_line,this._$.first_column+1);}
    |EXP DISTINTO EXP{$$=new RELACIONALES($1,$3,SIGNO.DISTINTO,this._$.first_line,this._$.first_column+1);}
    |PAR_A EXP PAR_C{$$=$2;}
    |ID MAS_MAS{$$=new INCREDECRE(new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1),true,this._$.first_line,this._$.first_column+1);}
    |ID MENOS_MENOS{$$=new INCREDECRE(new IDENTIFICADOR($1,this._$.first_line,this._$.first_column+1),false,this._$.first_line,this._$.first_column+1);}
    |ID{$$=new IDENTIFICADOR($1,Number(this._$.first_line),Number(this._$.first_column+1));}
    |ENTERO {$$=new LITERAL(Number($1),new TIPOEXP(TIPO.INTEGER),this._$.first_line,this._$.first_column+1);}
    |DECIMAL{$$=new LITERAL(Number($1),new TIPOEXP(TIPO.DOUBLE),this._$.first_line,this._$.first_column+1);}
    |TRUE{$$=new LITERAL(true,new TIPOEXP(TIPO.BOOLEAN),this._$.first_line,this._$.first_column+1);}
    |FALSE{$$=new LITERAL(false,new TIPOEXP(TIPO.BOOLEAN),this._$.first_line,this._$.first_column+1);}
    |STRING{$$=new LITERAL($1,new TIPOEXP(TIPO.STRING),this._$.first_line,this._$.first_column+1);}
    |CHAR{$$=new LITERAL($1,new TIPOEXP(TIPO.CHAR),this._$.first_line,this._$.first_column+1);}
    |LLAMADA{$$=$1;}
    |PAR_A TIPOEXP PAR_C EXP{$$=new CASTEO($2,$4,@1.first_line,@1.first_column+1);}
    |STRC TIPOEXP COR_A EXP COR_C{$$=new DECARRAY($4,$2,@1.first_line,@2.first_column+1);}
    |ARREGLO{$$=$1;}
    ;
ARREGLO:
    LLAV_A LLAV_C{$$=new ARREGLOVALOR(null,@1.first_line,@1.first_column+1);}
    |LLAV_A LISTAPAR LLAV_C{$$=new ARREGLOVALOR($2,@1.first_line,@1.first_column+1);}
    ;
TIPOEXP:
    INTEGER{$$=new TIPOEXP(TIPO.INTEGER);}
    |DOUBLE{$$=new TIPOEXP(TIPO.DOUBLE);}
    |CHARACTER{$$=new TIPOEXP(TIPO.CHAR);}
    |BOOLEAN{$$=new TIPOEXP(TIPO.BOOLEAN);}
    ;
AMBITO:
    LLAV_A CUERPOINTERNO LLAV_C{$$=$2;}
    |LLAV_A LLAV_C{$$=[]}
    ;
/*Controles*/
CONTROLES:
    CONTROL_IF{$$=$1;}
    |CONTROL_WHILE{$$=$1;}
    |CONTROL_SWITCH{$$=$1;}
    |CONTROL_DO_WHILE{$$=$1;}
    |CONTROL_FOR{$$=$1;}
    ;
CONTROL_IF:
    IF PAR_A EXP PAR_C AMBITO{$$=new CONTROLIF($3,$5,null,this._$.first_line,this._$.first_column+1);}
    |IF PAR_A EXP PAR_C AMBITO L_ELSE{$$=new CONTROLIF($3,$5,$6,this._$.first_line,this._$.first_column+1)}
    ;
L_ELSE:
    ELSE IF PAR_A EXP PAR_C AMBITO L_ELSE{$7.unshift(new ELSEIF($4,$6,this._$.first_line,this._$.first_column+1));$$=$7;}
    |ELSE IF PAR_A EXP PAR_C AMBITO{$$=[new ELSEIF($4,$6,this._$.first_line,this._$.first_column+1)];}
    |ELSE AMBITO{$$=[new ELSE($2,this._$.first_line,this._$.first_column+1)];}
    ;
    
CONTROL_SWITCH:
    SWITCH PAR_A EXP PAR_C LLAV_A L_CASE LLAV_C{$$=new SWITCH($3,$6,this._$.first_line,this._$.first_column);}
    |SWITCH PAR_A EXP PAR_C LLAV_A LLAV_C{$$=new SWITCH($3,null,this._$.first_line,this._$.first_column);}
    ;

L_CASE:
    CASE EXP DOSPUNTOS CUERPOINTERNO L_CASE{$5.unshift(new CASE($2,$4,this._$.first_line,this._$.first_column+1));$$=$5;}
    |CASE EXP DOSPUNTOS CUERPOINTERNO{$$=[new CASE($2,$4,this._$.first_line,this._$.first_column+1)];}
    |CASE EXP DOSPUNTOS L_CASE{$4.unshift(new CASE($2,null,this._$.first_line,this._$.first_column+1));$$=$4;}
    |CASE EXP DOSPUNTOS{$$=[new CASE($2,null,this._$.first_line,this._$.first_column+1)];}
    |DEFAULT DOSPUNTOS{$$=[new DEFAULT(null,this._$.first_line,this._$.first_column+1)];}
    |DEFAULT DOSPUNTOS CUERPOINTERNO{$$=[new DEFAULT($3,this._$.first_line,this._$.first_column+1)]}
    ;

CONTROL_WHILE:
    WHILE PAR_A EXP PAR_C AMBITO{$$=new WHILE($3,$5,this._$.first_line,this._$.first_column+1);}
    ;

CONTROL_DO_WHILE:
    DO AMBITO WHILE PAR_A EXP PAR_C{$$=new DO_WHILE($2,$5,this._$.first_line,this._$.first_column+1);}
    |DO AMBITO WHILE PAR_A EXP PAR_C PYCOMA{$$=new DO_WHILE($2,$5,this._$.first_line,this._$.first_column+1);}
    ;

CONTROL_FOR:
    FOR PAR_A CONTENIDOFOR  PAR_C AMBITO{$$=new FOR($3[0],$3[1],$3[2],$5,this._$.first_line,this._$.first_column);}
    ;
CONTENIDOFOR:
    CONTENIDOFOR1 CONTENIDOFOR2 CONTENIDOFOR3{$$=[$1,$2,$3];}
    ;
CONTENIDOFOR1:
    DECLARACION PYCOMA{$$=$1}
    |ASIGNACION PYCOMA{$$=$1}
    |PYCOMA{$$=null}
    ;
CONTENIDOFOR2:
    EXP PYCOMA{$$=$1;}
    |PYCOMA{$$=null;}
    ;
CONTENIDOFOR3:  {$$=null;} 
    |ASIGNACION{$$=$1;} 
    |DECLARACION {$$=$1;}
    ;
TRANSFERENCIAS:
    BREAK PYCOMA{$$=new BREAK(this._$.first_line,@1.first_column+1);}
    |BREAK{$$=new BREAK(@1.first_line,@1.first_column+1);}
    |CONTINUE{$$=new CONTINUE(@1.first_line,@1.first_column+1);}
    |CONTINUE PYCOMA{$$=new CONTINUE(@1.first_line,@1.first_column+1)}
    |RETURN PYCOMA{$$=new RETURN(null,@1.first_line,@1.first_column+1)}
    |RETURN EXP PYCOMA{$$=new RETURN($2,@1.first_line,@1.first_column+1)}
    ;

DECFUNCION:
    TIPO ID PAR_A LISTA_PARAMETROS_FUNCION PAR_C AMBITO{$$=new DECFUNCION($1,new IDENTIFICADOR($2,this._$.first_line,this._$.first_column+1),$4,$6,false,this._$.first_line,this._$.first_column+1);}
    |TIPO ID PAR_A PAR_C AMBITO{$$=new DECFUNCION($1,new IDENTIFICADOR($2,this._$.first_line,this._$.first_column+1),null,$5,false,this._$.first_line,this._$.first_column+1);}
    |VOID ID PAR_A LISTA_PARAMETROS_FUNCION PAR_C AMBITO{$$=new DECFUNCION(new TIPOEXP(TIPO.VOID,null),new IDENTIFICADOR($2,this._$.first_line,this._$.first_column+1),$4,$6,false,this._$.first_line,this._$.first_column+1);}
    |VOID ID PAR_A PAR_C AMBITO{$$=new DECFUNCION(new TIPOEXP(TIPO.VOID),new IDENTIFICADOR($2,this._$.first_line,this._$.first_column+1),null,$5,false,this._$.first_line,this._$.first_column+1);}
    |TIPO COR_A COR_C ID PAR_A LISTA_PARAMETROS_FUNCION PAR_C AMBITO
    |TIPO COR_A COR_C ID PAR_A PAR_C  AMBITO
    ;
LISTA_PARAMETROS_FUNCION:
    TIPO ID COMA LISTA_PARAMETROS_FUNCION{$4.unshift(new PARAMETROS($1,new IDENTIFICADOR($2,this._$.first_line,this._$.first_column)));$$=$4;}
    |TIPO ID{$$=[new PARAMETROS($1,new IDENTIFICADOR($2,this._$.first_line,this._$.first_column))];}
    ;

TRY_CATCH:
    TRY AMBITO CATCH PAR_A ID ID PAR_C AMBITO
    ;

DECSTRUCT:
    DEFINE ID AS COR_A LISTA_ATRIBUTOS COR_C PYCOMA
    |DEFINE ID AS COR_A LISTA_ATRIBUTOS COR_C
    ;

LISTA_ATRIBUTOS:
    TIPO ID
    |LISTA_ATRIBUTOS  COMA TIPO ID
    |LISTA_ATRIBUTOS COMA TIPO ID IGUAL EXP
    |TIPO ID IGUAL EXP
    ;