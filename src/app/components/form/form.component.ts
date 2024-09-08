import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  modelForm: FormGroup;

  constructor(){
    this.modelForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      lastname: new FormControl(null, []),
      email: new FormControl(null, []),
      image: new FormControl(null, []),
    }, [])
  }

  getDataForm(){

  }

}
