import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

const API_ENDPOINT = 'http://localhost:8088';

export interface Issue{

  quantidade: number;
  mesFechamento: any;
  nomeRepositorio: string;

}

export interface Colaboradores{

    repositorio: string;
    loginGitHub: string,
    url: string;
    urlAvatar: string;
    quantidadeAlteracaoEnviadas: number;
}

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {

  constructor(
    private httpClient: HttpClient
) { }

getTodosCalaboradores(){
  return this.httpClient.get<Colaboradores[]>( API_ENDPOINT + '/colaboradores')
}

}
