import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


const API_ENDPOINT = 'http://localhost:8088';

export interface Issue{

  quantidade: number;
  mesFechamento: any;
  nomeRepositorio: string;

}

export interface Produtividade{

  quantidade: number;
  nomeDev: any;

}

export interface Status{

    commits: number,
    contribuintes: number,
    eventosIssue: number,
    issue: number,
    nomeRepositorio: string,
}

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(
    private httpClient: HttpClient
) { }

getQuantidadeEventosCommitsPorMesAno(ano: string){
  const params = new HttpParams().set('ano', ano);

  return this.httpClient.get<Issue[]>( API_ENDPOINT + '/issue/quantidade', {params});
}

getStatus(){
  return this.httpClient.get<Status[]>( API_ENDPOINT + '/status')
}

}
