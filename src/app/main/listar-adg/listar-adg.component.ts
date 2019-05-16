import { Component, OnInit } from "@angular/core";
import { PersonaladgService } from "../../services/CAPACITACION/personaladg.service";
import { saveAs } from 'file-saver';

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


  constructor(private _PersonaladgServie: PersonaladgService) {
    this.listarPersonalADG();
  }

  ngOnInit() {}

  

  paginacion() 
  {
    this.layoutDeCarga = true;
    const body = {
      busqueda: 0,
      paginacion: this.pageData.paginacion
    };

    this._PersonaladgServie.PaginacionListarPersonalADG(body, this.pageData.page).subscribe(
      res =>
      {
        this.dataSource = res.ListadoPersonalADG.data;
        this.pageData.page = res.pagination.current_page;
        this.pageData.totalRows = res.pagination.total;
        this.pageData.totalPage =  res.pagination.last_page;
        this.paginaSiguiente = res.ListadoPersonalADG.next_page_url;
        this.paginaAnterior = res.ListadoPersonalADG.prev_page_url;
        this.layoutDeCarga = false;
      }
    );
  }

  monstrarFiltros()
  {
    if(this.FiltrosActivados)
    {
      this.FiltrosActivados = false;
    }else
    {
      this.FiltrosActivados = true;
    }
  }

  DescargarReporteGeneral()
  {

    this.layoutDeCarga = true;

    var f = new Date();

    let nombredelReporte = "Reporte_General_" + f.getDate() + "_" + (f.getMonth() +1) + "_" + f.getFullYear();

    let nombredelDescarga = nombredelReporte + '.xlsx'


    const body =  
    {
      NombreReporte: nombredelReporte,
      busqueda: 0
    };
    this._PersonaladgServie.ExportarExcelPersonalADG(body).subscribe(res => { 
      saveAs(res, nombredelDescarga, 
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      this.layoutDeCarga = false;
    });
  }
  listarPersonalADG() {
    this.layoutDeCarga = true;
    const body = {
      busqueda: 0,
      paginacion: this.pageData.paginacion
    };

    this._PersonaladgServie.ListadoTablasIndependientes().subscribe(
      res =>
      {
        this.municipiolaboral = res.municipiolaboral;
        this.arealaboral = res.arealaboral;
        this.puestos = res.puestos;
      } 
    );
    this._PersonaladgServie.ListarPersonalADG(body).subscribe(res => {
      this.dataSource = res.ListadoPersonalADG.data;
      this.pageData.page = res.pagination.current_page;
      this.pageData.totalRows = res.pagination.total;
      this.paginaSiguiente = res.ListadoPersonalADG.next_page_url;
      this.paginaAnterior = res.ListadoPersonalADG.prev_page_url;
      this.pageData.totalPage =  res.pagination.last_page;
      this.layoutDeCarga = false;
    });
  }

  filtrar(){
    this.layoutDeCarga = true;
    const body = {
      busqueda: 1,
      paginacion: this.pageData.paginacion
    };
    this._PersonaladgServie.ListarPersonalADG(body).subscribe(res => {
      this.dataSource = res.ListadoPersonalADG.data;
      this.pageData.page = res.pagination.current_page;
      this.pageData.totalRows = res.pagination.total;
      this.paginaSiguiente = res.ListadoPersonalADG.next_page_url;
      this.paginaAnterior = res.ListadoPersonalADG.prev_page_url;
      this.pageData.totalPage =  res.pagination.last_page;
      this.layoutDeCarga = false;
    });
  }
}
