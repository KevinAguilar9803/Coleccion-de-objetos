import { Component } from '@angular/core';
import { Estudiante } from '../../Entidades/estudiante';
import { EstudianteService } from '../../Controlador/estudiante.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estudiante',
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent {
  estudiantes: Estudiante[] = [];
  nuevoEstudiante: Partial<Estudiante> = {};
  estadisticas: { aprobados: number; reprobados: number } | null = null;
  estadisticassexo : { masculinos: number; femeninos: number} | null = null;
  promedioGeneral: number | null = null;
  estudiantesMayorNota: Estudiante[] = [];
  estudianteSeleccionado: Estudiante | null = null;
  notaRecuperacion: number | null = null;
  mostrarEstadisticas: boolean = false;
  estudianteEnEdicion: boolean = false;


  constructor(private estudianteService: EstudianteService) {
    this.estudiantes = this.estudianteService.listarEstudiantes();
    this.resetFormulario();
  }

  guardarEstudiante(): void {
    if (this.estudianteEnEdicion) {
      // Actualizar estudiante existente
      const estudiante = new Estudiante(
        this.nuevoEstudiante.codigo!,
        this.nuevoEstudiante.parcial1!,
        this.nuevoEstudiante.parcial2!,
        {
          cedula: this.nuevoEstudiante.cedula!,
          nombres: this.nuevoEstudiante.nombres!,
          apellidos: this.nuevoEstudiante.apellidos!,
          sexo: this.nuevoEstudiante.sexo!,
          fechaNacimiento: new Date(),
        }
      );
      this.estudianteService.modificarEstudiante(estudiante.codigo, estudiante);
    } else {
      // Agregar nuevo estudiante
      const estudiante = new Estudiante(
        this.nuevoEstudiante.codigo!,
        this.nuevoEstudiante.parcial1!,
        this.nuevoEstudiante.parcial2!,
        {
          cedula: this.nuevoEstudiante.cedula!,
          nombres: this.nuevoEstudiante.nombres!,
          apellidos: this.nuevoEstudiante.apellidos!,
          sexo: this.nuevoEstudiante.sexo!,
          fechaNacimiento: new Date(),
        }
      );
      this.estudianteService.agregarEstudiante(estudiante);
    }

    this.recargarEstudiantes();
    this.resetFormulario();
  }

  editarEstudiante(estudiante: Estudiante): void {
    this.nuevoEstudiante = { ...estudiante };
    this.estudianteEnEdicion = true;
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  seleccionarRecuperacion(estudiante: Estudiante): void {
    this.estudianteSeleccionado = estudiante;
  }

  guardarRecuperacion(): void {
    if (this.estudianteSeleccionado && this.notaRecuperacion !== null) {
      this.estudianteSeleccionado.actualizarRecuperacion(this.notaRecuperacion);
      this.estudianteService.modificarEstudiante(
        this.estudianteSeleccionado.codigo,
        this.estudianteSeleccionado
      );
      this.notaRecuperacion = null;
      this.estudianteSeleccionado = null;
      this.recargarEstudiantes();
    }
  }

  eliminarEstudiante(codigo: string): void {
    this.estudianteService.eliminarEstudiante(codigo);
    this.recargarEstudiantes();
  }

  consultarEstadisticas(): void {
    const totalNotas = this.estudiantes.reduce((acc, est) => acc + (est.notaDefinitiva ?? est.calificacionFinal), 0);
    this.promedioGeneral = totalNotas / this.estudiantes.length;

    this.estadisticas = this.estudianteService.calcularEstadisticas();
    this.estadisticassexo = this.estudianteService.calcularAprobadosPorSexo();
    this.estudiantesMayorNota = this.estudiantes.filter(
      (e) => (e.notaDefinitiva ?? e.calificacionFinal) > (this.promedioGeneral ?? 0)
    );

    this.mostrarEstadisticas = true; // Activa la bandera para mostrar el contenido
  }

  private resetFormulario(): void {
    this.nuevoEstudiante = new Estudiante('', 0, 0, {
      cedula: '',
      nombres: '',
      apellidos: '',
      sexo: '',
      fechaNacimiento: new Date(),
    });
  }

  private recargarEstudiantes(): void {
    this.estudiantes = this.estudianteService.listarEstudiantes();
  }
}
