import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormValidatorDirective } from './directives';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormValidatorDirective],
  declarations: [FormValidatorDirective],
})
export class SharedModule { }
