import { Persona } from './persona';

export class Estudiante extends Persona {
    codigo: string;
    parcial1: number;
    parcial2: number;
    calificacionFinal: number;
    examenRecuperacion?: number;
    notaDefinitiva?: number;
    estadoAprobatorio: string;
  
    constructor(
      codigo: string,
      parcial1: number,
      parcial2: number,
      persona: Persona
    ) {
      super(persona.cedula, persona.nombres, persona.apellidos, persona.sexo, persona.fechaNacimiento);
      this.codigo = codigo;
      this.parcial1 = parcial1;
      this.parcial2 = parcial2;
      this.calificacionFinal = this.calcularCalificacionFinal();
      this.estadoAprobatorio = this.comprobarEstado();
      this.notaDefinitiva = this.comprobarnotaDefinitiva();
    }
  
    private calcularCalificacionFinal(): number {
      return (this.parcial1 + this.parcial2) / 2;
    }
  
    private calcularNotaDefinitiva(): number | undefined {
      if (this.examenRecuperacion !== undefined) {
        return this.calificacionFinal * 0.4 + this.examenRecuperacion * 0.6;
      }
      return this.calificacionFinal;
    }
    private comprobarnotaDefinitiva(){
        if(this.estadoAprobatorio !== 'Recuperación'){
            return this.calificacionFinal;
        }
        return undefined;
    }
  
    public comprobarEstado(): string {
      if (this.calificacionFinal >= 7) {
        return 'Aprobado';
      } else if (this.calificacionFinal < 5.5) {
        return 'Reprobado';
      } else {
        // Caso de recuperación
        if (this.examenRecuperacion !== undefined) {
          const notaDefinitiva = this.calcularNotaDefinitiva();
          return notaDefinitiva && notaDefinitiva >= 7 ? 'Aprobado' : 'Reprobado';
        }
        return 'Recuperación';
      }
    }
  
    public actualizarRecuperacion(examenRecuperacion: number): void {
      this.examenRecuperacion = examenRecuperacion;
      this.notaDefinitiva = this.calcularNotaDefinitiva();
      this.estadoAprobatorio = this.comprobarEstado();
    }
}
