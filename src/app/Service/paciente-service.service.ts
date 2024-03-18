import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { Paciente } from '../Models/pacienteDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PacienteServiceService {
  private resource = 'paciente';

  constructor(private apiService: ServiceService<Paciente>) { }

  // listar pacientes
  getAll(): Observable<Paciente[]> {
    return this.apiService.getAll(this.resource + 's'); // aquí usamos el nombre correcto del recurso
  }

  // obtener pacientes por id
  getById(id: number): Observable<Paciente> {
    return this.apiService.getById(this.resource, id); // aquí usamos el nombre correcto del recurso
  }

  // crear paciente
  create(data: Paciente): Observable<Paciente> {
    return this.apiService.create(this.resource, data); // aquí usamos el nombre correcto del recurso
  }

  // actualizar paciente
  update(id : number, data: Paciente): Observable<Paciente> {
    return this.apiService.update(this.resource, id, data); // aquí usamos el nombre correcto del recurso
  }

  // eliminar paciente
  delete(id: number): Observable<Paciente> {
    return this.apiService.delete(this.resource, id); // aquí usamos el nombre correcto del recurso
  }
}