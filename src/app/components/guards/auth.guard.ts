import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../cadastro/login/Usuario.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private service: UsuarioService,
    private route: Router
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    if(this.service.estaLogado()) {
      this.service.mostraParametros.emit(true);
      return true;
    }

    this.service.mostraParametros.emit(false);
    this.route.navigate(['/login'])
    return false;

  }
}
