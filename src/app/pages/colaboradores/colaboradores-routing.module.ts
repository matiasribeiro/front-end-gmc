import { ColaboradoresComponent } from './colaboradores.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: ColaboradoresComponent,
  children: [
    {
      path: 'colaboradores',
      component: ColaboradoresComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColaboradoresRoutingModule { }

export const routedComponents = [
  ColaboradoresComponent
];
