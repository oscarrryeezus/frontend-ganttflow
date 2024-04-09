import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterEmployeComponent } from './components/register-employe/register-employe.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CrudAdminComponent } from './components/crud-admin/crud-admin.component';
import { CrudContratoComponent } from './components/crud-contrato/crud-contrato.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { LoginComponent } from './components/login/login.component';
import { SedesComponent } from './components/sede/sede.component';
import { AreaComponent } from './components/area/area.component';
import { VacacionesComponent } from './components/solicitudes/vacaciones/vacaciones.component';
import { SolicitudCambioHorarioComponent } from './components/solicitudes/solicitud-cambio-horario/solicitud-cambio-horario.component';
import { CookieService } from 'ngx-cookie-service';
import { NavigationBarAdminComponent } from './components/nabvars/navigation-bar-admin/navigation-bar-admin.component';
import { NavigationBarEmpleadoComponent } from './components/nabvars/navigation-bar-empleado/navigation-bar-empleado.component';
import { NavigationBarLoginComponent } from './components/nabvars/navigation-bar-login/navigation-bar-login.component';
import { NavigationBarSuperadminComponent } from './components/nabvars/navigation-bar-superadmin/navigation-bar-superadmin.component';
import { SolicitudSupAdminComponent } from './components/solicitud-sup-admin/solicitud-sup-admin.component';
import { TurnoComponent } from './components/turno/turno.component';
import { InicioComponent } from './components/inicios/inicio/inicio.component';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { Gantt } from 'dhtmlx-gantt';
import { GanttComponent } from './components/gantt/gantt.component';
import { GanttEmpleadoComponent } from './components/gantts/gantt-empleado/gantt-empleado.component';
import { GanttAdminComponent } from './components/gantts/gantt-admin/gantt-admin.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SolicitudVacacionComponent } from './components/solicitud-vacacion/solicitud-vacacion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    RegisterEmployeComponent,
    CrudAdminComponent,
    CrudContratoComponent,
    AppComponent,
    LoginComponent,
    SedesComponent,
    AreaComponent,
    VacacionesComponent,
    SolicitudCambioHorarioComponent,
    LoginComponent,
    NavigationBarAdminComponent,
    NavigationBarEmpleadoComponent,
    NavigationBarLoginComponent,
    NavigationBarSuperadminComponent,
    SolicitudSupAdminComponent,
    TurnoComponent,
    InicioComponent,
    DepartamentoComponent,
    GanttComponent,
    GanttEmpleadoComponent,
    GanttAdminComponent,
    SolicitudVacacionComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    DragDropModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,

    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    provideHttpClient(withFetch()),
    CrudAdminComponent,
    CrudContratoComponent,
    RegisterEmployeComponent,
    LoginComponent,
    CookieService,
  ],
})
export class AppModule { }
