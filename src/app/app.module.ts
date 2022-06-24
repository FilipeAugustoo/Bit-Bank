import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioService } from './components/cadastro/login/Usuario.service';
import { CadastroModule } from './components/cadastro/novo-usuario/cadastro.module';
import { AuthGuard } from './components/guards/auth.guard';
import { HomeModule } from './components/home/home/home.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    CadastroModule,
  ],
  providers: [UsuarioService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

