import { Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { SzczegolyComponent } from './szczegoly/szczegoly.component';
import { FormularzComponent } from './formularz/formularz.component';

export const routes: Routes = [
    { path: '', component: ListaComponent },
    { path: 'formularz', component: FormularzComponent },
    { path: 'formularz/:id', component: FormularzComponent }, 
    { path: 'szczegoly/:id', component: SzczegolyComponent }
  ];
  
