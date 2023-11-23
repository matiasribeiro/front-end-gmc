import { Status } from './../charts-panel/charts-service.ts.service';
import { delay, map } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ChartsService } from '../charts-panel/charts-service.ts.service';

declare const echarts: any;

@Component({
  selector: 'ngx-caixa',
  styleUrls: ['./caixa.metricas.component.scss'],
  template: `

<div *ngFor="let s of listaStatus" [value]="status">
  <nb-card>
    <nb-card-header class="title h6 repositorio">
    <span class="titulo-repositorio">
      Nome do Repositório:
    </span>
      <span class="nome-repositorio">
        {{s.nomeRepositorio}}
      </span>
    </nb-card-header>

    <div class="row">
    <div class="col-md-3">
      <nb-card  >
        <nb-card-header>Commits  <div class="icones-v"> <i class="fas fa-sort-numeric-up-alt"></i></div></nb-card-header>
        <nb-card-body class="caixa-card" >
            <div class="h4 value commits">{{s.commits}}</div>

        </nb-card-body>
      </nb-card>
    </div>

    <div class="col-md-3">
      <nb-card>
        <nb-card-header>Colaboradores <div class="icones-a"> <i class="fas fa-user-check"></i></div></nb-card-header>
        <nb-card-body class="caixa-card" >
          <div class="h4 value pessoas">{{s.contribuintes}}</div>
        </nb-card-body>
      </nb-card>
    </div>

    <div class="col-md-3">
      <nb-card>
        <nb-card-header>Eventos Relacionados a Atividade<div class="icones-l"> <i class="fas fa-code"></i></div></nb-card-header>
        <nb-card-body class="caixa-card" >
          <div class="h4 value eventoissue">{{s.eventosIssue}}</div>
        </nb-card-body>
      </nb-card>
    </div>

    <div class="col-md-3">
      <nb-card>
        <nb-card-header>Atividades<div class="icones-m"> <i class="far fa-stop-circle"></i></div></nb-card-header>
        <nb-card-body class="caixa-card" >
          <div class="h4 value issue">{{s.issue}}</div>
        </nb-card-body>
      </nb-card>
    </div>

    </div>
  `,
})
export class CaixaMetricasComponent implements OnDestroy {

  private value = 0;

  listaStatus: Status[] = [];

  titulo = 'Commits';

  @Input('chartValue')
  set chartValue(value: number) {
    this.value = value;


  }


  constructor(private chartsService:ChartsService) {
  }

  ngOnInit() {
    this.getStatusMetricas();
  }


  getStatusMetricas(){

    this.chartsService.getStatus()
    .pipe(map( dados => {

      this.listaStatus = dados;

      //console.log(this.listaStatus)

    })).subscribe(d => {});

  }


  ngOnDestroy() {

  }
}
