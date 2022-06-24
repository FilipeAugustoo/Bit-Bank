import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from './../../../app.component';
import { UsuarioService } from './../../cadastro/login/Usuario.service';
import { ExtratoService } from './../extrato/extrato.service';
import { SaldoService } from './../home/saldo.service';

@Component({
  selector: 'app-pix',
  templateUrl: './pix.component.html',
  styleUrls: ['./pix.component.css'],
})
export class PixComponent implements OnInit {
  public dadosPix!: FormGroup;
  public valor;
  public stylePadrao = 'border: 3px solid #838383;';

  @Input() type = 'number';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: ExtratoService,
    private saldo: AppComponent,
    private saldoService: SaldoService,
    private usuario: UsuarioService
  ) {}

  public ngOnInit(): void {
    this.dadosPix = this.formBuilder.group({
      chavePix: ['', [Validators.required]],
      valorPix: ['', [Validators.required]],
    });
  }

  private resetaCor(tipo1, tipo2, tipo3, tipo4): void {
    document.getElementById(tipo1).style.border = '3px solid #000000';
    document.getElementById(tipo2).style.border = '3px solid #000000';
    document.getElementById(tipo3).style.border = '3px solid #000000';
    document.getElementById(tipo4).style.border = '3px solid #000000';
  }

  /*-----------------------------------------*/
  public tipoCpf(): void {
    this.resetaCor('cnpj', 'telefone', 'email', 'chaveAleatoria');
    this.type = 'number';
    document.getElementById('cpf').style.border = '3px solid #838383';
  }

  public tipoCnpj(): void {
    this.resetaCor('cpf', 'telefone', 'email', 'chaveAleatoria');
    this.type = 'number';
    document.getElementById('cnpj').style.border = '3px solid #838383';
  }

  public tipoTelefone(): void {
    this.resetaCor('cnpj', 'cpf', 'email', 'chaveAleatoria');
    this.type = 'number';
    document.getElementById('telefone').style.border = '3px solid #838383';
  }

  public tipoEmail(): void {
    this.resetaCor('cnpj', 'telefone', 'cpf', 'chaveAleatoria');
    this.type = 'email';
    document.getElementById('email').style.border = '3px solid #838383';
  }

  public tipoChaveAleatoria(): void {
    this.resetaCor('cnpj', 'telefone', 'email', 'cpf');
    this.type = 'text';
    document.getElementById('chaveAleatoria').style.border =
      '3px solid #838383';
  }
  /*-----------------------------------------*/

  public enviar(): void {
    if (this.saldo.saldo >= this.valor) {
      this.saldoService.removeSaldo(this.valor, this.usuario.usuario())
      if (this.dadosPix.valid) {
        const valorEmitir = {
            tipo: 'Pix',
            valor: this.valor
        }
        this.service.recebeValores(valorEmitir)
        this.router.navigate(['/home/extrato']);
      } else {
        alert('Faltam Dados!');
      }
    } else {
      alert('Saldo Insuficiente!')
    }

  }
}
