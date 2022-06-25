import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment.prod';
import { Usuario } from './novo-usuario';

@Injectable({
  providedIn: 'root',
})
export class NovoUsuarioService {
  constructor(private httpClient: HttpClient) {}

  public cadastraNovoUsuario(novoUsuario: Usuario) {
    return this.httpClient.post(
      `${environment.apiURL}/usuario`,
      novoUsuario
    );
  }

  public verificaUsuarioExistente(nomeUsuario: string) {
    return this.httpClient.get(
      `${environment.apiURL}/usuario/existe/${nomeUsuario}`
    );
  }
}
