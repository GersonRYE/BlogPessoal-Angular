import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.prod';
import { PostagemModel } from '../model/PostagemModel';
import { TemaModel } from '../model/TemaModel';
import { UsuarioModel } from '../model/UsuarioModel';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  listaPostagens: PostagemModel[];
  postagem: PostagemModel = new PostagemModel();
  tituloPost: string;

  tema: TemaModel = new TemaModel();
  listaTemas: TemaModel[];
  idTema: number;
  descricaoTema: string

  user: UsuarioModel = new UsuarioModel();
  idUser = environment.id;

  key = 'data';
  reverse = true;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      alert('Sua seção expirou, faça o login novamente!');
      this.router.navigate(['/entrar']);
    }

    this.getAllTemas();
    this.getAllPostagens();
    this.authService.refreshToken();
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: TemaModel[]) => {
      this.listaTemas = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: TemaModel) => {
      this.tema = resp;
    });
  }

  getAllPostagens() {
    this.postagemService
      .getAllPostagens()
      .subscribe((resp: PostagemModel[]) => {
        this.listaPostagens = resp;
      });
  }

  findByIdUser() {
    this.authService
      .getByIdUser(this.idUser)
      .subscribe((resp: UsuarioModel) => {
        this.user = resp;
      });
  }

  publicar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.user.id = this.idUser;
    this.postagem.usuario = this.user;

    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((resp: PostagemModel) => {
        this.postagem = resp;
        this.alertas.showAlertSuccess('Postagem realizada com sucesso');
        this.postagem = new PostagemModel();
        this.getAllPostagens();
      });
  }

  findByTituloPostagem() {
    if (this.tituloPost == '') {
      this.getAllPostagens();
    } else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: PostagemModel[]) => {
          this.listaPostagens = resp;
        });
    }
  }

  findByDescricaoTema(){
    if(this.descricaoTema == ''){
      this.getAllTemas()
    }else{
      this.temaService.getByDescricaoTema(this.descricaoTema).subscribe((resp: TemaModel[]) => {
        this.listaTemas = resp
      })
    }

  }
}
