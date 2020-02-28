import { ConversorHorasPipe } from './../pipes/conversor-horas.pipe';
import { ConversorDiaPipe } from './../pipes/conversor-dia.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorarioPageRoutingModule } from './horario-routing.module';

import { HorarioPage } from './horario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioPageRoutingModule
  ],
  declarations: [HorarioPage, ConversorDiaPipe, ConversorHorasPipe]
})
export class HorarioPageModule {}
