import { HttpClient } from '@angular/common/http';
import { Despesas,Categoria } from '../util/lancamentos-despesas';
import { Injectable } from '@angular/core';

const API = 'https://desafio-it-server.herokuapp.com';

@Injectable({ providedIn: 'root'})
export class LancamentoService {

    constructor(private http: HttpClient) {}

    /**
     * Lista os lancamentos de cartão presente no sistema
     */
    getLancamentos(){
        return this.http.get<Despesas[]>(API + '/lancamentos');
    }

    /**
    * Lista as categorias de lançamento presentes no sistema
    */
    getCategory(){
        return this.http.get<Categoria[]>(API + '/categorias');
    }

}