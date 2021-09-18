import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  titulo = 'Listado de alumnos'
  alumnos: Alumno[];
  constructor(private service: AlumnoService) { }

  ngOnInit(): void {
    this.service.listar().subscribe(alumnos =>{
      this.alumnos = alumnos;
    });
  }
  public eliminar(alumno: Alumno): void{
    Swal.fire({
      title: 'Cuidado',
      text: `Estas a punto de eliminar al registro ${alumno.nombre}, ¿continuar?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Si, borrar'
    }).then((res)=>{
      if(res.value){
        if(confirm(`¿Seguro que desea eliminar a ${alumno.id}?`)){
          this.service.eliminar(alumno.id).subscribe(()=>{   
            this.alumnos = this.alumnos.filter(a=>a!==alumno);
            Swal.fire('Registro borrado', `Alumno ${alumno.nombre} eliminado con exito`, 'success');
          });
        }
      }
    });
  }
}
