import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { LancamentoService } from './services/lancamento.service';
import { Despesas, compareMonths } from './util/lancamentos-despesas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  subs: Subscription;
  itemsDespesas: Despesas[] = [];

  constructor(
    private lancamentoService: LancamentoService) {
  } 

  ngOnInit(): void {
  
    this.subs = this.lancamentoService
      .getLancamentos()
      .subscribe(despesas => {
        this.itemsDespesas = despesas;
        this.itemsDespesas.sort(compareMonths);
      },
      (error:HttpErrorResponse) => {
        console.log(error.message)
      })
    }
}

