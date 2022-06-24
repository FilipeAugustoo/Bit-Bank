import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private route: Router
  ) {}

  private usuarioAutenticado: boolean = false;
  public mostraSaldo = new EventEmitter<boolean>();


  autenticar(usuario: string, senha: string): Observable<any> {
    return this.http.post('http://localhost:3000/user/login', {
      userName: usuario,
      password: senha,
    });
  }

  logar(usuario: string, senha: string): void {
    if (usuario === 'usuario' && senha === '123') {
      console.log('Autenticado com sucesso');
      this.mostraSaldo.emit(true);
      this.route.navigate(['/home']);
      this.usuarioAutenticado = true;
      } else {
        alert('Usuario ou senha invalido');
        this.usuarioAutenticado = false;
        this.mostraSaldo.emit(false);
      }

    /*this.autenticar(usuario, senha).subscribe(
      () => {
        console.log('Autenticado com sucesso');
        this.mostraSaldo.emit(true);
        this.route.navigate(['/home']);
        this.usuarioAutenticado = true;
      },
      (error) => {
        alert('Usuario ou senha invalido');
        console.log(error);
        this.usuarioAutenticado = false;
        this.mostraSaldo.emit(false);
      }
    );*/
  }

  public usuarioEstaAutenticado(): boolean {
    return this.usuarioAutenticado;
  }
}
