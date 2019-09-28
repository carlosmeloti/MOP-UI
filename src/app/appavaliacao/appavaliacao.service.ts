import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';



export class  AppAvaliacaoFiltro {
  
  cdMonitoramento: number;
  nmMonitoramento:string;
  
  
 
}


@Injectable()
export class AppavaliacaoService {

  appavaliacaoURL = "http://localhost:8081/appavaliacao";


  constructor(private http: Http) { }


  pesquisarMon(filtro: AppAvaliacaoFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    if (filtro.nmMonitoramento) {
      params.set('cdMonitoramento', filtro.nmMonitoramento);
    }

    return this.http.get(`${this.appavaliacaoURL}`, { headers, search: filtro })
      .toPromise()
      .then(response => response.json().content)

  };
}
