import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArbolComponent } from './arbol/arbol.component';
import { EditorComponent } from './editor/editor.component';
import { TablaComponent } from './tabla/tabla.component';
import { BloquesComponent } from './bloques/bloques.component';
import { TablaOptimizacionComponent } from './tabla-optimizacion/tabla-optimizacion.component';
import { TablaErroresComponent } from './tabla-errores/tabla-errores.component';


const routes: Routes = [
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: 'arbol',
    component: ArbolComponent
  },
  {
    path: 'tabla',
    component: TablaComponent
  },
  {
    path: 'bloque',
    component: BloquesComponent
  },
  {
    path: 'tabla-mirilla',
    component: TablaOptimizacionComponent
  },
  {
    path:'errores',
    component:TablaErroresComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
