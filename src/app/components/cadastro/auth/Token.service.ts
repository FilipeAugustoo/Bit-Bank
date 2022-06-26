import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public salvarToken(token: string): void {
    token = "Bearer " + token;
    localStorage.setItem(KEY, token);
  }

  public header(): HttpHeaders {
    const HEADER = new HttpHeaders({'Authorization': this.retornaToken()});
    return HEADER;
  }

  public retornaToken() {
    return localStorage.getItem(KEY) ?? '';
  }
  public excluiToken() {
    localStorage.removeItem(KEY);
  }

  public possuiToken() {
    return this.retornaToken();
  }

}
