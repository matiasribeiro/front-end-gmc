import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Projeto {
  id: number;
  nome: string;
  visibilidade: string;
}

export interface CommitAutor {

  nomeRepositorio: string,
  email: string,
  nome: string,
  mes: string,
  ano: string;
  mesAno: string;
  total: number
}




const API_ENDPOINT = 'http://localhost:8088';

@Injectable()
export class MetricsService {


  mes: Map<Object, Map<String, any>>;

  constructor(
    private httpClient: HttpClient
) { }

// buscar nome dos repositorios
getProjetos(){
  return this.httpClient.get<Projeto[]>( API_ENDPOINT + '/projetos');
}

// Buscar repositorio e commits por autor
getQuantidadeCommitsPorMes(){
  return this.httpClient.get<CommitAutor[]>( API_ENDPOINT + '/commits/mes');
}

getQuantidadeCommitsPorAno(){
  return this.httpClient.get<CommitAutor[]>( API_ENDPOINT + '/commits/ano');
}

getQuantidadeCommitsPorMesAno(){
  return this.httpClient.get<CommitAutor[]>( API_ENDPOINT + '/commits/mesAno');
}




}
