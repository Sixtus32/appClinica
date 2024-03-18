import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { Diagnostico } from '../Models/diagnosticoDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoServiceService {
  private resource = 'diagnostico'
  constructor(private apiService : ServiceService<Diagnostico>) { }

  // listar diagnosticos
  getAll() : Observable<Diagnostico[]>{
    return this.apiService.getAll(this.resource+'s');
  }

  // obtener diagnosticos por id
  getById(id : number) : Observable<Diagnostico>{
    return this.apiService.getById(this.resource,id);
  }

  // crear diagnostico
  create(data : Diagnostico) : Observable<Diagnostico> {
    return this.apiService.create(this.resource,data);
  }

  // actualizar diagnostico
  update(id : number, data : Diagnostico) : Observable<Diagnostico>{
    return this.apiService.update(this.resource,id,data);
  }

  // eliminar diagnostico
  delete(id : number) : Observable<Diagnostico>{
    return this.apiService.delete(this.resource,id);
  }
  
}
