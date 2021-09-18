import { Pregunta } from "./pregunta";

export class Respuesta {
    id: string;
    texto: string;
    alumno: string;
    pregunta: Pregunta;
}
