import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MensagemModule } from '../../mensagem/mensagem.module';
import { DepositoComponent } from '../deposito/deposito.component';
import { ExtratoComponent } from './../extrato/extrato.component';
import { PixComponent } from './../pix/pix.component';
import { RecargaCelularComponent } from './../recarga-celular/recarga-celular.component';
import { HomeComponent } from './home.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    HomeComponent,
    PixComponent,
    ExtratoComponent,
    DepositoComponent,
    RecargaCelularComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MensagemModule,
    FormsModule,
  ],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'
    },
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    }
  ]
})
export class HomeModule {}

