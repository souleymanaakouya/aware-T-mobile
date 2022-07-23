import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SyllabusPageRoutingModule } from './syllabus-routing.module';

import { SyllabusPage } from './syllabus.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SyllabusPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [SyllabusPage]
})
export class SyllabusPageModule {}
