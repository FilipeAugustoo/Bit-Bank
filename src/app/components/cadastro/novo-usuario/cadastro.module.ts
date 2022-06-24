import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MensagemModule } from '../../mensagem/mensagem.module';
import { LoginComponent } from '../login/login.component';
import { NovoUsuarioComponent } from './novo-usuario.component';

@NgModule({
  declarations: [NovoUsuarioComponent, LoginComponent],
  imports: [
    CommonModule,
    MensagemModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [NovoUsuarioComponent, LoginComponent],
})
export class CadastroModule {}
