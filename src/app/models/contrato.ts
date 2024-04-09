export interface Contrato {
    TipoContrato: string;
    DiasTrabajados: number;
    DiasDescansados: number;
    HorasPorDia: number;
    TurnosContrato: TurnoContrato[]; // Definimos un tipo específico para los turnos
  }
  
  export interface TurnoContrato {
    inicio: string;
    fin: string;
  }
  