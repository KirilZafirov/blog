import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HomeEntryComponent } from './features/home-entry/home-entry/home-entry.component';

const routes: Routes = [
  {
    path: '',
    component: HomeEntryComponent
  },
  {
    path: 'detail',
    loadChildren: () => import('./features/detail/detail.module').then((m) => m.DetailModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
