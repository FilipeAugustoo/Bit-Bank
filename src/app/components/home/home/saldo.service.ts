import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../cadastro/novo-usuario/novo-usuario';
import { environment } from './../../../../environments/environment.prod';

import { TokenService } from './../../cadastro/auth/Token.service';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  constructor(private http:HttpClient,
    private tokenService:TokenService,
    private route: Router) { }

  readonly saldo = new EventEmitter<number>();

  public adicionaSaldo(valor: number, usuario: string) {
    var HEADER: HttpHeaders = this.tokenService.header();
    const valorSaldo = {
      saldo: valor
    }

    this.http.patch(`${environment.apiURL}/usuario/${usuario}/saldo?tipo=add`, valorSaldo, {headers: HEADER}).subscribe(() => {
      window.location.reload();
      this.route.navigate(['/home']);
    });
  }

  public removeSaldo(valor: number, usuario: string) {
    var HEADER: HttpHeaders = this.tokenService.header();
    const valorSaldo = {
      saldo: valor
    }

    this.http.patch(`${environment.apiURL}/usuario/${usuario}/saldo?tipo=rem`, valorSaldo, {headers: HEADER}).subscribe(() => {
      window.location.reload();
    });
  }

  public mostraSaldo(usuario: string) {
    var HEADER: HttpHeaders = this.tokenService.header();

    this.http.get<Usuario>(`${environment.apiURL}/usuario/${usuario}`, {headers: HEADER})
      .subscribe(res => this.saldo.emit(res.saldo));

  }
}
