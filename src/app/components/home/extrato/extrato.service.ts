import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { TokenService } from './../../cadastro/auth/Token.service';
import { Extrato } from './extrato.model';


@Injectable({
  providedIn: 'root'
})
export class ExtratoService {
  readonly URL = 'http://localhost:8080/extrato';

  @Output() recebeDados: Extrato[];

  constructor(private http:HttpClient,
    private tokenService:TokenService) { }

  public recebeValores(extrato: Extrato): void {
    extrato.data = new Date();
    //this.recebeDados.push(extrato);
   }

  public extrato(usuario: string) {
    var HEADER: HttpHeaders = this.tokenService.header();
    return this.http.get<Extrato[]>(`${this.URL}/${usuario}`, {headers: HEADER});
  }
}
