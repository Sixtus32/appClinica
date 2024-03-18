import { Component, OnInit } from '@angular/core';
import { PacienteServiceService } from '../../../Service/paciente-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from '../../../Models/pacienteDTO';
import { Cita } from '../../../Models/citaDTO';
import { CitaServiceService } from '../../../Service/cita-service.service';
import { Medico } from '../../../Models/medicoDTO';
import { MedicoServiceService } from '../../../Service/medico-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-paciente-item-detail',
  templateUrl: './paciente-item-detail.component.html',
  styleUrl: './paciente-item-detail.component.css'
})
export class PacienteItemDetailComponent implements OnInit {

  id = 2;
  nombre = ''
  apellidos = ''
  usuarioNom = ''
  clave = ''
  nss = ''
  numTarjeta = ''
  telefono = ''
  direccion = ''

  // Datos de los medicos y las citas del paciente
  medicos : Medico[] = [];
  pacientCitas : Cita [] = [];
  medicoIds : number[] = [];

  public pacienteData : any;
  public medicoData : any;

  constructor(
    private _pacienteService : PacienteServiceService,
    private _medicoService : MedicoServiceService,
     private _snackBar: MatSnackBar,
    private domSanitizer : DomSanitizer,
    private _route : ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];

    this._pacienteService.getById(this.id).subscribe((data) => {
      this.pacienteData = data;
      this.nombre = this.pacienteData.nombre;
      this.apellidos = this.pacienteData.apellido;
      this.usuarioNom = this.pacienteData.usuarioNom;
      this.clave = this.pacienteData.clave;
      this.nss = this.pacienteData.nss;
      this.numTarjeta = this.pacienteData.numTarjeta;
      this.telefono = this.pacienteData.telefono;
      this.direccion = this.pacienteData.direccion;
      this.pacientCitas = this.pacienteData.citas;

      this.pacientCitas.forEach(element => {
        this.medicoIds.push(Number(element.medicoID));
      });

      // Obtener detalles de todos los médicos en una sola llamada
      forkJoin(this.medicoIds.map(id => this._medicoService.getById(id)))
        .subscribe(
          medicos => {
            this.medicos = medicos;
          },
          error => {
            console.error('Error al cargar medicos:', error);
            this.popup('Error al cargar medicos', 'Cerrar');
          }
        );
    });
  }

    popup(var1 : string, var2 : string) : void {
    this._snackBar.open(var1,var2,{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
  }
  getMedicoName(id:any) : string{
    this._medicoService.getById(Number(id)).subscribe((data) => {
      this.medicoData = data;
    })
    return this.medicoData?.nombre + ' ' + this.medicoData?.apellidos;
  }
}
