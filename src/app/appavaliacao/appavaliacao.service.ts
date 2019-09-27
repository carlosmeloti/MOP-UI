import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';



export class AppAvaliacaoFiltro {
  nmAvaliacao: string;
  nmMonitoramento: string
  page = 0;
  size = 5;
}


@Injectable()
export class AppavaliacaoService {

  appavaliacaoURL = "http://10.132.90.58:8081/appavaliacao";


  constructor(private http: Http) { }


  pesquisarMon(filtro: AppAvaliacaoFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    if (filtro.nmMonitoramento) {
      params.set('nmMonitoramento', filtro.nmMonitoramento);
    }

    return this.http.get(`${this.appavaliacaoURL}`, { headers, search: filtro })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const appmonitoramento = responseJson.content;

        const resultado = {
          appmonitoramento,
          total: responseJson.totalElements
        };
        return resultado;
      })

  };
}
