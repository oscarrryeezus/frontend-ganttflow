export interface Empleado {
  Nombre: string;
  AppE: string;
  ApmE: string;
  FechaNac: Date;
  Correo: string;
  Contrasena: string;
  Region: string;
  AreaTrabajo: string;
  Departamento: string;
  Contrato: string;
  TurnoActual: {
      inicio: string; // Cambiado a string
      fin: string; // Cambiado a string
  };
  HorarioTraining: {
      Fecha: Date;
      HoraInicial: string; // Cambiado a string
      HoraFinal: string; // Cambiado a string
  };
  NombreAdmin: string;
  FechaDeIngreso: Date;
}
