import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderButtonComponent } from '../header-button/header-button.component';

@NgModule({
  declarations: [
    HeaderButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderButtonComponent
  ]
})
export class HeaderModule { }
