import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent implements OnInit {
  titulo = 'Creacion de alumnos';
  alumno: Alumno = new Alumno();
  constructor(private service: AlumnoService, private router: Router) { }
  ngOnInit(): void {
  }
  public crear(): void{
    this.service.crear(this.alumno).subscribe(data=>{
      console.log(data);
      alert(`Alumno ${this.alumno.nombre} creado con exito`);
      this.router.navigate(['/alumnos']);
    });
  }
}
