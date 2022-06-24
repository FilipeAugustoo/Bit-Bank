import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../cadastro/login/Usuario.service';
import { SaldoService } from './../home/saldo.service';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit {
  public valor: number;
  public dadosDeposito: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: SaldoService,
    private route: Router,
    private authService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.dadosDeposito = this.formBuilder.group(
      {
        valor: ['', Validators.required]
      }
    )
  }

  public deposita() {
    this.service.adicionaSaldo(this.valor, this.authService.usuario());
    this.valor = 0;
    this.route.navigate(['/home']);
  }

}
