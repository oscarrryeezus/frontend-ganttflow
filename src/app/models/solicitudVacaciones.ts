export interface SolicitudVacaciones{
  NombreEmpleado: string;
  NombreAdmin: string;
  PeriodoSolicitado:{
      inicio: string,
      fin: string
  };
  EstadoSolicitud: string;
  Correo: string;
}
