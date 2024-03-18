import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../Models/medicoDTO';
import { ServiceService } from './service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoServiceService {
  private resource = 'medico'
  constructor(private apiService : ServiceService<Medico>){}

  // listar medico
  getAll() : Observable<Medico[]>{
    return this.apiService.getAll(this.resource+'s');
  }

  // obtener medico por id
  getById(id : number) : Observable<Medico>{
    return this.apiService.getById(this.resource,id);
  }

  // crear medico
  create(data : Medico) : Observable<Medico>{
    return this.apiService.create(this.resource,data);
  }

  // actualizar medico
  update(id : number, data : Medico) : Observable<Medico>{
    return this.apiService.update(this.resource,id,data);
  }

  // eliminar medico
  delete(id : number) : Observable<Medico>{
    return this.apiService.delete(this.resource,id);
  }
}
