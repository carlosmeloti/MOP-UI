import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/primeng';
import { AppAvaliacao } from '../core/model';
import { AppmonitoramentoService } from '../appmonitoramento/appmonitoramento.service';
import { CadempresaService } from '../cadempresa/cadempresa.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../core/error-handler.service';
import { AppavaliacaoService, AppAvaliacaoFiltro } from './appavaliacao.service';


@Component({
  selector: 'app-appavaliacao',
  templateUrl: './appavaliacao.component.html',
  styleUrls: ['./appavaliacao.component.css']
})
export class AppavaliacaoComponent  {

  tatalRegistros = 0;
  filtro = new AppAvaliacaoFiltro();
  appmonitoramento = [];
  appavaliacao = [];
  empresas = [];

  appavaliacaoSalvar = new AppAvaliacao;

  @ViewChild('tabela') grid;
  constructor(
    private appmonitoramentoService: AppmonitoramentoService,
    private apavaliacaoService: AppavaliacaoService,
    private cadEmpresaService: CadempresaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {

    this.carregarAppMonitoramento();
    this.carregarEmpresas();
    // this.pesquisar();
    const codigoAppAvaliacao = this.route.snapshot.params['codigo'];
    //  se houver um id entra no metodo de carregar valores
    if (codigoAppAvaliacao) {
    //  this.carregarAppAvaliacao(codigoAppAvaliacao);
    }
  }

  get editando() {
    return Boolean(this.appavaliacaoSalvar.cdAvaliacao)
  }

  carregarEmpresas() {
    return this.cadEmpresaService.listarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => ({ label: c.cdEmpresa + " - " + c.nmEmpresa, value: c.cdEmpresa }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarAppMonitoramento() {
    return this.appmonitoramentoService.listarTodas()
      .then(appmonitoramento => {
        this.appmonitoramento = appmonitoramento.map(c => ({ label: c.cdMonitoramento + " - " + c.nmMonitoramento, value: c.cdMonitoramento }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarMon(page = 0) {

    this.filtro.page = page;
    this.apavaliacaoService.pesquisarMon(this.filtro)
      .then(avaliacao => this.appavaliacao = avaliacao);
  }


}
