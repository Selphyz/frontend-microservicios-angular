import { Asignatura } from "./asignatura";
import { Pregunta } from "./pregunta";

export class Examen {
    id: number;
    nombre: string;
    createdAt: string;
    preguntas: Pregunta[] = [];
    asignature: Asignatura;
    respondido: boolean;
}
