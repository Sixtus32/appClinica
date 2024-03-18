import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../Models/pacienteDTO';
import { PacienteServiceService } from '../../Service/paciente-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  animations: [
    // Define las animaciones aquí si las estás utilizando en el componente
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(300)),
    ])
  ]
})



export class PacienteComponent implements OnInit {
  formularioPaciente : FormGroup;
  pacientes: Paciente[] = [];
  selectedPaciente: Paciente | null = null;
  pacienteObj : Paciente  = new Paciente();

  showModal: boolean = false;

  // Variables de edición
  editedId ?: number | undefined = 0;
  editedNombre ?: string | undefined = "";
  editedApellidos?: string | undefined  = "";
  editedUsuarioNom ?: string | undefined  = "";
  editedClave ?: string | undefined  = "";
  editedNSS ?: string | undefined  = "";
  editedNumTarjeta ?: string | undefined  = "";
  editedTelefono ?: string | undefined  = "";
  editedDireccion ?: string | undefined  = "";

  constructor(private _pacienteService: PacienteServiceService,
              private router : Router,
              private fb : FormBuilder,
              private _snackBar: MatSnackBar) {

                this.formularioPaciente = this.fb.group({
                  nombre: ['', Validators.required],
                  apellidos: ['', Validators.required],
                  usuarioNom : ['', Validators.required],
                  clave : ['', Validators.required],
                  nss : ['', Validators.required],
                  numTarjeta : ['', Validators.required],
                  telefono : ['', Validators.required],
                  direccion : ['', Validators.required],
                })
              }

  ngOnInit(): void {
    this.loadPacientes();
  }

onClickSubmitForm(): void {
    if (!this.formularioPaciente.invalid) {
        const nuevoPaciente: Paciente = {
            nombre: this.formularioPaciente.value.nombre,
            apellidos: this.formularioPaciente.value.apellidos,
            usuarioNom: this.formularioPaciente.value.usuarioNom || '',
            clave: this.formularioPaciente.value.clave || '',
            nss: this.formularioPaciente.value.nss || '',
            numTarjeta: this.formularioPaciente.value.numTarjeta || '',
            telefono: this.formularioPaciente.value.telefono || '',
            direccion: this.formularioPaciente.value.direccion || ''
        };
        
        this._pacienteService.create(nuevoPaciente).subscribe(
            data => {
                console.log(data);
                this.popup('Paciente creado','Cerrar')
                this.loadPacientes(); // Recargar la lista después de agregar un paciente
                this.formularioPaciente.reset(); // Limpiar el formulario después de agregar un paciente
            },
            error => {
                console.error('Error al agregar paciente:', error);
                this.popup('Error al agregar paciente', 'Cerrar');
            }
        );
    } else {
        this.popup('Se produjo un error', 'Vuelva a intentarlo');
    }
}

  popup(var1 : string, var2 : string) : void {
    this._snackBar.open(var1,var2,{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
  }

loadPacientes(): void {
    this._pacienteService.getAll().subscribe(
        pacientes => {
            this.pacientes = pacientes;
            this.popup('Datos de los pacientes cargados correctamente.', 'Cerrar');
        },
        error => {
            console.error('Error al cargar pacientes:', error);
            this.popup('Error al cargar pacientes', 'Cerrar');
        }
    );
}


guardarCambios(): void {
    if (this.selectedPaciente && this.editedNombre && this.editedApellidos) {
            // ...this.selectedPaciente,
        const pacienteActualizado: Paciente = {
            nombre: this.editedNombre || '',
            apellidos: this.editedApellidos || '',
            usuarioNom: this.editedUsuarioNom || '',
            clave: this.editedClave || '',
            nss: this.editedNSS || '',
            numTarjeta: this.editedNumTarjeta || '',
            telefono: this.editedTelefono || '',
            direccion: this.editedDireccion || ''
        };
        this.selectedPaciente.id=this.editedId;
        this._pacienteService.update(Number(this.selectedPaciente.id), pacienteActualizado).subscribe(
            () => {
                this.popup('Cambios guardados correctamente', 'Cerrar');
                this.loadPacientes(); // Recargar la lista después de actualizar
            },
            error => {
                console.error('Error al guardar los cambios:', error);
                this.popup('Error al guardar los cambios', 'Cerrar');
            }
        );
    } else {
        console.error('Los campos no pueden estar vacíos');
        this.popup('Los campos no pueden estar vacíos', 'Cerrar');
    }
}


eliminarPaciente(id: number | any): void {
    if (confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
      console.log(id);
      this._pacienteService.delete(Number(id)).subscribe(
        () => {
          // Eliminar el paciente de la lista local
          this.pacientes = this.pacientes.filter(p => p.id !== id);
          // Mostrar mensaje de éxito
          this._snackBar.open('Paciente eliminado correctamente', 'Cerrar', {
            duration: 3000,
          });
        },
        error => {
          console.error('Error al eliminar el paciente', error);
          // Mostrar mensaje de error
          this._snackBar.open('Error al eliminar el paciente', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    }
}

  

openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

mostrarDetalles(paciente: Paciente): void {
    this.selectedPaciente = paciente;
    this.editedId = Number(paciente.id);
    this.editedNombre = paciente.nombre;
    this.editedApellidos = paciente.apellidos;
    this.editedUsuarioNom = paciente.usuarioNom;
    this.editedClave = paciente.clave;
    this.editedNSS = paciente.nss;
    this.editedNumTarjeta = paciente.numTarjeta;
    this.editedTelefono = paciente.telefono;
    this.editedDireccion = paciente.direccion;

    // Asigna el ID del paciente seleccionado a pacienteObj
    this.pacienteObj.id = paciente.id;
}

goToPacient(pid:any){
    this.router.navigate(["paciente/" + pid]);
  }
}
