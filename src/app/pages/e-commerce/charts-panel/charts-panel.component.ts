import { LinhaChart } from './../../../@core/data/orders-chart';
import { UtilsComponent } from './../utils/utils.component';
import { MetricsService } from './../../../@core/utils/metrics.service';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { map, takeWhile } from 'rxjs/operators';

import { OrdersChartComponent } from './charts/orders-chart.component';
import { ProfitChartComponent } from './charts/profit-chart.component';
import { OrdersChart } from '../../../@core/data/orders-chart';
import { ProfitChart } from '../../../@core/data/profit-chart';
import { OrderProfitChartSummary, OrdersProfitChartData } from '../../../@core/data/orders-profit-chart';
import { ChartsService, Issue } from './charts-service.ts.service';

@Component({
  selector: 'ngx-ecommerce-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
  providers: [UtilsComponent]
})
export class ECommerceChartsPanelComponent implements OnDestroy {

  private alive = true;

  chartPanelSummary: OrderProfitChartSummary[];
  period: string = 'week';
  ordersChartData: OrdersChart;
  profitChartData: ProfitChart;

  linhaChartData: LinhaChart;


  issue: Issue[] = [];
  listaQuantidade = [];
  listaMes = [];
  listaNomeRepositorio = [];

  ano = '2021';

  @ViewChild('ordersChart', { static: true }) ordersChart: OrdersChartComponent;
  @ViewChild('profitChart', { static: true }) profitChart: ProfitChartComponent;

  @ViewChild('linhaChart', { static: true }) linhaChart: OrdersChartComponent;

  constructor(
      private ordersProfitChartService: OrdersProfitChartData,
      private metricsService: MetricsService,
      private chartsService: ChartsService,
      private utilsComponent: UtilsComponent) {

    this.ordersProfitChartService.getOrderProfitChartSummary()
      .pipe(takeWhile(() => this.alive))
      .subscribe((summary) => {
        this.chartPanelSummary = summary;
      });

    // this.getOrdersChartData(this.period);
    // this.getProfitChartData(this.period);
    this.getDados(this.ano);
  }

  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

  //  this.getOrdersChartData(value);
   // this.getProfitChartData(value);

    this.getDados(this.ano);

  }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'Profit') {
      this.profitChart.resizeChart();
    } else {
     // this.ordersChart.resizeChart();
      this.linhaChart.resizeChart();
    }
  }


  getDados(ano: string){

  this.chartsService.getQuantidadeEventosCommitsPorMesAno(ano)
    .pipe(map( matriz => {

      for(const i in matriz){
        for (const j in matriz[i]) {
          this.issue.push(matriz[i][j]);
        }
      }
      this.issue = this.utilsComponent.getConverterIssueMesDigitoParaNome(this.issue);



      // let arrayQuantidade = [];
      // this.issue.forEach(e => {
      //   this.listaMes.push(e.mesFechamento);
      //   arrayQuantidade.push(e.quantidade);
      //   this.listaNomeRepositorio.push(e.nomeRepositorio);
      // });

      //this.listaQuantidade = arrayQuantidade;


      //this.ordersChartData2.chartLabel = this.listaMes;
     // this.ordersChartData2.linesData = this.listaQuantidade;

      //console.log(this.ordersChartData)

     // this.linhaChartData = { label: this.listaMes, dados: this.listaQuantidade }

      //console.log(this.linhaChartData)
      //console.log([[arrayQuantidade]]);


    })).subscribe(d => {});
  }


  // getOrdersChartData(period: string) {


  //   this.ordersProfitChartService.getOrdersChartData(period)
  //     .pipe(takeWhile(() => this.alive))
  //     .subscribe(ordersChartData => {
  //       this.ordersChartData = ordersChartData;
  //       //console.log(this.ordersChartData)
  //     });
  // }

  // getProfitChartData(period: string) {
  //   this.ordersProfitChartService.getProfitChartData(period)
  //     .pipe(takeWhile(() => this.alive))
  //     .subscribe(profitChartData => {
  //       this.profitChartData = profitChartData;
  //     });
  // }

  ngOnDestroy() {
    this.alive = false;
  }
}
