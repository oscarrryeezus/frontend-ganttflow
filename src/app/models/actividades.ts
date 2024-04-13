export interface Actividades {
    id: number;
    NombreActividad: string;
    HorarioTraining: {
      Fecha: string;
      HoraInicial: string;
      HoraFinal: string;
    };
    Duracion: number;
    Empleado: string;
  }
