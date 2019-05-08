import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PersonaladgService {
  
  private url: string = "http://127.0.0.1:8000/api/personaladg/";

  constructor(private http: HttpClient) {}

  ListadoCCTS(): Observable<any>{
    return this.http.get(`${this.url}ListadoCCTS`);
  }

  ListarPersonalADG(body, pagina): Observable<any> {
    return this.http.post(`${this.url}ListarPersonalADG?page=${pagina}`, body);
  }
}
