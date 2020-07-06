import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-consola',
  templateUrl: './consola.component.html',
  styleUrls: ['./consola.component.css']
})
export class ConsolaComponent implements OnInit {
 @ViewChild('editor') editor;
  text: string = "Salida------------------------->>>\n";
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.editor.setTheme("terminal");
    this.editor.setMode("text");
    this.editor.setReadOnly(true);
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

}
