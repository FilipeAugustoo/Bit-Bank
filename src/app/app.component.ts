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
    private authService: UsuarioService
  ) {}

  public mostrarSaldo: boolean = false;
  public saldo;



  ngOnInit() {
    this.authService.mostraSaldo.subscribe(mostrar => this.mostrarSaldo = mostrar);

    this.service.saldo.subscribe(saldo => this.saldo = saldo);
  }
}
