import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveFormComponent } from './save-form/save-form.component';
import { ViewFormComponent } from './view-form/view-form.component';

const routes: Routes = [
  { path: 'register', component: SaveFormComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full'},

  { path: 'view-Form', component: ViewFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
