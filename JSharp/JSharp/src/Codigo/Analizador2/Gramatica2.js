/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
export var Gramatica2 = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,10],$V1=[1,20],$V2=[1,19],$V3=[1,13],$V4=[1,16],$V5=[1,18],$V6=[1,17],$V7=[1,14],$V8=[1,15],$V9=[1,12],$Va=[1,28],$Vb=[5,12,15,22,24,25,27,30,44,45,47,48],$Vc=[1,34],$Vd=[21,29],$Ve=[1,58],$Vf=[1,61],$Vg=[1,59],$Vh=[1,60],$Vi=[20,21],$Vj=[20,21,31,32,33,34,35,36,37,38,39,40,41];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INICIAL":3,"CUERPO":4,"EOF":5,"DECLARACION":6,"SALTO":7,"LLAMADA":8,"DEFINICIONMETODO":9,"ASIGNACION":10,"CONIF":11,"ETIQUETA":12,"DOSPUNTOS":13,"INSPRINT":14,"PRINT":15,"PAR_A":16,"STRING":17,"COMA":18,"TERMINAL":19,"PAR_C":20,"PYCOMA":21,"IF":22,"EXP":23,"GOTO":24,"STACK":25,"COR_A":26,"ID":27,"COR_C":28,"IGUAL":29,"HEAP":30,"MAS":31,"MENOS":32,"POR":33,"DIV":34,"MODULO":35,"IGUAL_IGUAL":36,"DISTINTO":37,"MENOR":38,"MAYOR":39,"MAYOR_IGUAL":40,"MENOR_IGUAL":41,"ENTERO":42,"DECIMAL":43,"CALL":44,"PROC":45,"BEGIN":46,"END":47,"VAR":48,"LID":49,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",12:"ETIQUETA",13:"DOSPUNTOS",15:"PRINT",16:"PAR_A",17:"STRING",18:"COMA",20:"PAR_C",21:"PYCOMA",22:"IF",24:"GOTO",25:"STACK",26:"COR_A",27:"ID",28:"COR_C",29:"IGUAL",30:"HEAP",31:"MAS",32:"MENOS",33:"POR",34:"DIV",35:"MODULO",36:"IGUAL_IGUAL",37:"DISTINTO",38:"MENOR",39:"MAYOR",40:"MAYOR_IGUAL",41:"MENOR_IGUAL",42:"ENTERO",43:"DECIMAL",44:"CALL",45:"PROC",46:"BEGIN",47:"END",48:"VAR"},
productions_: [0,[3,2],[3,1],[4,1],[4,2],[4,1],[4,2],[4,1],[4,2],[4,1],[4,2],[4,1],[4,1],[4,2],[4,2],[4,2],[4,3],[4,1],[4,2],[14,7],[11,7],[10,7],[10,7],[10,4],[10,7],[10,7],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,1],[19,1],[19,1],[19,1],[19,2],[19,2],[19,2],[7,3],[8,3],[9,5],[9,4],[6,5],[6,5],[6,3],[6,5],[49,1],[49,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return $$[$0-1];
break;
case 2:
return null
break;
case 3: case 5: case 7: case 9: case 11: case 12: case 17: case 52:
this.$=[$$[$0]]
break;
case 4: case 6: case 8: case 10: case 13: case 14: case 18:
$$[$0-1].push($$[$0]);this.$=$$[$0-1]
break;
case 15:
this.$=[new CODIGOETIQUETA($$[$0-1],_$[$0-1].first_line,_$[$0-1].first_column+1)]
break;
case 16:
$$[$0-2].push(new CODIGOETIQUETA($$[$0-1],_$[$0-1].first_line,_$[$0-1].first_column+1));this.$=$$[$0-2]
break;
case 19:
this.$=new PRINT($$[$0-4],$$[$0-2],_$[$0-6].first_line,_$[$0-6].first_column+1);
break;
case 20:
this.$=new IF($$[$0-1],$$[$0-4][0],$$[$0-4][2],$$[$0-4][1],_$[$0-6].first_line,_$[$0-6].first_column+1)
break;
case 21:
this.$=new Asignacion3D(`Stack[${$$[$0-4]}]`,$$[$0-1],null,null,_$[$0-6].first_line,_$[$0-6].first_column+1);
break;
case 22:
this.$=new Asignacion3D(`Heap[${$$[$0-4]}]`,$$[$0-1],null,null,_$[$0-6].first_line,_$[$0-6].first_column+1);
break;
case 23:
this.$=new Asignacion3D($$[$0-3],$$[$0-1][0],$$[$0-1][2],$$[$0-1][1],_$[$0-3].first_line,_$[$0-3].first_column+1)
break;
case 24:
this.$=new Asignacion3D($$[$0-6],`Heap[${$$[$0-2]}]`,null,null,_$[$0-6].first_line,_$[$0-6].first_column+1)
break;
case 25:
this.$=new Asignacion3D($$[$0-6],`Stack[${$$[$0-2]}]`,null,null,_$[$0-6].first_line,_$[$0-6].first_column+1)
break;
case 26: case 27: case 28: case 29: case 30: case 31: case 32: case 33: case 34: case 35: case 36:
this.$=[$$[$0-2],$$[$0-1],$$[$0]]
break;
case 37:
this.$=[$$[$0],null,null]
break;
case 38: case 39: case 40:
this.$=$$[$0]
break;
case 41: case 42: case 43:
this.$=`-${$$[$0]}`
break;
case 44:
this.$=new SALTO($$[$0-1],_$[$0-2].first_line,_$[$0-2].first_column+1);
break;
case 45:
this.$=new LLAMADA($$[$0-1],_$[$0-2].first_line,_$[$0-2].first_column+1);
break;
case 46:
this.$=new METODO($$[$0-3],$$[$0-1],_$[$0-4].first_line,_$[$0-4].first_column+1)
break;
case 47:
this.$=new Metodo($$[$0-2],null,_$[$0-3].first_line,_$[$0-3].first_column+1)
break;
case 48:
this.$=new DECLARACIONPILA(true,_$[$0-4].first_line,_$[$0-4].first_column+1)
break;
case 49:
this.$=new DECLARACIONPILA(false,_$[$0-4].first_line,_$[$0-4].first_column+1)
break;
case 50:
this.$=new DECLARACION($$[$0-1],_$[$0-2].first_line,_$[$0-2].first_column+1);
break;
case 51:
this.$=new DECLARACIONP($$[$0-3][0],$$[$0-1]);
break;
case 53:
$$[$0].unshift($$[$0-2]);this.$=$$[$0];
break;
}
},
table: [{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:9,12:$V0,14:11,15:$V1,22:$V2,24:$V3,25:$V4,27:$V5,30:$V6,44:$V7,45:$V8,48:$V9},{1:[3]},{5:[1,21],6:22,7:23,8:24,9:25,10:27,11:26,12:$Va,14:29,15:$V1,22:$V2,24:$V3,25:$V4,27:$V5,30:$V6,44:$V7,45:$V8,48:$V9},{1:[2,2]},o($Vb,[2,3]),o($Vb,[2,5]),o($Vb,[2,7]),o($Vb,[2,9]),o($Vb,[2,11]),o($Vb,[2,12]),{13:[1,30]},o($Vb,[2,17]),{25:[1,31],27:$Vc,30:[1,32],49:33},{12:[1,35]},{27:[1,36]},{27:[1,37]},{26:[1,38]},{26:[1,39]},{29:[1,40]},{16:[1,41]},{16:[1,42]},{1:[2,1]},o($Vb,[2,4]),o($Vb,[2,6]),o($Vb,[2,8]),o($Vb,[2,10]),o($Vb,[2,13]),o($Vb,[2,14]),{13:[1,43]},o($Vb,[2,18]),o($Vb,[2,15]),{26:[1,44]},{26:[1,45]},{21:[1,46],29:[1,47]},o($Vd,[2,52],{18:[1,48]}),{21:[1,49]},{21:[1,50]},{46:[1,51]},{27:[1,52]},{27:[1,53]},{19:57,23:54,25:[1,56],27:$Ve,30:[1,55],32:$Vf,42:$Vg,43:$Vh},{19:57,23:62,27:$Ve,32:$Vf,42:$Vg,43:$Vh},{17:[1,63]},o($Vb,[2,16]),{28:[1,64]},{28:[1,65]},o($Vb,[2,50]),{19:57,23:66,27:$Ve,32:$Vf,42:$Vg,43:$Vh},{27:$Vc,49:67},o($Vb,[2,44]),o($Vb,[2,45]),{4:68,6:4,7:5,8:6,9:7,10:8,11:9,12:$V0,14:11,15:$V1,22:$V2,24:$V3,25:$V4,27:$V5,30:$V6,44:$V7,45:$V8,47:[1,69],48:$V9},{28:[1,70]},{28:[1,71]},{21:[1,72]},{26:[1,73]},{26:[1,74]},o($Vi,[2,37],{31:[1,75],32:[1,76],33:[1,77],34:[1,78],35:[1,79],36:[1,80],37:[1,81],38:[1,82],39:[1,83],40:[1,84],41:[1,85]}),o($Vj,[2,38]),o($Vj,[2,39]),o($Vj,[2,40]),{27:[1,86],42:[1,87],43:[1,88]},{20:[1,89]},{18:[1,90]},{21:[1,91]},{21:[1,92]},{21:[1,93]},o($Vd,[2,53]),{6:22,7:23,8:24,9:25,10:27,11:26,12:$Va,14:29,15:$V1,22:$V2,24:$V3,25:$V4,27:$V5,30:$V6,44:$V7,45:$V8,47:[1,94],48:$V9},o($Vb,[2,47]),{29:[1,95]},{29:[1,96]},o($Vb,[2,23]),{27:[1,97]},{27:[1,98]},{19:99,27:$Ve,32:$Vf,42:$Vg,43:$Vh},{19:100,27:$Ve,32:$Vf,42:$Vg,43:$Vh},{19:101,27:$Ve,32:$Vf,42:$Vg,43:$Vh},{19:102,27:$Ve,32:$Vf,42:$Vg,43:$Vh},{19:103,27:$Ve,32:$Vf,42:$Vg,43:$Vh},{19:104,27:$Ve,32:$Vf,42:$Vg,43:$Vh},{19:105,27:$Ve,32:$Vf,42:$Vg,43:$Vh},{19:106,27:$Ve,32:$Vf,42:$Vg,43:$Vh},{19:107,27:$Ve,32:$Vf,42:$Vg,43:$Vh},{19:108,27:$Ve,32:$Vf,42:$Vg,43:$Vh},{19:109,27:$Ve,32:$Vf,42:$Vg,43:$Vh},o($Vj,[2,41]),o($Vj,[2,42]),o($Vj,[2,43]),{24:[1,110]},{19:111,27:$Ve,32:$Vf,42:$Vg,43:$Vh},o($Vb,[2,48]),o($Vb,[2,49]),o($Vb,[2,51]),o($Vb,[2,46]),{19:112,27:$Ve,32:$Vf,42:$Vg,43:$Vh},{19:113,27:$Ve,32:$Vf,42:$Vg,43:$Vh},{28:[1,114]},{28:[1,115]},o($Vi,[2,26]),o($Vi,[2,27]),o($Vi,[2,28]),o($Vi,[2,29]),o($Vi,[2,30]),o($Vi,[2,31]),o($Vi,[2,32]),o($Vi,[2,33]),o($Vi,[2,34]),o($Vi,[2,35]),o($Vi,[2,36]),{12:[1,116]},{20:[1,117]},{21:[1,118]},{21:[1,119]},{21:[1,120]},{21:[1,121]},{21:[1,122]},{21:[1,123]},o($Vb,[2,21]),o($Vb,[2,22]),o($Vb,[2,24]),o($Vb,[2,25]),o($Vb,[2,20]),o($Vb,[2,19])],
defaultActions: {3:[2,2],21:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    var cadena="";
    var tam=0;

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
    
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/*naa*/
break;
case 1:/*NAAA*/
break;
case 2:/*NAAA*/
break;
case 3: return "GOTO";
break;
case 4: return "STACK";
break;
case 5: return "PROC";
break;
case 6: return "END";
break;
case 7: return "PRINT";
break;
case 8: return "HEAP";
break;
case 9: return "BEGIN";
break;
case 10: return "CALL";
break;
case 11: return "IF";
break;
case 12:return "VAR";
break;
case 13:cadena="";this.begin("string");
break;
case 14: return "MAS";
break;
case 15: return "MODULO";
break;
case 16: return "MENOS";
break;
case 17: return "POR";
break;
case 18: return "DIV";
break;
case 19: return "IGUAL_IGUAL";
break;
case 20: return "DISTINTO";
break;
case 21: return "MAYOR_IGUAL";
break;
case 22: return "MENOR_IGUAL";
break;
case 23: return "MAYOR";
break;
case 24: return "MENOR";
break;
case 25: return "IGUAL";
break;
case 26: return "DOSPUNTOS";
break;
case 27: return "PYCOMA";
break;
case 28: return "IGUAL";
break;
case 29: return "COMA";
break;
case 30: return "COR_A";
break;
case 31: return "PAR_A";
break;
case 32: return "PAR_C";
break;
case 33: return "COR_C";
break;
case 34: return "DECIMAL";
break;
case 35: return "ENTERO";
break;
case 36: return "ETIQUETA";
break;
case 37: return "ID";
break;
case 38:/*Enter*/
break;
case 39:/*Espacios en blanco*/
break;
case 40:this.begin("INITIAL");yy_.yytext=cadena;return "STRING";
break;
case 41:cadena+="\"";
break;
case 42:cadena+="\\";
break;
case 43:cadena+="\n";
break;
case 44:cadena+="\r";
break;
case 45:cadena+="\t";
break;
case 46:cadena+=" ";
break;
case 47:cadena+=yy_.yytext;
break;
case 48:this.begin("INITIAL");/*String sin finalizar reportar error*/
break;
case 49:this.begin("INITIAL");/*String sin finalizar*/
break;
case 50:return "EOF";
break;
case 51:var nuevo=new ERRORES(yy_.yylloc.first_line,yy_.yylloc.first_column+1,"Caracter invalido: "+yy_.yytext,1); lista_errores.push(nuevo);
break;
}
},
rules: [/^(?:\s+)/i,/^(?:(#.*))/i,/^(?:([#][*][^*]*[*]+([^#*][^*]*[*]+)*[#]))/i,/^(?:(goto\b))/i,/^(?:(Stack\b))/i,/^(?:(proc\b))/i,/^(?:(end\b))/i,/^(?:(print\b))/i,/^(?:(Heap\b))/i,/^(?:(begin\b))/i,/^(?:(call\b))/i,/^(?:(if\b))/i,/^(?:(var\b))/i,/^(?:("))/i,/^(?:(\+))/i,/^(?:(%))/i,/^(?:(-))/i,/^(?:(\*))/i,/^(?:(\/))/i,/^(?:(==))/i,/^(?:(<>))/i,/^(?:(>=))/i,/^(?:(<=))/i,/^(?:(>))/i,/^(?:(<))/i,/^(?:(=))/i,/^(?:(:))/i,/^(?:(;))/i,/^(?:(=))/i,/^(?:(,))/i,/^(?:(\[))/i,/^(?:(\())/i,/^(?:(\)))/i,/^(?:(\]))/i,/^(?:([0-9]+(\.[0-9]+)\b))/i,/^(?:([0-9]+\b))/i,/^(?:(L[0-9]+))/i,/^(?:([A-Za-zñÑ_][_0-9A-Za-zñÑ]*))/i,/^(?:((\r|\n|\r\n)))/i,/^(?:((\s\t\f\t)))/i,/^(?:("))/i,/^(?:(\\"))/i,/^(?:(\\\\))/i,/^(?:(\\n))/i,/^(?:(\\r))/i,/^(?:(\\t))/i,/^(?:\s+)/i,/^(?:.)/i,/^(?:((\r|\n|\r\n)))/i,/^(?:$)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"char":{"rules":[50,51],"inclusive":true},"string":{"rules":[40,41,42,43,44,45,46,47,48,49,50,51],"inclusive":true},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,50,51],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


