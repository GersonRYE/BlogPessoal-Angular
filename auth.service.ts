import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { UsuarioModel } from '../model/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
return this.http.post<UsuarioLogin>('http://localhost:8080/usuarios/logar', usuarioLogin)
  }

  cadastrar(usuarioModel: UsuarioModel): Observable<UsuarioModel>{
return this.http.post<UsuarioModel>('http://localhost:8080/usuarios/cadastrar', usuarioModel)
  }

  logado(){
    let ok: boolean = false
    if(environment.token != ""){
      ok = true
    }
    return ok
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