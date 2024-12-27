import { Injectable } from '@angular/core';
import { Estudiante } from '../Entidades/estudiante';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private estudiantes: Estudiante[] = [
    new Estudiante('001', 8, 7, { cedula: '1234567890', nombres: 'Juan', apellidos: 'Pérez', sexo: 'Masculino', fechaNacimiento: new Date('2000-01-01') }),
    new Estudiante('002', 6, 5, { cedula: '0987654321', nombres: 'Ana', apellidos: 'Gómez', sexo: 'Femenino', fechaNacimiento: new Date('2001-02-02') }),
    new Estudiante('003', 9, 9, { cedula: '1122334455', nombres: 'Carlos', apellidos: 'Ramírez', sexo: 'Masculino', fechaNacimiento: new Date('1999-03-03') }),
    new Estudiante('004', 5, 4, { cedula: '5566778899', nombres: 'María', apellidos: 'Lopez', sexo: 'Femenino', fechaNacimiento: new Date('2002-04-04') }),
    new Estudiante('005', 7, 6, { cedula: '6677889900', nombres: 'Luis', apellidos: 'Martínez', sexo: 'Masculino', fechaNacimiento: new Date('2003-05-05') }),
  ];

  listarEstudiantes(): Estudiante[] {
    return this.estudiantes;
  }

  agregarEstudiante(estudiante: Estudiante): void {
    this.estudiantes.push(estudiante);
  }

  modificarEstudiante(codigo: string, estudiante: Estudiante): void {
    const index = this.estudiantes.findIndex((e) => e.codigo === codigo);
    if (index !== -1) {
      this.estudiantes[index] = estudiante;
    }
  }

  eliminarEstudiante(codigo: string): void {
    this.estudiantes = this.estudiantes.filter((e) => e.codigo !== codigo);
  }

  calcularEstadisticas(): { aprobados: number; reprobados: number } {
    const total = this.estudiantes.length;
    const aprobados = this.estudiantes.filter((e) => e.estadoAprobatorio === 'Aprobado').length;
    const reprobados = total - aprobados;
  
    return {
      aprobados: (aprobados / total) * 100,
      reprobados: (reprobados / total) * 100,
    };
  }
  
  calcularAprobadosPorSexo(): { masculinos: number; femeninos: number } {
    const masculinos = this.estudiantes.filter((e) => e.sexo === 'Masculino');
    const femeninos = this.estudiantes.filter((e) => e.sexo === 'Femenino');
  
    return {
      masculinos: (masculinos.filter((e) => e.estadoAprobatorio === 'Aprobado').length / masculinos.length) * 100,
      femeninos: (femeninos.filter((e) => e.estadoAprobatorio === 'Aprobado').length / femeninos.length) * 100,
    };
  }
  
}

