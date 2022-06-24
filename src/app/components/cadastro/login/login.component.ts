import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from './Usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public usuario = '';
  public senha = '';



  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: UsuarioService,
    private route: Router
  ) {}

  public ngOnInit(): void {}

  public logar(): void {
    this.authService.logar(this.usuario, this.senha);
  }
}
