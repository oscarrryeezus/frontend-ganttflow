export interface Empleado {
  Nombre: string;
    AppE: string;
    ApmE: string;
    FechaNac: Date;
    Correo: string;
    Region: string;
    AreaTrabajo: string;
    Contrato: string;
    TurnoActual: {
      HoraInicial: Date;
      HoraFinal: Date;
  },
  HorarioTraining: {
      FechaInicio: Date;
      FechaFin: Date;
      HoraInicial: Date;
      HoraFinal: Date;
  }
}
