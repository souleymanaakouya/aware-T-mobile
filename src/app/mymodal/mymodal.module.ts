import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MymodalPageRoutingModule } from './mymodal-routing.module';

import { MymodalPage } from './mymodal.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MymodalPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [MymodalPage]
})
export class MymodalPageModule {}
