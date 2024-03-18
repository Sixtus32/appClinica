import { Component, OnInit } from '@angular/core';
import { CitaServiceService } from '../../Service/cita-service.service';
import { Cita } from '../../Models/citaDTO';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paciente } from '../../Models/pacienteDTO';
import { PacienteServiceService } from '../../Service/paciente-service.service';
import { MedicoServiceService } from '../../Service/medico-service.service';
import { Medico } from '../../Models/medicoDTO';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css'],
})
export class CitaComponent implements OnInit {
  citas: Cita[] = [];
  pacientes: Paciente[] = [];
  medicos: Medico[] = [];

  constructor(
    private _citaService: CitaServiceService,
    private _pacienteService: PacienteServiceService,
    private _medicoService: MedicoServiceService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCita();
    this.loadPacientes();
    this.loadMedicos();
  }

  loadCita(): void {
    this._citaService.getAll().subscribe(
      (citas) => {
        this.citas = citas;
      },
      (error) => {
        console.error('Error al cargar las citas', error);
        this.popup('Error al cargar las citas', 'Cerrar');
      }
    );
  }

  loadPacientes(): void {
    this._pacienteService.getAll().subscribe(
      (pacientes) => {
        this.pacientes = pacientes;
      },
      (error) => {
        console.error('Error al cargar los pacientes', error);
        this.popup('Error al cargar los pacientes', 'Cerrar');
      }
    );
  }

  loadMedicos(): void {
    this._medicoService.getAll().subscribe(
      (medicos) => {
        this.medicos = medicos;
      },
      (error) => {
        console.error('Error al cargar los médicos', error);
        this.popup('Error al cargar los médicos', 'Cerrar');
      }
    );
  }

  nombreCompletoPaciente(id: any): string {
    const paciente = this.pacientes.find((p) => p.id === id);
    return paciente ? paciente.nombre + ' ' + paciente.apellidos : '';
  }

  nombreCompletoMedico(id: any): string {
    const medico = this.medicos.find((m) => m.id === id);
    return medico ? medico.nombre + ' ' + medico.apellidos : '';
  }

  popup(var1: string, var2: string): void {
    this._snackBar.open(var1, var2, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
