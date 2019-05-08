import { Component, OnInit } from '@angular/core';
import { PersonaladgService } from '../../services/CAPACITACION/personaladg.service';

@Component({
  selector: 'app-listar-adg',
  templateUrl: './listar-adg.component.html',
  styleUrls: ['./listar-adg.component.scss']
})
export class ListarADGComponent implements OnInit {

  constructor(private _PersonaladgServie: PersonaladgService) 
  {
    this.listarPersonalADG();
  }

  ngOnInit() {
  }

  listarPersonalADG()
  {
    const body = 
    {
        busqueda: 0 ,
        paginacion: 50
    }

    const pagina = 1;

   
    this._PersonaladgServie.ListarPersonalADG(body, pagina).subscribe(
      res => 
      {
        console.log(res);
      }
    );
  }

}
