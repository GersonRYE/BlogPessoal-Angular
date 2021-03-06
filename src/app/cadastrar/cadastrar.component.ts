import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from '../model/UsuarioModel';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  usuarioModel: UsuarioModel = new UsuarioModel();
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    private authService: AuthService, // injeção de dependencia
    private router: Router
  ) {}

  ngOnInit() {
    window.scroll(0, 0); // quando minha pagina iniciar coloque no ponto  x e y = 0
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  cadastrar() {
    this.usuarioModel.tipo = this.tipoUsuario;
    if (this.usuarioModel.senha != this.confirmarSenha) {
      alert('As senhas estão incorretas');
    } else {
      this.authService
        .cadastrar(this.usuarioModel)
        .subscribe((resp: UsuarioModel) => {
          this.usuarioModel = resp
          this.router.navigate(['/entrar'])
          alert('Usuário cadastrado com sucesso!')
        }) // tranforma o objeto typeScript em JSon para o servidor entender a requisição
    }
  }
}
