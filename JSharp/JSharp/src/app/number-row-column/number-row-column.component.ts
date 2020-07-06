import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-row-column',
  templateUrl: './number-row-column.component.html',
  styleUrls: ['./number-row-column.component.css']
})
export class NumberRowColumnComponent implements OnInit {
  columna: Number = 0;
  linea:Number=0;
  constructor() { }

  ngOnInit(): void {
  }

}
