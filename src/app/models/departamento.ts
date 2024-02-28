export interface Departamento {
  NombreDepartamento: string;
  Direccion: {
    Numero: string;
    Calle: number;
    Colonia: string;
    Cp: string;
    Ciudad: string;
  };
  NumeroDeEmpleado: number;
}
