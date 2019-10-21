import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Modverificadoresdomodelo} from '../core/model';

export class ModverificadoresdomodeloFiltro{

  cdTemplate: number;
  nmVerificador:string;
  page = 0;
  size = 5;

}

@Injectable()
export class ModverificadoresdomodeloService {

  verificadoresModeloUrl = "http://localhost:8081/modverificadoresmonitoramentotemplate";

  constructor(private http: Http) { }

  pesquisarMon(filtro: ModverificadoresdomodeloFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    if (filtro.nmVerificador) {
      params.set('cdTemplate', filtro.nmVerificador);
    }

    return this.http.get(`${this.verificadoresModeloUrl}`, { headers, search: filtro })
      .toPromise()
      .then(response => response.json().content)

  };

  pesquisar(filtro: ModverificadoresdomodeloFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;

    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    if (filtro.nmVerificador){
      params.set('cdTemplate', filtro.nmVerificador);

  }

    return this.http.get(`${this.verificadoresModeloUrl}`, {  headers, search: filtro })
    .toPromise()
      .then(response => {

          const responseJson = response.json();
          const verificadoresModelo = responseJson.content;

          const resultado = {
            verificadoresModelo,
            total: responseJson.totalElements
          };
          return resultado;
    })

    };

}
