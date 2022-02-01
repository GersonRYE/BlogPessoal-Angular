import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/model/UsuarioModel';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuarioModel: UsuarioModel = new UsuarioModel()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)

  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  atualizar(){
    this.usuarioModel.tipo = this.tipoUsuario;
    if (this.usuarioModel.senha != this.confirmarSenha) {
      alert('As senhas estão incorretas');
    } else {
      this.authService
        .atualizar(this.usuarioModel)
        .subscribe((resp: UsuarioModel) => {
          this.usuarioModel = resp
          alert('Usuário atualizado com sucesso!')
          environment.token = ''
          environment.nome = ''
          environment.foto = ''
          environment.id = 0
          environment.tipo = ''
          this.router.navigate(['/entrar'])
        }) // tranforma o objeto typeScript em JSon para o servidor entender a requisição
    }
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: UsuarioModel) => {
      this.usuarioModel = resp
    })
  }
}
