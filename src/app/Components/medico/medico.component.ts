import { Component, OnInit } from '@angular/core';
import { Medico } from '../../Models/medicoDTO';
import { MedicoServiceService } from '../../Service/medico-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.css',
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
export class MedicoComponent implements OnInit {
  formularioMedico  : FormGroup;
  medicos : Medico [] = [];
  selectedMedico : Medico | null = null;
  medicoObj : Medico = new Medico();

  showModal: boolean = false;
  // Variables de edición
  editedId ?: number | undefined = 0;
  editedNombre ?: string | undefined = "";
  editedApellidos?: string | undefined  = "";
  editedUsuarioNom ?: string | undefined  = "";
  editedClave ?: string | undefined  = "";
  editedNumColegiado ?: string | undefined = "";

  constructor(private _medicoService : MedicoServiceService,
              private _router : Router,
              private _fb : FormBuilder,
              private _snackBar : MatSnackBar){
                this.formularioMedico = this._fb.group({
                  nombre : ['', Validators.required],
                  apellidos : ['', Validators.required],
                  usuarioNom : ['', Validators.required],
                  clave : ['', Validators.required],
                  numColegiado : ['', Validators.required],
                })
              }

  ngOnInit(): void {
    this.loadMedicos();
  }

  mostrarDetalles(medico: Medico): void {
    this.selectedMedico = medico;
    this.editedId = Number(medico.id);
    this.editedNombre = medico.nombre;
    this.editedApellidos = medico.apellidos;
    this.editedUsuarioNom = medico.usuarioNom;
    this.editedClave = medico.clave;
    this.editedNumColegiado = medico.numColegiado;

    // Asigna el ID del paciente seleccionado a pacienteObj
    this.medicoObj.id = medico.id;
}


  onClickSubmitForm(): void {
    if (!this.formularioMedico.invalid) {
        const nuevoMedico: Medico = {
            nombre: this.formularioMedico.value.nombre,
            apellidos: this.formularioMedico.value.apellidos,
            usuarioNom: this.formularioMedico.value.usuarioNom || '',
            clave: this.formularioMedico.value.clave || '',
            numColegiado : this.formularioMedico.value.numColegiado || '',
        };
        
        this._medicoService.create(nuevoMedico).subscribe(
            data => {
                console.log(data);
                this.loadMedicos(); // Recargar la lista después de agregar un paciente
                this.formularioMedico.reset(); // Limpiar el formulario después de agregar un paciente
            },
            error => {
                console.error('Error al agregar medico:', error);
                this.popup('Error al agregar medico', 'Cerrar');
            }
        );
    } else {
        this.popup('Se produjo un error', 'Vuelva a intentarlo');
    }
}

openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }


guardarCambios(): void {
    if (this.selectedMedico && this.editedNombre && this.editedApellidos) {
            // ...this.selectedPaciente,
        const medicoActualizado: Medico = {
            nombre: this.editedNombre || '',
            apellidos: this.editedApellidos || '',
            usuarioNom: this.editedUsuarioNom || '',
            clave: this.editedClave || '',
            numColegiado : this.editedNumColegiado || '',
        };
        this.selectedMedico.id=this.editedId;
        this._medicoService.update(Number(this.selectedMedico.id), medicoActualizado).subscribe(
            () => {
                this.popup('Cambios guardados correctamente', 'Cerrar');
                this.loadMedicos(); // Recargar la lista después de actualizar
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

  popup(var1 : string, var2 : string) : void {
    this._snackBar.open(var1,var2,{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
  }

  eliminarMedico(id: number | any): void {
    if (confirm("¿Estás seguro de que deseas eliminar este medico?")) {
      console.log(id);
      this._medicoService.delete(Number(id)).subscribe(
        () => {
          // Eliminar el paciente de la lista local
          this.medicos = this.medicos.filter(p => p.id !== id);
          // Mostrar mensaje de éxito
          this.popup('Medico eliminado con éxito','Cerrar')
        },
        error => {
          console.error('Error al eliminar el medico', error);
          // Mostrar mensaje de error
          this.popup('Error al eliminar el medico', 'Cerrar')
        }
      );
    }
}

  loadMedicos() : void {
    this._medicoService.getAll().subscribe(
      medicos => {
        this.medicos = medicos;
      },
       error => {
        console.log('Error al cargar los medicos',error);
        this.popup('Error al cargar los medicos','Cerrar');
       }
    )
  }

  goToMedico(pid:any){
    this._router.navigate(["medico/" + pid]);
  }
}
