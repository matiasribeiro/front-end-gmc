
import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ColaboradoresRoutingModule, routedComponents } from './colaboradores-routing.module';
import { ColaboradoresService } from './colaboradores-service';
import { ColaboradoresComponent } from './colaboradores.component';



@NgModule({

  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    ColaboradoresRoutingModule,
    Ng2SmartTableModule,
    NbUserModule
  ],

  providers: [
    ColaboradoresService,
  ],
  declarations: [
    ...routedComponents,
   // FsIconComponent,
    ColaboradoresComponent,
  ],
})
export class ColaboradoresModule { }
