import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberOnlyDirective } from './directive/number.directive';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [ NumberOnlyDirective ],
 exports:      [ CommonModule, FormsModule , ReactiveFormsModule , NumberOnlyDirective]
})
export class SharedModule { }
