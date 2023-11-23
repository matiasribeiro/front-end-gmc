import { LinhaChart } from '../../../@core/data/orders-chart';
import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { delay, takeWhile } from 'rxjs/operators';
import { Issue } from '../charts-panel/charts-service.ts.service';
import { IssueChart } from './chartjs.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { UtilsComponent } from '../utils/utils.component';
import { colorSets } from '@swimlane/ngx-charts';

@Component({
  selector: 'ngx-grafico-issue',
  template: `
    <chart  type="line" [data]="data" [options]="options"></chart>
  `,
  providers: [ UtilsComponent ]
})
export class GraficoIssueComponent implements OnDestroy {

  height: any;
  data: {};
  options: any;
  themeSubscription: any;

  private alive = true;
  option: any;

  @Input() issueChartData: IssueChart;

  listaIssue: Issue[] = [];

  listaRepositorio = [];


  ngOnInit() {

  }

  ngOnChanges(){

      this.ngAfterViewInit(this.issueChartData);
  }



  constructor(
    private theme: NbThemeService,
    private utilsComponent: UtilsComponent,
    ) {

  }

  ngAfterViewInit(issueData): void {

    this.theme.getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1),
      )
      .subscribe(config => {

       // const eTheme: any = config.variables.orders;
      this.getAtualizacaoIssue(issueData);

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;


      var i: Number;
      this.data = {
        labels: this.getArrayMeses(),
        datasets: this.getDadoGrafico(colors, this.listaIssue, this.listaRepositorio),
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        hover: {
          mode: 'index',
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Meses',
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Quantidade de Atividades',
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });

   });

  }

  getMontarArrayValor(nome: string, lista: Issue[]){

    let result = [];
    let nomeMeses = this.getArrayMeses();
    for (let i = 0; i < nomeMeses.length; i++) { // for para iterar os meses

      let verificarValorPresente = false;
      let valor = 0;
        for(let j = 0; j < lista.length; j++){

          if(lista[j].mesFechamento === nomeMeses[i] && lista[j].nomeRepositorio === nome){
            valor = lista[j].quantidade;
            verificarValorPresente = true;
          }
        }

        if(verificarValorPresente){
          result.push(valor);
          verificarValorPresente = false;
        } else {
          result.push(0);
        }

    }
    return result;
  }

  getCores(colors) {

    let arrayCores = [colors.primaryLight, colors.successLight, colors.warningLight,
      colors.dangerLight,colors.primary,colors.success,colors.info,colors.warning]

    let valor = Math.random() * (8 - 1) + 1;
    return arrayCores[Math.trunc(valor)];
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  getDadoGrafico(colors: any, lista: Issue[], listaRepositorios: any){

     let results = [];
     let cor: any;
     for (let i = 0; i < listaRepositorios.length; i++) {

      cor = this.getCores(colors)

      results.push( {
      label: listaRepositorios[i],
      data: this.getMontarArrayValor(listaRepositorios[i], lista),
      borderColor: cor,
      backgroundColor: cor,
      fill: false,
      //borderDash: [this.getRandomArbitrary(10,20), this.getRandomArbitrary(10,20)],
      pointRadius: 6,
      pointHoverRadius: 6,

      },
      )

     }

     return results;
  }


  // updateOrdersChartOptions(issueChart: IssueChart) {

  //   const options = this.option;
  //   // const series = this.getNewSeries(options.series, ordersChartData.linesData);
  //   // const xAxis = this.getNewXAxis(options.xAxis, ordersChartData.chartLabel);

  //   //this.linhaChartData = { label: this.listaMes, dados: this.listaQuantidade }




  //   const repositorios = this.getAtualizacaoIssue(issueChart);
  //   const series = this.getNewSeries(options.series, issueChart.lista, repositorios);

  //   const xAxis =this.getArrayMeses();

  //     this.option = {
  //       ...options,
  //       xAxis,
  //       series,
  //     };
  //   }


  //   getNewSeries(series, linesData: Issue[], repositorios) {


  //     return this.getDadoGrafico(colors, linesData, repositorios);

  //   }

    getNewXAxis(xAxis, chartLabel: IssueChart[]) {
      return {
        ...xAxis,
        data: chartLabel,
      };
    }

  getAtualizacaoIssue(obj: IssueChart){

    this.listaIssue = [];
    if(obj !== undefined){
      obj.lista.forEach(e => {
        this.listaIssue.push(e);
        if(!this.listaRepositorio.includes(e.nomeRepositorio)){
          this.listaRepositorio.push(e.nomeRepositorio);
        }
      });
    }
  }


  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  getArrayMeses(){
    return ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
  }



}
