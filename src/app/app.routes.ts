import { Routes } from '@angular/router';
import { EstudianteComponent } from './Componentes/estudiante/estudiante.component';

export const routes: Routes = [
    { path: '', redirectTo: '/estudiantes', pathMatch: 'full' },
    { path: 'estudiantes', component: EstudianteComponent },
    { path: '**', redirectTo: '/estudiantes' }, 
];
