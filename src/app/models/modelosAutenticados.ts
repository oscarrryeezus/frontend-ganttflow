export interface usuarioComun{
    Role: string
}

export interface AdministradorAuth{
    Nombre: string,
    CorreoAdmin: string,
    Contrasena: string,
    Region: string,
    root: string,
    Role: string, 
    iat: number, 
    exp: number
}

export interface SuperadministradorAuth{
    Nombre: string,
    CorreoAdmin: string,
    Contrasena: string,
    Region: string,
    root: string,
    Role: string, 
    iat: number, 
    exp: number
}

export interface EmpleadoAuth{
    Nombre: string,
    AppE: String,
    ApmE: String,
    FechaNac: Date,  
    Correo: String,
    Contrasena: String,
    Region: String,
    AreaTrabajo: String,
    Departamento: String,
    Contrato: String,
    TurnoActual: {
        HoraInicial: Date,  
        HoraFinal: Date     
    },
    HorarioTraining: {
        Fecha: Date,     
        HoraInicial: Date,   
        HoraFinal: Date      
    },
    NombreAdmin: String,
    FechaDeIngreso: Date,
    Role: string, 
    iat: number, 
    exp: number, 
}