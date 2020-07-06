import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextEditorComponent } from "src/app/text-editor/text-editor.component"
import { NumberRowColumnComponent } from "src/app/number-row-column/number-row-column.component";
import { EditorComponent } from '../editor/editor.component';
@Component({
  selector: 'app-pestania',
  templateUrl: './pestania.component.html',
  styleUrls: ['./pestania.component.css']
})
export class PestaniaComponent implements OnInit {
  contador = 2;
  tabs = ['Pestaña 1'];
  editors: TextEditorComponent[] = [];
  selected = new FormControl(0);
  @Input() numbers: NumberRowColumnComponent;
  constructor() { }

  ngOnInit(): void {

  }
  addTab(nombre: string) {
    if (nombre == null) {
      //no se abre
      this.tabs.push(`Pestaña ${this.contador}`);
    } else {
      this.tabs.push(nombre);
    }
    this.contador++;
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  addEditor(editor, contador) {
    this.editors[contador] = editor;
  }

}
