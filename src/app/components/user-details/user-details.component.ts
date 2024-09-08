import { Component, Input, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersData } from '../../interfaces/users-data';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  user : UsersData |undefined;
  usersService : UsersService = inject(UsersService);
  id : number = 0;

  constructor (private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.id = parseInt(parametros.get("id")!)
      this.usersService.getUserFromList(this.id).then(fetchUser=> this.user= fetchUser);
    })
  }
  
  startDelete(id: number) {
    Swal.fire({
      title: '¿Quieres borrar a '+this.user?.email+'?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `No borrar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.usersService.deleteUserById(id).then(res =>{
          if (res.error === undefined || res.error ===null){
            Swal.fire('Se borro!', '', 'success')
          }else{
            Swal.fire('Error!', res.error, 'error')
          } 
          
        })
      } else if (result.isDenied) {
        Swal.fire('No se va a borrar', '', 'info');
      }
    });
  }
}
