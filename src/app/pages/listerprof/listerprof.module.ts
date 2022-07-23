import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListerprofPageRoutingModule } from './listerprof-routing.module';
import {HttpClientModule} from '@angular/common/http'

import { ListerprofPage } from './listerprof.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListerprofPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListerprofPage]
})
export class ListerprofPageModule {}
