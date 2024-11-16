import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMoreDataComponent } from './add-more-data.component';

const routes: Routes = [
  {
    path: '',
    component: AddMoreDataComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddMoreDataRoutingModule {}
