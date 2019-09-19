import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-appavaliacao',
  templateUrl: './appavaliacao.component.html',
  styleUrls: ['./appavaliacao.component.css']
})
export class AppavaliacaoComponent  {

  cities1: SelectItem[];
  selectedCity1: City;

  constructor() {
    this.cities1 = [
      {label:'Modelo de Vistoria de PMFS', value:null},
      {label:'Modelo de Certificação Florestal', value:{id:1, name: 'New York', code: 'NY'}},
      {label:'Modelo de Monitoramento Operacional', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'Modelo de Avaliação de Sustentabilidade', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'Modelo de Avaliação de Impactos', value:{id:4, name: 'Istanbul', code: 'IST'}},
  ];
}

}
