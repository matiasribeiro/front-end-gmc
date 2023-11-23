import { Component, OnInit } from '@angular/core';
import { CommitAutor } from '../../../@core/utils/metrics.service';
import { Issue } from '../charts-panel/charts-service.ts.service';

@Component({
  selector: 'ngx-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss']
})
export class UtilsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  getConverterIssueMesDigitoParaNome(issue: Issue[] = []){


    for (const i of issue) {
      switch(i.mesFechamento){

        case (1):
          i.mesFechamento = "Janeiro";
          break;
        case (2):
          i.mesFechamento = "Fevereiro";
          break;
        case (3):
          i.mesFechamento = "Março";
          break;
        case (4):
          i.mesFechamento = "Abril";
          break;
        case (5):
          i.mesFechamento = "Maio";
          break;
        case (6):
          i.mesFechamento = "Junho";
          break;
        case (7):
          i.mesFechamento = "Julho";
          break;
        case (8):
          i.mesFechamento = "Agosto";
          break;
        case (9):
          i.mesFechamento = "Setembro";
          break;
        case (10):
          i.mesFechamento = "Outubro";
          break;
        case (11):
          i.mesFechamento = "Novembro";
          break;
        case (12):
          i.mesFechamento = "Dezembro";
          break;
        default:
          break;
      }
    }
      return issue;
  }

  getConverterParaNomeMes(lista: CommitAutor[] = []){

    for (const m of lista) {
      switch(m.mes){

        case ("01"):
          m.mes = "Janeiro";
          break;
        case ("02"):
          m.mes = "Fevereiro";
          break;
        case ("03"):
          m.mes = "Março";
          break;
        case ("04"):
          m.mes = "Abril";
          break;
        case ("05"):
          m.mes = "Maio";
          break;
        case ("06"):
          m.mes = "Junho";
          break;
        case ("07"):
          m.mes = "Julho";
          break;
        case ("08"):
          m.mes = "Agosto";
          break;
        case ("09"):
          m.mes = "Setembro";
          break;
        case ("10"):
          m.mes = "Outubro";
          break;
        case ("11"):
          m.mes = "Novembro";
          break;
        case ("12"):
          m.mes = "Dezembro";
          break;
        default:
          break;
      }
    }
      return lista;
  }

  getConverterParaNomeMesAno(lista: CommitAutor[] = []){

    for (const m of lista) {

      let mesano = m.mesAno.substring(5,7);
      switch(mesano){

        case ("01"):
          m.mesAno = "Janeiro-"+m.mesAno.substring(0,4);
          break;
        case ("02"):
          m.mesAno = "Fevereiro-"+m.mesAno.substring(0,4);
          break;
        case ("03"):
          m.mesAno = "Março-"+m.mesAno.substring(0,4);
          break;
        case ("04"):
          m.mesAno = "Abril-"+m.mesAno.substring(0,4);
          break;
        case ("05"):
          m.mesAno = "Maio-"+m.mesAno.substring(0,4);
          break;
        case ("06"):
          m.mesAno = "Junho-"+m.mesAno.substring(0,4);
          break;
        case ("07"):
          m.mesAno = "Julho-"+m.mesAno.substring(0,4);
          break;
        case ("08"):
          m.mesAno = "Agosto-"+m.mesAno.substring(0,4);
          break;
        case ("09"):
          m.mesAno = "Setembro-"+m.mesAno.substring(0,4);
          break;
        case ("10"):
          m.mesAno = "Outubro-"+m.mesAno.substring(0,4);
          break;
        case ("11"):
          m.mesAno = "Novembro-"+m.mesAno.substring(0,4);
          break;
        case ("12"):
          m.mesAno = "Dezembro-"+m.mesAno.substring(0,4);
          break;
        default:
          break;
      }
    }
      return lista;
  }


  getNomeMes(meses: string[]){

    let result: string[] = [];

    for (const m of meses) {
      switch(m){

        case ("01"):
          result.push("Janeiro");
          break;
        case ("02"):
          result.push("Fevereiro");
          break;
        case ("03"):
          result.push("Março");
          break;
        case ("04"):
          result.push("Abril");
          break;
        case ("05"):
          result.push("Maio");
          break;
        case ("06"):
          result.push("Junho");
          break;
        case ("07"):
          result.push("Julho");
          break;
        case ("08"):
          result.push("Agosto");
          break;
        case ("09"):
          result.push("Setembro");
          break;
        case ("10"):
          result.push("Outubro");
          break;
        case ("11"):
          result.push("Novembro");
          break;
        case ("12"):
          result.push("Dezembro");
          break;
        default:
          break;
      }
    }
      return result;
  }


}
