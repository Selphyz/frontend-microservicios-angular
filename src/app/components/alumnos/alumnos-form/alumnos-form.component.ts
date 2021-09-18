import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  error: any;  
  constructor(private service: AlumnoService, 
    private router: Router, 
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const id: number = +params.get('id');
      if(params.get('id')){
        this.service.listarDetalles(id).subscribe(alumno=> this.alumno=alumno)
      }
    })
  }
  public crear(): void{
    this.service.crear(this.alumno).subscribe(data=>{
      console.log(data);
      Swal.fire('Nueva inserción', `Alumno ${this.alumno.nombre} creado con exito`, 'success');
      this.router.navigate(['/alumnos']);
    }, err => {
      if(err.status===400){
        this.error=err.error;
        console.log(this.error);        
      }
    });
  }
  public editar(): void{
    this.service.editar(this.alumno).subscribe(data=>{
      console.log(data);
      Swal.fire('Modificación', `Alumno ${this.alumno.nombre} modificado con exito`, 'success');
      this.router.navigate(['/alumnos']);
    }, err => {
      if(err.status===400){
        this.error=err.error;
        console.log(this.error);        
      }
    });
  }
}
