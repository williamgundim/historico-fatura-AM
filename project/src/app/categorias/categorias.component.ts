import { Component, OnDestroy, SimpleChanges, Input, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Despesas, TotalCategoria, Categoria } from '../util/lancamentos-despesas';
import { LancamentoService } from '../services/lancamento.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})

/** CategoriasComponent
 *  Componente para exibir os valores consolidados de cada categoria
 */
export class CategoriasComponent implements OnDestroy, OnChanges, OnInit {

  @Input() data: Despesas[] = [];

  itemsDespesas: Despesas[] = [];
  totalMonths: Array<TotalCategoria> = [];
  categoryValues: Categoria[] = [];
  subs: Subscription;

  constructor(
    private lancamentoService: LancamentoService) {
  } 

  ngOnInit(): void {

    this.subs = this.lancamentoService
    .getCategory()
    .subscribe(categorias => {
      this.categoryValues = categorias;
    },
    (error:HttpErrorResponse) => {
      console.log(error.message)
    })

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.itemsDespesas = this.data;
      this.itemsDespesas.map((x) => {
        this.SumValues(x)
      })
    }
  }

  ngOnDestroy(): void {
    //tratamento para vazamento de memória.
    if(this.subs){
      this.subs.unsubscribe();
    }
  }

  /** SumValues
   *  função para consolidar os valores por mês
   * @param item Despesas 
   */
  SumValues(item:Despesas){

    let nPosition: number = 0;

    nPosition = this.totalMonths.findIndex( x => x.categoria === item.categoria)

    if (nPosition >= 0){
      this.totalMonths[nPosition].valor += item.valor;
    }else
    {
      this.totalMonths.push({
        categoria: item.categoria,
        valor:item.valor
      })
    }
  }

  /** formatValue
  * Função para formatar o valor para exibição
  * @param nValue
  * @return exemplo: R$ 102,00 
  */
  formatValue(nValue:number){
    return nValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }

  /** getDescriptionCategory
   * função para retornar a descrição da categoria. Ex.: 'Transporte'
   * @param category id da categoria
   * @return description
   */
  getDescriptionCategory(category:number){
    let description:string = 'Não informada';
    let nPos:number = this.categoryValues.findIndex( x => category === x.id);

    if (nPos >= 0){
      description = this.categoryValues[nPos].nome; 
    } 
    return description
  }

}
