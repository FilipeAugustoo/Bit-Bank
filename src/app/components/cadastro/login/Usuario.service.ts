import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../novo-usuario/novo-usuario';
import { environment } from './../../../../environments/environment.prod';
import { SaldoService } from './../../home/home/saldo.service';
import { TokenService } from './../auth/Token.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(
    private http: HttpClient,
    private route: Router,
    private tokenService: TokenService,
    private SaldoService:SaldoService
  ) {
    if (this.tokenService.possuiToken()) {
      this.decodificaJWT();
    }
  }

  private usuarioAutenticado: boolean = false;
  readonly mostraParametros = new EventEmitter<boolean>(false);
  private usuarioLogado;

  private autenticar(user: string, password: string): Observable<HttpResponse<any>> {

    const dados: Usuario = {
      usuario: user,
      senha: password
    }

    return this.http.post(
      `${environment.apiURL}/login`,
      dados,
      {observe: 'response', responseType: 'text' }
    ).pipe(
        tap(response => {
          const token = response.body;
          this.salvaToken(token);
    }));

  }

  public logar(usuario: string, senha: string): void {

    this.autenticar(usuario, senha).subscribe(
      () => {
        this.route.navigate(['/home']);
        this.usuarioAutenticado = true;
      },
      (error) => {
        alert('Usuario ou senha invalido');
        console.log(error);
      }
    );
  }

  public usuarioEstaAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  private decodificaJWT() {
    const token = this.tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;
    this.usuarioLogado = usuario['sub'];
    this.usuarioSubject.next(usuario);
  }

  public retornaUsuario() {
    return this.usuarioSubject.asObservable();
  }

  public salvaToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificaJWT();
  }

  public logout() {
    this.mostraParametros.emit(false);
    this.tokenService.excluiToken();
    this.route.navigate(['/login']);
  }

  public usuario() {
    return this.usuarioLogado;
  }

  public estaLogado() {
    this.SaldoService.mostraSaldo(this.usuarioLogado);
    return this.tokenService.possuiToken();
  }
}
