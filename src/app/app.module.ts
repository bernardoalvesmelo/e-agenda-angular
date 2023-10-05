import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContatosModule } from './views/contatos/contatos.module';
import { HttpClientModule } from '@angular/common/http';
import { CompromissosModule } from './views/compromissos/compromissos.module';

@NgModule({
  // Componentes e diretivas que o Módulo Distribui
  declarations: [AppComponent],

  // Importa metadados de outros módulos (incluindo bibliotecas)
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),

    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    DashboardModule,
    ContatosModule,
    CompromissosModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
