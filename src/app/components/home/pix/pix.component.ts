import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Extrato } from '../extrato/extrato.model';
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
  public stylePadrao = 'border: 3px solid #f7931a;';

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

  /*-----------------------------------------*/
  public tipoNumber(): void {
    this.stylePadrao = '';
    this.type = 'number';
  }

  public tipoEmail(): void {
    this.stylePadrao = '';
    this.type = 'email';
  }

  public tipoChaveAleatoria(): void {
    this.stylePadrao = '';
    this.type = 'text';
  }

  public mudarCor(atributo: string) {
    document.querySelectorAll('.itens-hover').forEach(r => r.classList.remove('ativo'));
    document.querySelector(atributo).classList.add('ativo');
  }
  /*-----------------------------------------*/

  public enviar(): void {
    if (this.saldo.saldo >= this.valor) {
      if (this.dadosPix.valid) {
        this.saldoService.removeSaldo(this.valor, this.usuario.usuario())
        const valorEmitir: Extrato = {
            tipo: "Pix",
            valor: this.valor
        }
        this.service.recebeValores(valorEmitir);
        this.router.navigate(['/home/extrato']);
      } else {
        alert('Faltam Dados!');
      }
    } else {
      alert('Saldo Insuficiente!')
    }
  }
}
