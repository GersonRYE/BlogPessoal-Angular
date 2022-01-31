import { PostagemModel } from './PostagemModel';

export class TemaModel {
  public id: number;
  public descricao: String;
  public postagem: PostagemModel[];
}
