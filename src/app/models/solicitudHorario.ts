export interface SolicitudHorario {
    NombreEmpleado: string;
    NombreAdmin: string;
    Contrato: string;
    TurnoSolicitado:{
        inicio: string,
        fin: string
    };
    EstadoSolicitud: string;
    Correo: string;
}
