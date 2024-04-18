import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterEmployeComponent } from './components/register-employe/register-employe.component';
import { CrudAdminComponent } from './components/crud-admin/crud-admin.component';
import { CrudContratoComponent } from './components/crud-contrato/crud-contrato.component';
import { SolicitudSupAdminComponent } from './components/solicitud-sup-admin/solicitud-sup-admin.component';
import { TurnoComponent } from './components/turno/turno.component';
import { AreaComponent } from './components/area/area.component';
import { SedesComponent } from './components/sede/sede.component';
import { SolicitudCambioHorarioComponent } from './components/solicitudes/solicitud-cambio-horario/solicitud-cambio-horario.component';
import { LoginComponent } from './components/login/login.component';
import { VacacionesComponent } from './components/solicitudes/vacaciones/vacaciones.component';


//guardiaaas
import { EmpleadoGuardia } from './guards/user-guard.guard';
import { AdministradorGuardia } from './guards/administrador-guardia.guard';
import { SuperAdministradorGuardia } from './guards/super-administrador-guardia.guard';
import { SolicitudVacacionComponent } from './components/solicitud-vacacion/solicitud-vacacion.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { GanttEmpleadoComponent } from './components/gantts/gantt-empleado/gantt-empleado.component';
import { GanttComponent } from './components/gantt/gantt.component';
import { GanttAdminComponent } from './components/gantts/gantt-admin/gantt-admin.component';
import { ActividadesComponent } from './components/actividades/actividades.component';



const routes: Routes = [
  //todos
  { path: '', component: HomeComponent },
  { path: 'inicio', redirectTo: '', pathMatch: 'full'},
  { path: 'login', component:LoginComponent},
  { path: 'gantt-flow', component: GanttEmpleadoComponent},

  // Empleado
  { path: 'solicitud-cambio-horario', component: SolicitudCambioHorarioComponent, canActivate: [EmpleadoGuardia]},
  { path: 'solicitud-vacaciones', component: VacacionesComponent, canActivate: [EmpleadoGuardia]},

  // Administrador
  { path: 'rg_emp', component: RegisterEmployeComponent, canActivate: [AdministradorGuardia] },
  { path: 'rg_emp/edit/:correo', component: RegisterEmployeComponent, canActivate: [AdministradorGuardia]},
  { path: 'contrato', component: CrudContratoComponent, canActivate: [AdministradorGuardia]},
  { path: 'area', component: AreaComponent, canActivate: [AdministradorGuardia]},
  { path: 'solicitudes-turno', component: TurnoComponent, canActivate: [AdministradorGuardia]},
  { path: 'solicitud-vacaciones-validacion', component: SolicitudVacacionComponent, canActivate: [AdministradorGuardia] },
  { path: 'departamento', component:DepartamentoComponent, canActivate: [AdministradorGuardia]},
  { path: 'gantt', component: GanttAdminComponent, canActivate:  [SuperAdministradorGuardia,AdministradorGuardia]},


  // Superadministrador
  { path: 'admin', component: CrudAdminComponent, canActivate: [SuperAdministradorGuardia,AdministradorGuardia]},
  { path: 'solicitudsupad', component: SolicitudSupAdminComponent, canActivate: [SuperAdministradorGuardia,AdministradorGuardia]},
  { path: 'sede', component: SedesComponent, canActivate:  [SuperAdministradorGuardia,AdministradorGuardia]},
  { path: 'actividades', component:ActividadesComponent, canActivate: [AdministradorGuardia]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
