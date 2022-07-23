import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MymodalPage } from './mymodal.page';

const routes: Routes = [
  {
    path: '',
    component: MymodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MymodalPageRoutingModule {}
