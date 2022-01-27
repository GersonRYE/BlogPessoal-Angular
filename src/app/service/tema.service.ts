import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TemaModel } from '../model/TemaModel';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTema(): Observable<TemaModel[]>{
    return this.http.get<TemaModel[]>('https://bloggrye.herokuapp.com/temas', this.token)
  }

  postTema(temas: TemaModel): Observable<TemaModel>{
    return this.http.post<TemaModel>('https://bloggrye.herokuapp.com/temas', temas, this.token)
  }
}

/**Link heroku para conexão banco de dados(backend) remoto
 * https://bloggrye.herokuapp.com/temas
 */

/**
 * Link heroku para conexão banco de dados (backend) local
 * http://localhost:8080/temas
 */
