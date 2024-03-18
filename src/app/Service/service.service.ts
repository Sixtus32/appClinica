import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceService<T> {
  private baseUrl = 'http://localhost:8093/api/v1';

  constructor(private http: HttpClient) { }

  // listar
  getAll(resource: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${resource}`);
  }

  // obtener por Id
  getById(resource: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${resource}/${id}`);
  }

  // crear
  create(resource: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${resource}`, data);
  }

  // actualizar
  update(resource: string, id: number, data: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${resource}/${id}`, data);
  }

  // eliminar
  delete(resource: string, id: number): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${resource}/${id}`);
  }
}