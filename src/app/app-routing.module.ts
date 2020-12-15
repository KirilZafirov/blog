import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { CanActivateGuard } from './core/guards/canActivate.guard';
import { HomeEntryComponent } from './features/home-entry/home-entry/home-entry.component';
const routerOptions: ExtraOptions = {
  enableTracing: true,
  useHash: false,
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 32],
  relativeLinkResolution: 'legacy',
};
const routes: Routes = [
  {
    path: '',
    component: HomeEntryComponent
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./features/detail/detail.module').then(
        (m) => m.DetailModule
      ),
    canActivate:[CanActivateGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
