import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoComponent } from './Components/medico/medico.component';
import { PacienteComponent } from './Components/paciente/paciente.component';
import { DiagnosticoComponent } from './Components/diagnostico/diagnostico.component';
import { CitaComponent } from './Components/cita/cita.component';
import { MenuComponent } from './shared/menu/menu.component';
import { HomeComponent } from './shared/home/home.component';
import { PacienteItemDetailComponent } from './Components/detail/paciente-item-detail/paciente-item-detail.component';
import { MedicoItemDetailComponent } from './Components/detail/medico-item-detail/medico-item-detail.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'medico',component:MedicoComponent},
  {path:'medico/:id',component:MedicoItemDetailComponent},

  {path:'paciente',component:PacienteComponent},
  {path:'paciente/:id',component:PacienteItemDetailComponent},

  {path:'diagnostico',component:DiagnosticoComponent},
  {path:'cita',component:CitaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
