import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { NumberRowColumnComponent } from "src/app/number-row-column/number-row-column.component";

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
  @ViewChild('editor') editor;
  text: string = "";

  ngAfterViewInit() {
    this.editor.setTheme("cobalt");
    this.editor.setMode("java");
    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true
    });

    this.editor.getEditor().commands.addCommand({
      name: "showOtherCompletions",
      bindKey: "Ctrl-.",
      exec: function (editor) {
      }
    })
  }
  @Input() numbers: NumberRowColumnComponent;
  constructor() {

  }

  ngOnInit(): void {
   
  }
  onChange(code) {
    this.numbers.linea = this.editor._editor.selection.cursor.row + 1;
    this.numbers.columna = this.editor._editor.selection.cursor.column + 1;
  }

}
