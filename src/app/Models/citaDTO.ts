import { Diagnostico } from "./diagnosticoDTO";
export class Cita {
    citaID ?: Number;
    fechaHora ?: Date;
    motivoCita ?: string;
    //attribute11 ?: number;
    pacienteID ?: number;
    medicoID ?: number;
    diagnostico ?: Diagnostico;
    constructor() {}
}