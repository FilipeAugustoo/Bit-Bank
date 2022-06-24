import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { minusculoValidator } from './minusculo.validator';
import { Usuario } from './novo-usuario';
import { NovoUsuarioService } from './novo-usuario.service';
import { UsuarioExisteService } from './usuario-existe.service';
import { usuarioSenhaIguaisValidator } from './usuario-senha-igual.validator';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css'],
})
export class NovoUsuarioComponent implements OnInit {
  novoUsuarioForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private usuarioExistenteService: UsuarioExisteService
  ) {}

  public ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group(
      {
        usuario: [
          '',
          [Validators.required, minusculoValidator],
          [this.usuarioExistenteService.usuarioJaExiste()],
        ],
        senha: ['', [Validators.required]],
        saldo: [0]
      },
      {
        validators: [usuarioSenhaIguaisValidator],
      }
    );
  }

  public cadastrar(): void {
    if (this.novoUsuarioForm.valid) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as Usuario;
      this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
