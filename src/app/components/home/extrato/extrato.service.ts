import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { environment } from './../../../../environments/environment.prod';
import { TokenService } from './../../cadastro/auth/Token.service';
import { Extrato } from './extrato.model';


@Injectable({
  providedIn: 'root'
})
export class ExtratoService {

  @Output() recebeDados: Extrato[];

  constructor(private http:HttpClient,
    private tokenService:TokenService) { }

  public recebeValores(extrato: Extrato): void {
    var HEADER: HttpHeaders = this.tokenService.header();
    this.http.post(`${environment.apiURL}/extrato`, extrato, {headers: HEADER}).subscribe(() => {});
  }

  public extrato(usuario: string) {
    var HEADER: HttpHeaders = this.tokenService.header();
    return this.http.get<Extrato[]>(`${environment.apiURL}/extrato/${usuario}`, {headers: HEADER});
  }
}
