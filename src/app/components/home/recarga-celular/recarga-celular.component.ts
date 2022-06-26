import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Extrato } from '../extrato/extrato.model';
import { AppComponent } from './../../../app.component';
import { UsuarioService } from './../../cadastro/login/Usuario.service';
import { ExtratoService } from './../extrato/extrato.service';
import { SaldoService } from './../home/saldo.service';

@Component({
  selector: 'app-recarga-celular',
  templateUrl: './recarga-celular.component.html',
  styleUrls: ['./recarga-celular.component.css'],
})
export class RecargaCelularComponent implements OnInit {
  public dadosRecarga!: FormGroup;
  public valor;
  public stylePadrao = 'border: 3px solid #f7931a;';

  @Input() type = 'number';

  constructor(
    private formBuilder: FormBuilder,
    private service: ExtratoService,
    private router: Router,
    private saldoService: SaldoService,
    private usuarioService: UsuarioService,
    private saldo: AppComponent
    ) {}

  ngOnInit(): void {
    this.dadosRecarga = this.formBuilder.group({
      numero: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      valorRecarga: ['', [Validators.required]],
    });
  }

  /*-----------------------------------------*/
  private reset(): void {
    this.dadosRecarga = this.formBuilder.group({
      numero: [''],
      valorRecarga: [''],
    });
  }

  public mudaCor(atributo: string) {
    this.stylePadrao = '';
    document.querySelectorAll('.itens-hover').forEach(r => r.classList.remove('ativo'));
    document.querySelector(atributo).classList.add('ativo');
  }
  /*-----------------------------------------*/

  public recarregar(): void {
    if (this.saldo.saldo >= this.valor) {
      this.saldoService.removeSaldo(this.valor, this.usuarioService.usuario());
      if (this.dadosRecarga.valid) {
        const valorEmitir: Extrato = {
          tipo: 'Recarga Celular',
          valor: this.valor
        }
        this.service.recebeValores(valorEmitir);
        this.router.navigate(['/home/extrato']);
      } else {
        alert('Faltam Dados!')
      }
    } else {
      alert('Saldo Insuficiente')
    }
    this.reset();
  }
}
