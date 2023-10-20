import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';
import { LoadingModule } from './loading/loading.module';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule, 
    RouterModule,
    AuthModule, 
    LoadingModule,
    NgbCollapseModule],
  exports: [
    NavbarComponent,
    AuthModule,
    LoadingModule
  ],
})
export class CoreModule {}
