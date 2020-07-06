import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TituloComponent } from './titulo/titulo.component';
import { BarraComponent } from './barra/barra.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule, MatIcon} from '@angular/material/icon';

import { PestaniaComponent } from './pestania/pestania.component';
import {MatTabsModule} from '@angular/material/tabs';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { ConsolaComponent } from './consola/consola.component';
import { NumberRowColumnComponent } from './number-row-column/number-row-column.component';
import { ArbolComponent } from './arbol/arbol.component';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { TablaComponent } from './tabla/tabla.component';
import {MatTableModule} from '@angular/material/table';
import { BloquesComponent } from './bloques/bloques.component';
import { TablaOptimizacionComponent } from './tabla-optimizacion/tabla-optimizacion.component';
import { TablaErroresComponent } from './tabla-errores/tabla-errores.component';

@NgModule({
  declarations: [
    AppComponent,
    TituloComponent,
    BarraComponent,
    PestaniaComponent,
    TextEditorComponent,
    ConsolaComponent,
    NumberRowColumnComponent,
    ArbolComponent,
    EditorComponent,
    TablaComponent,
    BloquesComponent,
    TablaOptimizacionComponent,
    TablaErroresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    AceEditorModule,
    MatTableModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
