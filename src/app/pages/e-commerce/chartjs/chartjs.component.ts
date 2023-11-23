import { GraficoIssueComponent } from './graficoIssue.component';

import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ChartsService, Issue } from '../charts-panel/charts-service.ts.service';
import { UtilsComponent } from '../utils/utils.component';


export interface IssueChart {
  lista: Issue[];
}


@Component({
  selector: 'ngx-chartjs',
  styleUrls: ['./chartjs.component.scss'],
  templateUrl: './chartjs.component.html',
  providers: [UtilsComponent]
})
export class ChartjsComponent {

  private alive = true;
  issueChartData: IssueChart;
  issueData: Issue[] = [];

  anos: string[] = ['2017','2018','2019','2020','2021','2022','2023']

  ano = '2021';

  @Input() anoSelecionado: string;
  @Output() periodChange = new EventEmitter<string>();

  @ViewChild('issue', { static: true }) issue: GraficoIssueComponent;


  ngOnInit() {
  }

  constructor(
    private chartsService: ChartsService,
    private utilsComponent: UtilsComponent) {

    this.anoSelecionado = (this.getDataAtual() -1).toString(); // ano 2021 para testes
    this.getDados(this.anoSelecionado);
  }



  mudarPeriodo(periodo: string): void {
    if(periodo != undefined && periodo != null){
      this.getDados(periodo);
    }
  }

  getDados(ano: string) {

    this.issueData = [];
    this.chartsService.getQuantidadeEventosCommitsPorMesAno(ano)
      .pipe(map( matriz => {

        for(const i in matriz){
          for (const j in matriz[i]) {
            this.issueData.push(matriz[i][j]);
          }
        }

        this.issueData = this.utilsComponent.getConverterIssueMesDigitoParaNome(this.issueData);
        this.issueChartData = { lista: this.issueData }

      })).subscribe(d => {});

 }

 getDataAtual(){
  const date = new Date();
  const ano = date.getFullYear();
  return ano;
}

 ngOnDestroy() {
  this.alive = false;
}


}
