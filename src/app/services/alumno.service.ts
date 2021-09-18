import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private baseEndpoint = 'http://localhost:8090/api/alumnos';
  constructor(private http: HttpClient) { }
  public listar(): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(this.baseEndpoint).pipe(
      map(alumnos => alumnos)
      // map(alumnos => {return alumnos})
    );
  }
  public listarDetalles(id: number): Observable<Alumno>{
    return this.http.get<Alumno>(`${this.baseEndpoint}/${id}`);
  }
  public listarPaginas(page: string, size: string): Observable<any>{
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
    return this.http.get<any>(`${this.baseEndpoint}/pagina`, {params: params})
  }
  public crear(alumno: Alumno): Observable<Alumno>{
    return this.http.post<Alumno>(this.baseEndpoint, alumno, {headers: this.header});
  }
  public editar(alumno: Alumno): Observable<Alumno>{
    return this.http.put<Alumno>(`${this.baseEndpoint}/${alumno.id}`, {headers: this.header});
  }
  public eliminar(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
