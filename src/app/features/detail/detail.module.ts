import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { DetailRoutingModule } from './detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DetailRoutingModule
  ],
  declarations: [DetailComponent],
  providers:[]
})
export class DetailModule { }
