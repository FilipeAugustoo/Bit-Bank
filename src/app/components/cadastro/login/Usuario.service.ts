import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../novo-usuario/novo-usuario';
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

  private URL = 'http://localhost:8080/login';

  private usuarioAutenticado: boolean = false;
  public mostraSaldo = new EventEmitter<boolean>();
  private usuarioLogado;

  private autenticar(user: string, password: string): Observable<HttpResponse<any>> {

    const dados: Usuario = {
      usuario: user,
      senha: password
    }

    return this.http.post(
      this.URL,
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
        console.log('Autenticado com sucesso');
        this.route.navigate(['/home']);
        this.usuarioAutenticado = true;
      },
      (error) => {
        alert('Usuario ou senha invalido');
        console.log(error);
        this.mostraSaldo.emit(false);
      }
    );
  }

  public usuarioEstaAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  public usuario(): string {
    return this.usuarioLogado;
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
    this.tokenService.excluiToken();
    this.usuarioSubject.next({});
  }

  public estaLogado() {
    this.mostraSaldo.emit(true);
    this.SaldoService.mostraSaldo(this.usuario());
    return this.tokenService.possuiToken();
  }
}
