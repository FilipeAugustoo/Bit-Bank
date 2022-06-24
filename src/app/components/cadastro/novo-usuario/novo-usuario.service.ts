import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './novo-usuario';

@Injectable({
  providedIn: 'root',
})
export class NovoUsuarioService {
  constructor(private httpClient: HttpClient) {}

  public cadastraNovoUsuario(novoUsuario: Usuario) {
    return this.httpClient.post(
      `http://localhost:8080/usuario`,
      novoUsuario
    );
  }

  public verificaUsuarioExistente(nomeUsuario: string) {
    return this.httpClient.get(
      `http://localhost:8080/usuario/existe/${nomeUsuario}`
    );
  }
}
