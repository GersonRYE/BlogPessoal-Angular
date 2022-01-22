import { PostagemModel } from "./PostagemModel";

export class TemaModel {
    public id: string;
    public descricao: string;
    public postagem: PostagemModel[]
}