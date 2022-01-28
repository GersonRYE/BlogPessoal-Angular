import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { UsuarioModel } from '../model/UsuarioModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token),
    };
  }

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(
      'https://bloggrye.herokuapp.com/usuarios/logar',
      usuarioLogin
    );
  }

  cadastrar(usuarioModel: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(
      'https://bloggrye.herokuapp.com/usuarios/cadastrar',
      usuarioModel
    );
  }

  getByIdUser(id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(
      `https://bloggrye.herokuapp.com/usuarios/${id}`,
      this.token
    );
  }

  logado() {
    let ok: boolean = false;
    if (environment.token != '') {
      ok = true;
    }
    return ok;
  }
}

/* links para se conectar com o backend remoto
https://bloggrye.herokuapp.com/usuarios/logar
https://bloggrye.herokuapp.com/usuarios/cadastrar
*/

/**
 * links para se conectar com o backend local
 * http://localhost:8080/usuarios/logar
 * http://localhost:8080/usuarios/cadastrar
 */
