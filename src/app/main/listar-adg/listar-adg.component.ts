import { Component, OnInit } from "@angular/core";
import { PersonaladgService } from "../../services/CAPACITACION/personaladg.service";
import { saveAs } from "file-saver";

import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

@Component({
  selector: "app-listar-adg",
  templateUrl: "./listar-adg.component.html",
  styleUrls: ["./listar-adg.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class ListarADGComponent implements OnInit {
  dataSource;
  columnsToDisplay = [
    "NombreCompletoPersonal",
    "curp",
    "rfc",
    "CCT",
    "NombrePuesto",
    "Acciones"
  ];

  pageData = {
    page: 0,
    totalRows: 0,
    totalPage: 0,
    paginacion: 20
  };

  FiltrosActivados = false;

  expandedElement: any | null;

  paginaSiguiente;
  paginaAnterior;

  layoutDeCarga;

  municipiolaboral;
  arealaboral;
  puestos;

  ///FILTROS
  seleccionar_arealaboral;
  seleccionar_municipiolaboral;
  seleccionar_puestos;
  input_CCT;
  input_nombreCCT;
  input_nombrePersonalADG;
  input_rfc;
  input_curp;
  seleccionar_sexo;
  input_tipo_de_sangre;
  seleccionar_estado_civil;

  /////

  busqueda = 0;

  filtrosActivo = false;

  constructor(private _PersonaladgServie: PersonaladgService) {
    this.listarPersonalADG();
  }

  ngOnInit() {}

  BorrarElFiltroEjecutado()
  {
    this.filtrosActivo = false;
    this.listarPersonalADG();
    this.limpiarFiltros();
  }

  limpiarFiltros()
  {
    this.seleccionar_arealaboral = null;
    this.seleccionar_municipiolaboral = null;
    this.seleccionar_puestos = null;
    this.input_CCT = null;
    this.input_nombreCCT = null;
    this.input_nombrePersonalADG = null;
    this.input_rfc = null;
    this.input_curp = null;
    this.seleccionar_sexo = null;
    this.input_tipo_de_sangre = null;
    this.seleccionar_estado_civil = null;
  }

  paginacion() {
    this.layoutDeCarga = true;
    const body = {
      busqueda: this.busqueda,
      paginacion: this.pageData.paginacion,
      municipio_id: this.seleccionar_municipiolaboral,
      arealaboral_id: this.seleccionar_arealaboral,
      id_puesto: this.seleccionar_puestos,
      CCT: this.input_CCT,
      nombreCCT: this.input_nombreCCT,
      nombrePersonalADG: this.input_nombrePersonalADG,
      rfc: this.input_rfc,
      curp: this.input_curp,
      sexo: this.seleccionar_sexo,
      tipo_de_sangre: this.input_tipo_de_sangre,
      estado_civil: this.seleccionar_estado_civil
    };

    this._PersonaladgServie
      .PaginacionListarPersonalADG(body, this.pageData.page)
      .subscribe(res => {
        this.dataSource = res.ListadoPersonalADG.data;
        this.pageData.page = res.pagination.current_page;
        this.pageData.totalRows = res.pagination.total;
        this.pageData.totalPage = res.pagination.last_page;
        this.paginaSiguiente = res.ListadoPersonalADG.next_page_url;
        this.paginaAnterior = res.ListadoPersonalADG.prev_page_url;
        this.layoutDeCarga = false;
      });
  }

  monstrarFiltros() {
    if (this.FiltrosActivados) {
      this.FiltrosActivados = false;
    } else {
      this.FiltrosActivados = true;
    }
  }

  DescargarReporteGeneral() {
    this.layoutDeCarga = true;

    var f = new Date();

    let nombredelReporte =
      "Reporte_General_" +
      f.getDate() +
      "_" +
      (f.getMonth() + 1) +
      "_" +
      f.getFullYear();

    let nombredelDescarga = nombredelReporte + ".xlsx";

    const body = {
      NombreReporte: nombredelReporte,
      busqueda: 0
    };
    this._PersonaladgServie.ExportarExcelPersonalADG(body).subscribe(res => {
      saveAs(res, nombredelDescarga, {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      this.layoutDeCarga = false;
    });
  }
  listarPersonalADG() {

    this.busqueda = 0;
    this.layoutDeCarga = true;
    const body = {
      busqueda: this.busqueda,
      paginacion: this.pageData.paginacion
    };

    this._PersonaladgServie.ListadoTablasIndependientes().subscribe(res => {
      this.municipiolaboral = res.municipiolaboral;
      this.arealaboral = res.arealaboral;
      this.puestos = res.puestos;
    });
    this._PersonaladgServie.ListarPersonalADG(body).subscribe(res => {
      this.dataSource = res.ListadoPersonalADG.data;
      this.pageData.page = res.pagination.current_page;
      this.pageData.totalRows = res.pagination.total;
      this.paginaSiguiente = res.ListadoPersonalADG.next_page_url;
      this.paginaAnterior = res.ListadoPersonalADG.prev_page_url;
      this.pageData.totalPage = res.pagination.last_page;
      this.layoutDeCarga = false;
    });
  }

  filtrar() {
    this.busqueda = 1;
    this.filtrosActivo = true;
    this.layoutDeCarga = true;
    const body = {
      busqueda: this.busqueda,
      paginacion: this.pageData.paginacion,
      municipio_id: this.seleccionar_municipiolaboral,
      arealaboral_id: this.seleccionar_arealaboral,
      id_puesto: this.seleccionar_puestos,
      CCT: this.input_CCT,
      nombreCCT: this.input_nombreCCT,
      nombrePersonalADG: this.input_nombrePersonalADG,
      rfc: this.input_rfc,
      curp: this.input_curp,
      sexo: this.seleccionar_sexo,
      tipo_de_sangre: this.input_tipo_de_sangre,
      estado_civil: this.seleccionar_estado_civil
    };
    this._PersonaladgServie.ListarPersonalADG(body).subscribe(res => {
      this.dataSource = res.ListadoPersonalADG.data;
      this.pageData.page = res.pagination.current_page;
      this.pageData.totalRows = res.pagination.total;
      this.paginaSiguiente = res.ListadoPersonalADG.next_page_url;
      this.paginaAnterior = res.ListadoPersonalADG.prev_page_url;
      this.pageData.totalPage = res.pagination.last_page;
      this.layoutDeCarga = false;
    });
  }
}
