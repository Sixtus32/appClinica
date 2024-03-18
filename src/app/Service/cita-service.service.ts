import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { Cita } from '../Models/citaDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaServiceService {
  private resource = 'cita'
  constructor(private apiService : ServiceService<Cita>) { }

  // listar citas
  getAll() : Observable<Cita[]> {
    return this.apiService.getAll(this.resource+'s');
  }

  // obtener citas por id
  getById(id : number) : Observable<Cita> {
    return this.apiService.getById(this.resource,id);
  }

  // crear cita
  create(data : Cita) : Observable<Cita> {
    return this.apiService.create(this.resource,data);
  }

  // actualizar  cita
  update(id : number, data : Cita) : Observable<Cita> {
    return this.apiService.update(this.resource,id,data);
  }

  // eliminar cita
  delete(id : number) : Observable<Cita>{
    return this.apiService.delete(this.resource,id);
  }
}
