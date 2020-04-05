/**
 * Interface para os lançamentos da API
 */
export interface Despesas {

    id: number;
    valor: number;
    origem: string;
    categoria: number;
    mes_lancamento: number;
        
}

/**
 * Interface para as categorias da API
 */
export interface Categoria {

    id: number;
    nome: string;

}


export interface TotalConsolidado {
    mes: number;
    valor: number;
}

export interface TotalCategoria {
    categoria: number;
    valor:number;
}

/** compareMonths
* função para ordenar as despesas por mês
* @param a Despesas
* @param b Despesas
*/
export function compareMonths(a: Despesas, b: Despesas){

 if (a.mes_lancamento === b.mes_lancamento)
   return 0;
 else if (a.mes_lancamento < b.mes_lancamento){
   return -1;
 }
 else
   return 1;

}

/**
 * MonthDescription
 */
export function MonthDescription(nMonth:number) {
    
    let description: string = '';

    switch (nMonth) {
        case 1:
            description = 'Janeiro';
            break;
        case 2:
            description = 'Fevereiro';
            break;
        case 3:
            description = 'Março';
            break;
        case 4:
            description = 'Abril';
            break;
        case 5:
            description = 'Maio';
            break;
        case 6:
            description = 'Junho';
            break;                                                        
        case 7:
            description = 'Julho';
            break;                                                        
        case 8:
            description = 'Agosto';
            break;                                                        
        case 9:
            description = 'Setembro';
            break;                                                        
        case 10:
            description = 'Outubro';
            break;                                                        
        case 11:
            description = 'Novembro';
            break;                                                        
        case 12:
            description = 'Dezembro';
            break;                                                                                        
        }

    return description;
}