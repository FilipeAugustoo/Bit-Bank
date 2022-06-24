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
  public stylePadrao = 'border: 3px solid #838383;';

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

  private resetaCor(tipo1, tipo2, tipo3): void {
    document.getElementById(tipo1).style.border = '3px solid #000000';
    document.getElementById(tipo2).style.border = '3px solid #000000';
    document.getElementById(tipo3).style.border = '3px solid #000000';
  }

  public vivo(): void {
    this.resetaCor('oi', 'tim', 'claro');
    document.getElementById('vivo').style.border = '3px solid #838383';
  }

  public tim(): void {
    this.resetaCor('vivo', 'oi', 'claro');
    document.getElementById('tim').style.border = '3px solid #838383';
  }

  public oi(): void {
    this.resetaCor('tim', 'vivo', 'claro');
    document.getElementById('oi').style.border = '3px solid #838383';
  }

  public claro(): void {
    this.resetaCor('oi', 'vivo', 'tim');
    document.getElementById('claro').style.border = '3px solid #838383';
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
