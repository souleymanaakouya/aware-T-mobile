import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListerprofPage } from './listerprof.page';

const routes: Routes = [
  {
    path: '',
    component: ListerprofPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListerprofPageRoutingModule {}
