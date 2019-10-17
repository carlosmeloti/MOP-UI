import { Component, OnInit,ViewChild } from '@angular/core';
import { Modverificadoresdomodelo } from '../core/model';
import { SelectItem } from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../core/error-handler.service';
import { CadtipodeverificadorService } from '../cadtipodeverificador/cadtipodeverificador.service';
import { LazyLoadEvent } from 'src/primeng/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { FormControl } from '@angular/forms';
import { CadempresaService } from '../cadempresa/cadempresa.service';
import { ModmonitoramentotemplateService } from '../modmonitoramentotemplate/modmonitoramentotemplate.service';
import { ModverificadoresdomodeloFiltro, ModverificadoresdomodeloService } from './modverificadoresdomodelo.service';

@Component({
  selector: 'app-modverificadoresdomodelo',
  templateUrl: './modverificadoresdomodelo.component.html',
  styleUrls: ['./modverificadoresdomodelo.component.css']
})
export class ModverificadoresdomodeloComponent implements OnInit {

  tatalRegistros = 0;

  filtro = new ModverificadoresdomodeloFiltro();
  cdTemplate: number;
  nmVerificador:string;

  MonitoramentoTemplate = [];
  verificadordomodelo = [];
  empresas = [];

  selectedValues: string[] = ['Coleta de Dados Analíticos','Coleta de Dados Agrupados'];

  modverificadoresdomodeloSalvar = new Modverificadoresdomodelo;

  @ViewChild('tabela') grid;
  constructor(
    private tipoDeVerificadores: CadtipodeverificadorService,
    private modverificadoresdomodeloService: ModverificadoresdomodeloService,
    private cadEmpresaService: CadempresaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private modmonitoramentotemplateService: ModmonitoramentotemplateService,

  ) {}

  ngOnInit() {
    this.pesquisarMon();

    this.carregarMonitoramentoTemplate();
  }

  carregarMonitoramentoTemplate() {
    return this.modmonitoramentotemplateService.listarTodas()
      .then(modmonitoramento => {
        this.MonitoramentoTemplate = modmonitoramento.map(c => ({ label: c.cdTemplate + " - " + c.nmTemplate, value: c.cdTemplate }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  //Metodo para carregar valores
 // carregarModverificadoresdomodelo(codigo: number) {
  //  this.modverificadoresdomodeloService.buscarPorCodigo(codigo)
   //   .then(modnivel1 => {
    //    this.modNivel1Salvar = modnivel1;
   //   })
   //   .catch(erro => this.errorHandler.handle(erro));
 // }

  pesquisarMon() {

    const filtro: ModverificadoresdomodeloFiltro = {
      cdTemplate: this.cdTemplate,
      nmVerificador: this.nmVerificador
    }
    this.modverificadoresdomodeloService.pesquisarMon(filtro)
      .then(modverificadoresdomodelo => this.verificadordomodelo = modverificadoresdomodelo);
  }

  pesquisa() {

    const filtro: ModverificadoresdomodeloFiltro = {
      cdTemplate: this.cdTemplate,
      nmVerificador: this.nmVerificador
    }
    this.modverificadoresdomodeloService.pesquisar(filtro)
      .then(modverificadoresdomodelo => this.verificadordomodelo = modverificadoresdomodelo);
  }

}
