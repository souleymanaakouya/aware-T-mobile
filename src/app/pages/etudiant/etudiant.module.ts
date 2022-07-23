import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import {HttpClient} from '@angular/common/http'
import { EtudiantPageRoutingModule } from './etudiant-routing.module';
import { SignaturePadModule } from 'angular2-signaturepad';
import { EtudiantPage } from './etudiant.page';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtudiantPageRoutingModule,
    SignaturePadModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [EtudiantPage]
})
export class EtudiantPageModule {}
