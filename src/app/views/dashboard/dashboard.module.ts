import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule, 
    NgbModule,
    RouterModule,
  
    MatButtonModule,
    MatIconModule,
    MatCardModule],
})
export class DashboardModule {}
