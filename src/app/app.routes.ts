import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; 
import { FormComponent } from './components/form/form.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home', 
        pathMatch: 'full' 
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'newuser',
        component: FormComponent,
        title: 'Crear un nuevo usuario'
    },
    {
        path: 'user/:id',
        component: UserDetailsComponent
    },
    {
        path: 'updateuser/:id',
        component: FormComponent,
        title: 'Actualizar un usuario'
    },
];
