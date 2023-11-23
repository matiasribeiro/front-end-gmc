import { Colaboradores, ColaboradoresService } from './colaboradores-service';
import { Component, Input, OnInit } from '@angular/core';
import { NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { share, takeWhile } from 'rxjs/operators';

interface TreeNode<T> {
  data?: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}


@Component({
  selector: 'ngx-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss']
})
export class ColaboradoresComponent implements OnInit {


  colaboradores: Colaboradores[] = [];

  // customColumn = 'repositorio';
  // defaultColumns = [ 'loginGitHub','quantidadeAlteracaoEnviadas','url','urlAvatar' ];
  // allColumns = [ this.customColumn, ...this.defaultColumns ];

  customColumn = 'name';
  allColumns = ['name','loginGitHub','quantidadeAlteracaoEnviadas','url' ];

  data: any[] = [];



  dataParaTeste: TreeNode<FSEntry>[] = [];

  mapColaboradores: any[] = [];

  private alive = true;


  constructor(
    private colaboradoresService: ColaboradoresService
  ) {

  }

  ngOnInit(): void {

    this.getDadosColaboradores()
  }



  getDadosColaboradores(){

    this.data = [];
    this.colaboradoresService.getTodosCalaboradores()
    .subscribe((dados) => {

      let dadosTemp = [];

      dados.map(function(item: Colaboradores, index){


        var verificardor = true;

        if(dadosTemp.length == 0){
          dadosTemp.push(
            {
              data: {
                      name: item.repositorio,
                    },
              children: [
                { data: {
                  name: item.repositorio,
                  loginGitHub: item.loginGitHub,
                  quantidadeAlteracaoEnviadas: item.quantidadeAlteracaoEnviadas,
                  url: item.url,
                  urlAvatar: item.urlAvatar } },
              ],
            }
          )
        } else {


          dadosTemp.forEach(function(i, indice){

            if(i.data.name === item.repositorio){
              verificardor = false;
              dadosTemp[indice].children.push( { data: {
                name:item.repositorio,
                loginGitHub: item.loginGitHub,
                quantidadeAlteracaoEnviadas: item.quantidadeAlteracaoEnviadas,
                url: item.url,
                urlAvatar: item.urlAvatar } });
          }
        })

          if(verificardor){

            dadosTemp.push(
              {
                data: {
                        name:item.repositorio,
                      },
                children: [
                  { data: {
                    name:item.repositorio,
                    loginGitHub: item.loginGitHub,
                    quantidadeAlteracaoEnviadas: item.quantidadeAlteracaoEnviadas,
                    url: item.url,
                    urlAvatar: item.urlAvatar } },
                ],
              })
          }


      }




          //se testar todos em não encontrar ai sim cria outro obj



        // if(dadosTemp.length == 0){

        //   console.log('-------1 vez---------')

        //   dadosTemp.push(
        //     {
        //       data: {
        //               name: item.repositorio,
        //             },
        //       children: [
        //         { data: {
        //           name: item.repositorio,
        //           loginGitHub: item.loginGitHub,
        //           quantidadeAlteracaoEnviadas: item.quantidadeAlteracaoEnviadas,
        //           url: item.url,
        //           urlAvatar: item.urlAvatar } },
        //       ],
        //     }
        //   )
        // } else {


        //   //this.data = dadosTemp.filter(obj => obj.data.name === item.repositorio);


        //   dadosTemp.filter( i => {


        //       console.log('------------teste 1 ----------' + i.data.name)
        //       console.log('------------teste 2 ----------' + item.repositorio)

        //     if(i.data.name === item.repositorio){

        //       console.log('----------xxxxxxxxxxxxxxxxxxxxxxx---------' + dadosTemp.indexOf(i))
        //       //pegar o mesmo obj para incluir os dados

        //       var repo = dadosTemp.indexOf(i);

        //       dadosTemp[repo].children.push( { data: {
        //         name:item.repositorio,
        //         loginGitHub: item.loginGitHub,
        //         quantidadeAlteracaoEnviadas: item.quantidadeAlteracaoEnviadas,
        //         url: item.url,
        //         urlAvatar: item.urlAvatar } });

        //     } else {

        //       console.log('-----------------------------------------------' + dadosTemp.indexOf(i))

        //       dadosTemp.push(
        //         {
        //           data: {
        //                   name:item.repositorio,
        //                 },
        //           children: [
        //             { data: {
        //               name:item.repositorio,
        //               loginGitHub: item.loginGitHub,
        //               quantidadeAlteracaoEnviadas: item.quantidadeAlteracaoEnviadas,
        //               url: item.url,
        //               urlAvatar: item.urlAvatar } },
        //           ],
        //         }
        //       )
        //     }

        //   })
        // }
        }



       )
       this.data = dadosTemp;

       // console.log(dadosTemp)
    });

  }



}


// @Component({
//   selector: 'ngx-fs-icon',
//   template: `
//     <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir();">
//     </nb-tree-grid-row-toggle>

//   `,
// })
// export class FsIconComponent {
//   @Input() kind: string;
//   @Input() expanded: boolean;

//   isDir(): boolean {
//     return this.kind === 'dir';
//   }
// }

