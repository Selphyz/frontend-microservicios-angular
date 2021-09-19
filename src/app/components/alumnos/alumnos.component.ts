import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  titulo = 'Listado de alumnos'
  alumnos: Alumno[];
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions = [3, 5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private service: AlumnoService) { }
  ngOnInit(): void {
    this.calcularRango();
  }
  paginar(event: PageEvent): void{
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRango();
  }
  private calcularRango(){
    this.service.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString()).subscribe(r =>{
      this.alumnos = r.content as Alumno[];
      this.totalRegistros = r.totalElements as number;
      this.paginator._intl.itemsPerPageLabel = 'Registros por pagina:';
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
            // this.alumnos = this.alumnos.filter(a=>a!==alumno);
            this.calcularRango();
            Swal.fire('Registro borrado', `Alumno ${alumno.nombre} eliminado con exito`, 'success');
          });
        }
      }
    });
  }
}
