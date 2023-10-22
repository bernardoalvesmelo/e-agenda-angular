import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';
import { LoadingModule } from './loading/loading.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule, 
    RouterModule,
    AuthModule, 
    LoadingModule,
    NgbCollapseModule,
  
    MatButtonModule,
    MatIconModule,
    MatCardModule],
  exports: [
    NavbarComponent,
    AuthModule,
    LoadingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
})
export class CoreModule {}
