import { Component, OnInit } from '@angular/core';
import { PacienteServiceService} from '../../../Service/paciente-service.service';
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
  selector: 'app-medico-item-detail',
  templateUrl: './medico-item-detail.component.html',
  styleUrl: './medico-item-detail.component.css'
})
export class MedicoItemDetailComponent implements OnInit {
  id = 2;
  nombre = ''
  apellidos = ''
  usuarioNom = ''
  clave = ''
  numColegiado = ''

    // Datos de los medicos y las citas del paciente
  pacientes : Medico[] = [];
  medicoCitas : Cita [] = [];
  pacienteIds : number[] = [];

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

    this._medicoService.getById(this.id).subscribe((data) => {
      this.medicoData = data;
      this.nombre = this.medicoData.nombre;
      this.apellidos = this.medicoData.apellido;
      this.usuarioNom = this.medicoData.usuarioNom;
      this.clave = this.medicoData.clave;
      this.numColegiado = this.medicoData.numColegiado;
      this.medicoCitas = this.medicoData.citas;

      this.medicoCitas.forEach(element => {
        this.pacienteIds.push(Number(element.pacienteID));
      });

      // Obtener detalles de todos los médicos en una sola llamada
      forkJoin(this.pacienteIds.map(id => this._pacienteService.getById(id)))
        .subscribe(
          paciente => {
            this.pacientes = paciente;
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

    getPacienteName(id:any) : string{
    this._pacienteService.getById(Number(id)).subscribe((data) => {
      this.pacienteData = data;
    })
    return this.pacienteData?.nombre + ' ' + this.pacienteData?.apellidos;
  }

}

