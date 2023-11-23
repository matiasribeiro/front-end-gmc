import { CommitAutor, MetricsService } from './../../../@core/utils/metrics.service';
import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile, map } from 'rxjs/operators';

import { UserActivityData, UserActive } from '../../../@core/data/user-activity';
import * as moment from 'moment';
import { AotCompiler } from '@angular/compiler';
import { formatDate } from '@angular/common';
import { UtilsComponent } from '../utils/utils.component';
import { Issue } from '../charts-panel/charts-service.ts.service';

@Component({
  selector: 'ngx-user-activity',
  styleUrls: ['./user-activity.component.scss'],
  templateUrl: './user-activity.component.html',
  providers: [ UtilsComponent ]
})
export class ECommerceUserActivityComponent implements OnDestroy {

  private alive = true;

  userActivity: UserActive[] = [];
  commitsAutor: CommitAutor[] = [];

  listaMes;
  listaAno;
  listaMesAno;

  listaIssue: Issue[] = [];


  type = 'Mês-Ano';
  types = ['Mês-Ano','Mês', 'Ano'];
  currentTheme: string;

  constructor(private themeService: NbThemeService,
              private userActivityService: UserActivityData,
              private metricsService: MetricsService,
              private util: UtilsComponent) {

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });

   // this.getUserActivity(this.type);

   this.getTodosCommitsMesAno();

  }

  getUserActivity(period: string) {
    this.userActivityService.getUserActivityData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(userActivityData => {
        this.userActivity = userActivityData;

      });
  }

    // MES e ANO
    getTodosCommitsMesAno(){
      this.metricsService.getQuantidadeCommitsPorMesAno()
      .subscribe(dados => {

        this.commitsAutor = dados;
        this.commitsAutor = this.util.getConverterParaNomeMesAno(this.commitsAutor);
        // let mesAno: string[] = [];

        // dados.forEach(e => {
        //   mesAno.push(e.mesAno);
        // });

        // this.listaMesAno = new Set(mesAno.sort());

      });

    }

  // ANO
  getTodosCommitsAno(evento: string){
    this.metricsService.getQuantidadeCommitsPorAno()
    .subscribe(dados => {

      this.commitsAutor = dados;
      let ano: string[] = [];

      dados.forEach(e => {
        ano.push(e.ano);
      });

      this.listaAno = new Set(ano.sort());

    });

  }

  // MES
  getTodosCommitsMes(evento: string){
    this.metricsService.getQuantidadeCommitsPorMes()
    .subscribe(dados => {

      this.commitsAutor = dados;
      this.commitsAutor = this.util.getConverterParaNomeMes(this.commitsAutor);
      // let mes: string[] = [];

      // dados.forEach(e => {
      //   mes.push(e.mes);
      // });

      // this.listaMes = new Set(mes.sort());
      // this.listaMes = this.util.getNomeMes(this.listaMes);


    })
  }

  getSelectPeriodo(evento: string){
    if(evento == 'Mês'){
      this.getTodosCommitsMes(evento);
    } else if (evento == 'Ano') {
      this.getTodosCommitsAno(evento);
    } else {
      this.getTodosCommitsMesAno();
    }

  }

  ngOnDestroy() {
    this.alive = false;
  }
}
