import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-errores',
  templateUrl: './tabla-errores.component.html',
  styleUrls: ['./tabla-errores.component.css']
})
export class TablaErroresComponent implements OnInit {
  elements: any = [
    { id: 1, first: 'Mark', last: 'Otto', handle: '@mdo' },
    { id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat' },
    { id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter' },
  ];
  elementos: any = []
  constructor() { }
  headElements = ['Tipo', 'Mensaje', 'Linea', 'Columna'];
  ngOnInit(): void {
    this.construir()
  }
  construir() {
    let valores = JSON.parse(localStorage.getItem('tabla'))
    this.elements = valores;
    console.log(valores)
  }
}
