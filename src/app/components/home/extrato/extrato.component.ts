import { Component, Input } from '@angular/core';
import { UsuarioService } from './../../cadastro/login/Usuario.service';
import { Extrato } from './extrato.model';
import { ExtratoService } from './extrato.service';


@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css'],
})
export class ExtratoComponent {
  constructor(private service: ExtratoService, private usuarioService:UsuarioService) {
    this.service.extrato(this.usuarioService.usuario()).subscribe(r => console.log(r));
  }
  @Input() dados: Extrato[];

}
