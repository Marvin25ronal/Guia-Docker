import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  elements: any = [
    {id: 1, first: 'Mark', last: 'Otto', handle: '@mdo'},
    {id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat'},
    {id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter'},
  ];
  elementos: any = []
  constructor() { }
  headElements = ['ID', 'Nombre', 'Parametros','Tipo','Tam','Ambito', 'Linea','Columna'];
  ngOnInit(): void {
    this.construir()
  }
  construir() {
    let valores=JSON.parse(localStorage.getItem('tabla'))
    this.elements=valores;
    console.log(valores)
  }
}
