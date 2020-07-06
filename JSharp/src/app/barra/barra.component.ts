import { Component, OnInit, Input } from '@angular/core';
import { PestaniaComponent } from 'src/app/pestania/pestania.component';
import { ConsolaComponent } from 'src/app/consola/consola.component';
import { Analizador } from 'src/Codigo/Analizador/Analizador';
import { Errores } from 'src/Codigo/Reportes/Errores';
import { AST } from 'src/Codigo/AST/AST';
import { VarGlobal } from 'src/Codigo/Global/VarGlobal';
import { element } from 'protractor';
import { Analizador2 } from 'src/Codigo/Analizador2/Analizador2';
import { Pila3D } from 'src/Codigo/3D/Pila3D';
import { CodigoEtiqueta } from 'src/Codigo/3D/CodigoEtiqueta';
import { IF } from 'src/Codigo/3D/IF';
import { Bloque } from 'src/Codigo/3D/Bloque'
import { Salto } from 'src/Codigo/3D/Salto';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {
  @Input() pest: PestaniaComponent;
  @Input() consola: ConsolaComponent;
  @Input() salida: ConsolaComponent;
  constructor() { }

  ngOnInit(): void {
  }
  funcionCrear(): void {
    this.pest.addTab(null);
  }
  funcionRemover(): void {
    this.pest.removeTab(this.pest.selected.value);
  }
  funcionImprimir(): void {
    console.log(this.pest.editors[0].editor)
    console.log(this.pest.selected.value);
    console.log(this.pest.editors[0].editor._editor.selection.cursor);
  }
  funcionTraducir(): void {
    this.salida.editor.setReadOnly(false);
    let indice = this.pest.selected.value;
    let cadena: string = this.pest.editors[indice].text;
    let analizador = new Analizador();
    let res = analizador.Traducir(cadena);

    let errores_lexicos = res.errores;
    let arbol: AST = res.arbol;
    this.consola.text = 'Salida-------------------------------------------->\n';
    if (errores_lexicos.length > 0) {
      errores_lexicos.forEach(element => {
        let e: Errores = element;
        this.consola.text += `Errores de tipo ${e.getTipo()} en la linea ${e.linea} columna ${e.columna} mensaje: ${e.mensaje}\n`;
      });
    } else {
      if (arbol == null) {
        this.salida.text = "Nada analizado";
        return;
      }
      let res = arbol.Ejecutar(null);
      let json = JSON.parse(res);
      let errores = json.error;

      if (errores.length > 0) {
        errores.forEach(element => {
          let e = element;
          this.consola.text += `Errores de tipo ${e._tipo} en la linea ${e._linea} columna ${e.columna} mensaje: ${e._mensaje}\n`;
        })
      }
      this.salida.editor.setReadOnly(false);
      this.salida.text = json.code;
    }
  }

  funcionMostrarArbol() {
    let indice = this.pest.selected.value;
    let cadena: string = this.pest.editors[indice].text;
    let analizador = new Analizador();
    let res = analizador.Traducir(cadena);

    let errores_lexicos = res.errores;
    let arbol: AST = res.arbol;
    this.consola.text = 'Salida-------------------------------------------->\n';
    if (errores_lexicos.length > 0) {
      errores_lexicos.forEach(element => {
        let e: Errores = element;
        this.consola.text += `Errores de tipo ${e.getTipo()} en la linea ${e.linea} columna ${e.columna} mensaje: ${e.mensaje}\n`;
      });
    } else {
      if (arbol == undefined || arbol == null) { return; }
      let cadena = arbol.GenerarArbol();
      let json = JSON.parse(cadena);
      localStorage.setItem("position", 'TD');
      localStorage.setItem('datos', JSON.stringify(json.nodo));
      localStorage.setItem('enlaces', JSON.stringify(json.enlace));
      var configuracion_ventana = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
      window.open("./arbol", "Pagina_Arbol", configuracion_ventana);
    }
  }
  funcionMostrarTabla() {
    this.salida.editor.setReadOnly(false);
    let indice = this.pest.selected.value;
    let cadena: string = this.pest.editors[indice].text;
    let analizador = new Analizador();
    let res = analizador.Traducir(cadena);

    let errores_lexicos = res.errores;
    let arbol: AST = res.arbol;
    this.consola.text = 'Salida-------------------------------------------->\n';
    if (errores_lexicos.length > 0) {
      errores_lexicos.forEach(element => {
        let e: Errores = element;
        this.consola.text += `Errores de tipo ${e.getTipo()} en la linea ${e.linea} columna ${e.columna} mensaje: ${e.mensaje}\n`;
      });
    } else {
      if (arbol == null) {
        this.salida.text = "Nada analizado";
        return;
      }
      let res = arbol.GenerarTabla();
      let json = JSON.parse(res);
      let errores = json.error;

      if (errores.length > 0) {
        errores.forEach(element => {
          let e = element;
          this.consola.text += `Errores de tipo ${e._tipo} en la linea ${e._linea} columna ${e.columna} mensaje: ${e._mensaje}\n`;
        })
      }
      this.salida.editor.setReadOnly(false);
      this.salida.text = json.code;
      let arreglo = json.entornos;
      localStorage.setItem('tabla', JSON.stringify(arreglo));
      var configuracion_ventana = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
      window.open("./tabla", "Pagina_Tabla", configuracion_ventana);
      //console.log(json.entornos)
    }
  }
  funcionMirilla() {
    this.salida.editor.setReadOnly(false);
    let indice = this.pest.selected.value;
    let cadena: string = this.pest.editors[indice].text;
    let analizador = new Analizador2();
    let res = analizador.Traducir(cadena);
    let Pila = new Pila3D(res);
    let resultado = Pila.OptimizarMirilla();
    this.salida.editor.setReadOnly(false);
    this.salida.text = resultado;
  }
  funcionMostrarMirilla() {
    this.salida.editor.setReadOnly(false);
    let indice = this.pest.selected.value;
    let cadena: string = this.pest.editors[indice].text;
    let analizador = new Analizador2();
    let res = analizador.Traducir(cadena);
    let Pila = new Pila3D(res);
    let resultado = Pila.OptimizarMirilla();
    this.salida.editor.setReadOnly(false);
    this.salida.text = resultado;
    localStorage.setItem('tabla', JSON.stringify(VarGlobal.getInstance().pilareglas));
    var configuracion_ventana = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
    window.open("./tabla-mirilla", "Pagina_Mirilla", configuracion_ventana);
  }
  funcionMostrarBloques() {
    this.salida.editor.setReadOnly(false);
    let indice = this.pest.selected.value;
    let cadena: string = this.pest.editors[indice].text;
    let analizador = new Analizador2();
    let res = analizador.Traducir(cadena);
    let Pila = new Pila3D(res);
    let resultado = Pila.ConstruirBloques();
    let codigo = []
    let enlace = []
    //let indice = VarGlobal.getInstance().contadorGrafo;
    codigo.push({ data: { id: `padre`, name: "", weight: 250, faveColor: '#FFFF00', faveShape: 'rectangle' } })
    for (let i = 0; i < resultado.length; i++) {
      let bloqueactual = resultado[i];
      codigo.push({ data: { id: `${i}`, parent: "padre", name: "", weight: 250, faveColor: '#162557', faveShape: 'rectangle' } })
      for (let j = 0; j < bloqueactual.lista.length; j++) {
        codigo.push({ data: { id: `${i}_${j}`, parent: `${i}`, name: `${bloqueactual.lista[j].Codigo()}`, weight: 250, faveColor: '#162557', faveShape: 'rectangle' } })
        if (j == 0) {
          //enlace.push({ data: { source: `${i}`, target: `${i}${j}`, faveColor: '#6FB1FC', strength: 90 } })
        } else {
          //enlace.push({ data: { source: `${i}_${j - 1}`, target: `${i}${j}`, faveColor: '#6FB1FC', strength: 90 } })
        }
      }
      if (i == 0) { continue }
      enlace.push({ data: { source: `${i - 1}`, target: `${i}`, faveColor: '#6FB1FC', strength: 90 } })
    }
    for (let i = 0; i < resultado.length; i++) {
      let bloqueactual = resultado[i];
      for (let j = 0; j < bloqueactual.lista.length; j++) {
        let codi = bloqueactual.lista[j];
        if (codi.numero == 2) {
          //debugger
          let indice = this.buscarEtiqueta((codi as Salto).salto, resultado);
          enlace.push({ data: { source: `${i}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        } else if (codi.numero == 4) {
          let indice = this.buscarEtiqueta((codi as IF).Salto, resultado);
          enlace.push({ data: { source: `${i}`, target: `${indice}`, faveColor: '#6FB1FC', strength: 90 } })
        }
      }
    }
    //enlac
    console.log(enlace)
    console.log(codigo)
    localStorage.setItem("position", 'LR');
    localStorage.setItem('datos', JSON.stringify(codigo));
    localStorage.setItem('enlaces', JSON.stringify(enlace));
    var configuracion_ventana = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
    window.open("./arbol", "Pagina_Arbol", configuracion_ventana);
    //console.log(resultado);
  }
  buscarEtiqueta(eti: string, resultado): string {
    // debugger;
    let indice = "";
    for (let i = 0; i < resultado.length; i++) {
      let bloqueactual: Bloque = resultado[i];
      if (bloqueactual.etiqueta == eti) {
        return `${i}`
      }
    }
    return indice;
  }
  funcionReporteErrores() {
    let pila = []
    this.salida.editor.setReadOnly(false);
    let indice = this.pest.selected.value;
    let cadena: string = this.pest.editors[indice].text;
    let analizador = new Analizador();
    let res = analizador.Traducir(cadena);

    let errores_lexicos = res.errores;
    let arbol: AST = res.arbol;
    this.consola.text = 'Salida-------------------------------------------->\n';
    if (errores_lexicos.length > 0) {
      errores_lexicos.forEach(element => {
        let e: Errores = element;
        this.consola.text += `Errores de tipo ${e.getTipo()} en la linea ${e.linea} columna ${e.columna} mensaje: ${e.mensaje}\n`;
        pila.push(e);
      });
      // console.log(pila);
      this.salida.editor.setReadOnly(false);
      localStorage.setItem('tabla', JSON.stringify(pila));
      var configuracion_ventana = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
      window.open("./errores", "Pagina_Errores", configuracion_ventana);
    } else {
      if (arbol == null) {
        this.salida.text = "Nada analizado";
        return;
      }
      let res = arbol.Ejecutar(null);
      let json = JSON.parse(res);
      let errores = json.error;

      if (errores.length > 0) {
        errores.forEach(element => {
          let e = element;
          this.consola.text += `Errores de tipo ${e._tipo} en la linea ${e._linea} columna ${e.columna} mensaje: ${e._mensaje}\n`;
          pila.push(e);
        })
        this.salida.editor.setReadOnly(false);
        this.salida.text = json.code;
        localStorage.setItem('tabla', JSON.stringify(pila));
        var configuracion_ventana = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
        window.open("./errores", "Pagina_Errores", configuracion_ventana);
      }

    }
  }
}
