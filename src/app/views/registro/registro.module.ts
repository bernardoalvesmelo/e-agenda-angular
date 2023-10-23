import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import 'src/app/extensions/form-group.extension';


@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistroRoutingModule,
    
    
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class RegistroModule { }
