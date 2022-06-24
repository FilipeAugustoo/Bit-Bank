import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/cadastro/login/login.component';
import { NovoUsuarioComponent } from './components/cadastro/novo-usuario/novo-usuario.component';
import { AuthGuard } from './components/guards/auth.guard';
import { DepositoComponent } from './components/home/deposito/deposito.component';
import { ExtratoComponent } from './components/home/extrato/extrato.component';
import { HomeComponent } from './components/home/home/home.component';
import { PixComponent } from './components/home/pix/pix.component';
import { RecargaCelularComponent } from './components/home/recarga-celular/recarga-celular.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'novousuario',
    component: NovoUsuarioComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home/pix',
    component: PixComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home/recarga-celular',
    component: RecargaCelularComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home/deposito',
    component: DepositoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home/extrato',
    component: ExtratoComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
