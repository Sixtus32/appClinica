export class Usuario {
    id : number;
    nombre : string;
    apellidos : string;
    usuarioNom : string;
    clave : string;
    constructor(id : number, nombre : string, apellidos : string, usuarioNom : string, clave : string){
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.usuarioNom = '@'+usuarioNom;
        this.clave = clave;
    }
}