import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PersonaladgService {
  
  private url: string = "http://127.0.0.1:8000/api/personaladg/";

  //http://127.0.0.1:8000/api/personaladg/ListarPersonalADG?page=18

  constructor(private http: HttpClient) {}

  ListadoCCTS(): Observable<any>{
    return this.http.get(`${this.url}ListadoCCTS`);
  }

  ListarPersonalADG(body): Observable<any> {
    return this.http.post(`${this.url}ListarPersonalADG`, body);
  }
  PaginacionListarPersonalADG(body, page): Observable<any> {
    return this.http.post(`${this.url}ListarPersonalADG?page=${page}`, body);
  }
  ListadoTablasIndependientes(): Observable<any> {
    return this.http.get(`${this.url}ListadoTablasIndependientes`);
  }
  ExportarExcelPersonalADG(body){
    return this.http.post(`${this.url}ExportarExcelPersonalADG`, body, {responseType: 'blob'});
  }


}
