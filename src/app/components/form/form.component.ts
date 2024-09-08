import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';
import { UsersData } from '../../interfaces/users-data';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  modelForm: FormGroup;
  usersService : UsersService = inject(UsersService);

  constructor(){
    this.modelForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastname: new FormControl(null, [
        Validators.required,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      image: new FormControl(null, [
        Validators.required,
        Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/),
      ]),
    }, [])
  }

  getDataForm(){
    const newUser : UsersData = {
      id: 0,
      first_name: this.modelForm.controls['name'].value,
      last_name: this.modelForm.controls['lastname'].value,
      username: this.modelForm.controls['name'].value + this.modelForm.controls['lastname'].value,
      email: this.modelForm.controls['email'].value,
      image: this.modelForm.controls['image'].value
    };
    this.usersService.createUser(newUser).then(res =>{
      Swal.fire('Se creo!', res.id, 'success')
    })
    
  }

  checkControl(formControlName: string, validador: string){
    return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched;
  }

}
