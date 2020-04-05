import { Component, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { Despesas, Categoria } from '../util/lancamentos-despesas';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})

/** LancamentosComponent
 *  Componente para exibir todos os lançamentos de cada mês.
 */
export class LancamentosComponent implements OnDestroy, OnChanges {

  @Input() data: Despesas[] = [];
 
  itemsDespesas: Despesas[] = [];
  categoryValues: Categoria[] = [];
  subs: Subscription;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.itemsDespesas = this.data;
    }
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe();
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
}
