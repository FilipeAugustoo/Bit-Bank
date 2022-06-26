import { Component } from '@angular/core';
import { UsuarioService } from './components/cadastro/login/Usuario.service';
import { SaldoService } from './components/home/home/saldo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private service: SaldoService,
    private usuarioService: UsuarioService
  ) {}

  public mostraParametros: boolean = false;
  public saldo;
  public usuario;



  ngOnInit() {
    this.usuarioService.mostraParametros.subscribe(mostrar => this.mostraParametros = mostrar);

    this.service.saldo.subscribe(saldo => this.saldo = saldo);
    this.usuarioService.retornaUsuario().subscribe(user => this.usuario = user['sub']);
  }

  public logout() {
    this.usuarioService.logout();
  }


}
