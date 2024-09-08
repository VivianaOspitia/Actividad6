import { Component,Input,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';
import { UsersData } from '../../interfaces/users-data';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  resourceData: number = -1;
  sumitLabel = 'Guardar';
  user : UsersData |undefined;
  modelForm: FormGroup;
  usersService : UsersService = inject(UsersService);
  isEditMode: boolean = false;

  constructor(private activatedRoute: ActivatedRoute){
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

    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.resourceData = parseInt(parametros.get("id")!)
      this.usersService.getUserFromList(this.resourceData).then(fetchUser=> {
        this.user= fetchUser
        this.isEditMode = true;
        this.loadResourceData();
        this.sumitLabel = "Actualizar";
      });
    })
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
    if(this.isEditMode){
      this.usersService.updateUser(newUser).then(res =>{
        if (res.error === undefined || res.error ===null){
          Swal.fire('Se actualizo!', '', 'success')
        }else{
          Swal.fire('Error!', res.error, 'error')
        }    
      })

    }else{
      this.usersService.createUser(newUser).then(res =>{
        Swal.fire('Se creo!', res.id, 'success')
      })
    }
  }

  checkControl(formControlName: string, validador: string){
    return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched;
  }

  loadResourceData(): void {
    this.modelForm.patchValue({
      name : this.user?.first_name,
      lastname : this.user?.last_name,
      email : this.user?.email,
      image : this.user?.image
    });
  }
}
